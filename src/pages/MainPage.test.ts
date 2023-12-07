import { expect, it, describe, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import MainPage from '@/pages/MainPage.vue';
import BaseRouterLinkButton from '@/components/shared/BaseRouterLinkButton.vue';
import TodoFilters from '@/components/TodoFilters/TodoFilters.vue';
import TodoList from '@/components/TodoList/TodoList.vue';
import { useTodoData } from '@/composables/useTodoData.ts';

vi.mock('@/composables/useTodoData.ts');
vi.mock('@/composables/useTodoFilters.ts', async () => ({
  ...(await vi.importActual('@/composables/useTodoFilters.ts')),
  useTodoFilters: () => ({
    nameQuery: '',
    statusQuery: 'all',
    filteredTodos: [],
  }),
}));

describe('MainPage', () => {
  it('should render the correct components', () => {
    vi.mocked(useTodoData).mockReturnValue({
      data: { value: { todos: [], isFetched: false } },
      fetch: vi.fn().mockResolvedValue({}),
    } as unknown as ReturnType<typeof useTodoData>);

    const wrapper = mount(MainPage, {
      global: {
        components: {
          BaseRouterLinkButton,
          TodoFilters,
          TodoList,
        },
        mocks: {
          $route: {
            name: 'TodoCreatePage',
          },
        },
      },
    });

    expect(wrapper.find('h1').text()).toBe('Todo List');
    expect(wrapper.findComponent(BaseRouterLinkButton).text()).toBe('Create Todo');
    expect(wrapper.findComponent(TodoFilters).exists()).toBe(true);
    expect(wrapper.findComponent(TodoList).exists()).toBe(true);
  });

  it('should fetch todo data on mount if not already fetched', () => {
    const mockFetch = vi.fn().mockResolvedValue({});
    vi.mocked(useTodoData).mockReturnValue({
      data: { value: { todos: [], isFetched: false } },
      fetch: mockFetch,
    } as unknown as ReturnType<typeof useTodoData>);

    mount(MainPage);

    expect(mockFetch).toHaveBeenCalled();
  });

  it('should not fetch todo data on mount if already fetched', () => {
    const mockFetch = vi.fn().mockResolvedValue({});
    vi.mocked(useTodoData).mockReturnValue({
      data: { value: { todos: [], isFetched: true } },
      fetch: mockFetch,
    } as unknown as ReturnType<typeof useTodoData>);

    mount(MainPage);

    expect(mockFetch).not.toHaveBeenCalled();
  });
});
