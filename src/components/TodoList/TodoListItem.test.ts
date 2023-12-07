import { expect, it, describe, vi } from 'vitest';
import { mount, RouterLinkStub } from '@vue/test-utils';

import { useTodoData } from '@/composables/useTodoData.ts';
import TodoListItem from './TodoListItem.vue';

const mocks = vi.hoisted(() => ({
  $toast: { success: vi.fn() },
}));

vi.mock('@/composables/useTodoData.ts');
vi.mock('@/composables/useToastNotifications.ts', () => ({
  useToastNotifications: () => mocks.$toast,
}));

describe('TodoListItem', () => {
  it('should render the todo text', () => {
    const todo = 'Buy groceries';
    const wrapper = mount(TodoListItem, {
      props: {
        id: 1,
        todo,
        completed: false,
      },
    });

    expect(wrapper.find('p').text()).toBe(todo);
  });

  it('should render link to edit page', () => {
    const wrapper = mount(TodoListItem, {
      props: {
        id: 1,
        todo: 'Buy groceries',
        completed: false,
      },
    });

    expect(wrapper.findComponent(RouterLinkStub).props().to).toEqual({
      name: 'TodoUpdatePage',
      params: { id: 1 },
    });
  });

  it('should call todoDate.remove when delete button is clicked', async () => {
    const remove = vi.fn().mockResolvedValue(1);

    vi.mocked(useTodoData).mockReturnValue({
      remove,
    } as unknown as ReturnType<typeof useTodoData>);

    const wrapper = mount(TodoListItem, {
      props: {
        id: 1,
        todo: 'Buy groceries',
        completed: false,
      },
    });

    await wrapper.find('button').trigger('click');

    expect(remove).toHaveBeenCalledTimes(1);
    expect(remove).toHaveBeenCalledWith(1);
  });

  it('should render the toast when todoDate.remove is resolved', async () => {
    const remove = vi.fn().mockResolvedValue(1);

    vi.mocked(useTodoData).mockReturnValue({
      remove,
    } as unknown as ReturnType<typeof useTodoData>);

    const wrapper = mount(TodoListItem, {
      props: {
        id: 1,
        todo: 'Buy groceries',
        completed: false,
      },
    });

    await wrapper.find('button').trigger('click');

    expect(mocks.$toast.success).toHaveBeenCalledTimes(1);
    expect(mocks.$toast.success).toHaveBeenCalledWith('Deleted successfully');
  });

  it('should apply line-through class when completed is true', () => {
    const wrapper = mount(TodoListItem, {
      props: {
        id: 1,
        todo: 'Buy groceries',
        completed: true,
      },
    });

    expect(wrapper.find('p').classes()).toContain('line-through');
  });
});
