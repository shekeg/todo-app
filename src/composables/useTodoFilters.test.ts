import { expect, it, describe, vi } from 'vitest';
import { ref } from 'vue';
import { useRouteQuery } from '@vueuse/router';

import { useTodoFilters, STATUS_OPTIONS } from './useTodoFilters';

vi.mock('@vueuse/router');

const mockUseQuery = (name: string, status: string) => {
  vi.mocked(useRouteQuery).mockImplementation((key) => {
    if (key === 'name') {
      return ref(name);
    }
    if (key === 'status') {
      return ref(status);
    }
    return ref('');
  });
};

describe('useTodoFilters', () => {
  it('should return the correct initial values', () => {
    mockUseQuery('', 'all');

    const todos = ref([]);
    const { nameQuery, statusQuery } = useTodoFilters(todos);

    expect(nameQuery.value).toBe('');
    expect(statusQuery.value).toBe(STATUS_OPTIONS.all);
  });

  it('should filter todos by name', () => {
    mockUseQuery('groceries', 'all');

    const todos = ref([
      { id: 1, userId: 5, todo: 'Buy groceries', completed: false },
      { id: 2, userId: 5, todo: 'Clean the house', completed: true },
      { id: 3, userId: 5, todo: 'Walk the dog', completed: false },
    ]);

    const { filteredTodos } = useTodoFilters(todos);

    expect(filteredTodos.value).toEqual([
      { id: 1, userId: 5, todo: 'Buy groceries', completed: false },
    ]);
  });

  it('should filter todos by "completed" status', () => {
    mockUseQuery('', 'completed');

    const todos = ref([
      { id: 1, userId: 5, todo: 'Buy groceries', completed: false },
      { id: 2, userId: 5, todo: 'Clean the house', completed: true },
      { id: 3, userId: 5, todo: 'Walk the dog', completed: false },
    ]);
    const { filteredTodos } = useTodoFilters(todos);

    expect(filteredTodos.value).toEqual([
      { id: 2, userId: 5, todo: 'Clean the house', completed: true },
    ]);
  });

  it('should filter todos by "active" status', () => {
    mockUseQuery('', 'active');

    const todos = ref([
      { id: 1, userId: 5, todo: 'Buy groceries', completed: false },
      { id: 2, userId: 5, todo: 'Clean the house', completed: true },
      { id: 3, userId: 5, todo: 'Walk the dog', completed: false },
    ]);
    const { filteredTodos } = useTodoFilters(todos);

    expect(filteredTodos.value).toEqual([
      { id: 1, userId: 5, todo: 'Buy groceries', completed: false },
      { id: 3, userId: 5, todo: 'Walk the dog', completed: false },
    ]);
  });

  it('should return original list if name and status queries are empty', () => {
    mockUseQuery('', '');

    const todos = ref([
      { id: 1, userId: 5, todo: 'Buy groceries', completed: false },
      { id: 2, userId: 5, todo: 'Clean the house', completed: true },
      { id: 3, userId: 5, todo: 'Walk the dog', completed: false },
    ]);
    const { filteredTodos } = useTodoFilters(todos);

    expect(filteredTodos.value).toEqual([
      { id: 1, userId: 5, todo: 'Buy groceries', completed: false },
      { id: 2, userId: 5, todo: 'Clean the house', completed: true },
      { id: 3, userId: 5, todo: 'Walk the dog', completed: false },
    ]);
  });
});
