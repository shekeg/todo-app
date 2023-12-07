import { expect, it, describe, vi } from 'vitest';
import { ref } from 'vue';
import { useLocalStorage } from '@vueuse/core';
import { todoApi } from '@/api/todoApi.ts';
import { useTodoData } from './useTodoData';

vi.mock('@vueuse/core');
vi.mock('@/api/todoApi.ts');
vi.mock('@/composables/useCurrentUser.ts', () => ({
  useCurrentUser: () => ({ id: 5 }),
}));

describe('useTodoData', () => {
  it('should fetch todos from the API', async () => {
    const todos = [
      { id: 1, todo: 'Buy groceries', completed: false, userId: 5 },
      { id: 2, todo: 'Clean the house', completed: true, userId: 5 },
    ];
    vi.mocked(todoApi).getAll.mockResolvedValue({ todos, limit: 0, skip: 0, total: 2 });

    vi.mocked(useLocalStorage).mockReturnValue(ref({ isFetched: false, todos: [] }));

    const { data, fetch } = useTodoData();

    await fetch();

    expect(todoApi.getAll).toHaveBeenCalledTimes(1);
    expect(data.value.todos).toEqual(todos);
    expect(data.value.isFetched).toBe(true);
  });

  it('should create a new todo if list is empty', async () => {
    const newTodo = { todo: 'Walk the dog', completed: false };
    vi.mocked(todoApi.create).mockResolvedValue({ id: 1, ...newTodo, userId: 5 });

    vi.mocked(useLocalStorage).mockReturnValue(ref({ isFetched: true, todos: [] }));

    const { data, create } = useTodoData();

    await create(newTodo);

    expect(todoApi.create).toHaveBeenCalledTimes(1);
    expect(todoApi.create).toHaveBeenCalledWith({ ...newTodo, userId: 5 });
    expect(data.value.todos).toEqual([
      { id: 1, todo: 'Walk the dog', completed: false, userId: 5 },
    ]);
  });

  it('should create a new todo', async () => {
    const newTodo = { todo: 'Walk the dog', completed: false };
    vi.mocked(todoApi.create).mockResolvedValue({ id: 2, ...newTodo, userId: 5 });

    vi.mocked(useLocalStorage).mockReturnValue(
      ref({
        isFetched: true,
        todos: [{ id: 1, todo: 'Buy groceries', completed: false, userId: 5 }],
      })
    );

    const { data, create } = useTodoData();

    await create(newTodo);

    expect(todoApi.create).toHaveBeenCalledTimes(1);
    expect(todoApi.create).toHaveBeenCalledWith({ ...newTodo, userId: 5 });
    expect(data.value.todos).toEqual([
      { id: 1, todo: 'Buy groceries', completed: false, userId: 5 },
      { id: 2, todo: 'Walk the dog', completed: false, userId: 5 },
    ]);
  });

  it('should update an existing todo', async () => {
    const updatedTodo = { todo: 'Buy milk', completed: true };
    vi.mocked(todoApi.update).mockResolvedValue({ id: 1, ...updatedTodo, userId: 5 });

    vi.mocked(useLocalStorage).mockReturnValue(
      ref({
        isFetched: true,
        todos: [
          { id: 1, todo: 'Buy groceries', completed: false, userId: 5 },
          { id: 2, todo: 'Clean the house', completed: true, userId: 5 },
        ],
      })
    );

    const { data, update } = useTodoData();

    await update(1, updatedTodo);

    expect(todoApi.update).toHaveBeenCalledTimes(1);
    expect(todoApi.update).toHaveBeenCalledWith(1, {
      ...updatedTodo,
      userId: 5,
    });
    expect(data.value.todos).toEqual([
      { id: 1, todo: 'Buy milk', completed: true, userId: 5 },
      { id: 2, todo: 'Clean the house', completed: true, userId: 5 },
    ]);
  });

  it('should remove a todo', async () => {
    vi.mocked(useLocalStorage).mockReturnValue(
      ref({
        isFetched: true,
        todos: [
          { id: 1, todo: 'Buy groceries', completed: false, userId: 5 },
          { id: 2, todo: 'Clean the house', completed: true, userId: 5 },
        ],
      })
    );
    const { data, remove } = useTodoData();

    vi.mocked(todoApi.remove).mockResolvedValue({
      id: 1,
      completed: false,
      deletedOn: '2021-08-01T00:00:00.000Z',
      isDeleted: true,
      todo: 'Buy groceries',
      userId: 5,
    });

    await remove(1);

    expect(todoApi.remove).toHaveBeenCalledTimes(1);
    expect(todoApi.remove).toHaveBeenCalledWith(1);
    expect(data.value.todos).toEqual([
      { id: 2, todo: 'Clean the house', completed: true, userId: 5 },
    ]);
  });
});
