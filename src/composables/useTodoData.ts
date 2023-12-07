import { useLocalStorage } from '@vueuse/core';

import { todoApi } from '@/api/todoApi.ts';
import { useCurrentUser } from '@/composables/useCurrentUser.ts';

export type TodoDataItem = {
  id: TodoId;
  todo: string;
  completed: boolean;
  userId: UserId;
};

type CreatePayload = {
  todo: string;
  completed: boolean;
};

type UpdatePayload = {
  todo?: string;
  completed?: boolean;
};

const LOCAL_STORAGE_KEY = 'todo-data';

export const useTodoData = () => {
  const currentUser = useCurrentUser();

  const data = useLocalStorage<{
    isFetched: boolean;
    todos: TodoDataItem[];
  }>(LOCAL_STORAGE_KEY, { isFetched: false, todos: [] });

  const fetch = async () => {
    data.value.todos = (await todoApi.getAll()).todos;
    data.value.isFetched = true;
  };

  const create = (payload: CreatePayload) => {
    const enrichedPayload = { ...payload, userId: currentUser.id };
    return todoApi.create(enrichedPayload).then((item) => {
      const lastExisting = data.value.todos[data.value.todos.length - 1];
      data.value.todos.push({
        ...item,
        // Since backend always returns 151 as the id, we need to generate a new one manually
        id: lastExisting ? lastExisting.id + 1 : 1,
      });
    });
  };

  const update = (id: TodoId, payload: UpdatePayload) => {
    const enrichedPayload = { ...payload, userId: currentUser.id };
    return todoApi.update(id, enrichedPayload).then((updatedItem) => {
      const index = data.value.todos.findIndex((item) => item.id === id);
      data.value.todos[index] = {
        id: updatedItem.id,
        todo: updatedItem.todo,
        completed: updatedItem.completed,
        userId: updatedItem.userId,
      };
    });
  };

  const remove = (id: TodoId) => {
    return todoApi.remove(id).then(({ id }) => {
      data.value.todos = data.value.todos.filter((item) => item.id !== id);
    });
  };

  return {
    data,
    fetch,
    create,
    update,
    remove,
  };
};
