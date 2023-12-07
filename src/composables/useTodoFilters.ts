import { useRouteQuery } from '@vueuse/router';
import { computed, Ref } from 'vue';
import { type TodoDataItem } from '@/composables/useTodoData.ts';

const ROUTE_QUERY_KEYS = {
  name: 'name',
  status: 'status',
};

export const STATUS_OPTIONS = {
  all: 'all',
  active: 'active',
  completed: 'completed',
} as const;

type StatusOptions = (typeof STATUS_OPTIONS)[keyof typeof STATUS_OPTIONS];

export const useTodoFilters = (todos: Ref<TodoDataItem[]>) => {
  const nameQuery = useRouteQuery<string>(ROUTE_QUERY_KEYS.name, '');
  const statusQuery = useRouteQuery<StatusOptions>(ROUTE_QUERY_KEYS.status, STATUS_OPTIONS.all);

  const filteredTodos = computed(() => {
    const filteredByName = todos.value.filter((t) => t.todo.includes(nameQuery.value || ''));

    switch (statusQuery.value) {
      case STATUS_OPTIONS.all:
        return filteredByName;
      case STATUS_OPTIONS.completed:
        return filteredByName.filter((t) => t.completed);
      case STATUS_OPTIONS.active:
        return filteredByName.filter((t) => !t.completed);
      default:
        return filteredByName;
    }
  });

  return {
    nameQuery,
    statusQuery,
    filteredTodos,
  };
};
