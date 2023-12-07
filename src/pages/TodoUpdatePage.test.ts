import { expect, it, describe, vi } from 'vitest';
import { mount } from '@vue/test-utils';

import { useTodoData } from '@/composables/useTodoData.ts';
import TodoUpdatePage from '@/pages/TodoUpdatePage.vue';

const mocks = vi.hoisted(() => ({
  router: { back: vi.fn(), replace: vi.fn() },
  $toast: { success: vi.fn() },
}));

vi.mock('@/composables/useTodoData.ts');
vi.mock('vue-router', () => ({
  useRouter: () => mocks.router,
  useRoute: () => ({ params: { id: 1 } }),
}));
vi.mock('@/composables/useToastNotifications.ts', () => ({
  useToastNotifications: () => mocks.$toast,
}));

describe('TodoCreatePage', () => {
  it('should update a new task when form is submitted', async () => {
    const mockUpdate = vi.fn().mockResolvedValue({});

    vi.mocked(useTodoData).mockReturnValue({
      data: {
        value: {
          todos: [{ id: 1, todo: 'Buy groceries', completed: false }],
        },
      },
      update: mockUpdate,
    } as unknown as ReturnType<typeof useTodoData>);

    const wrapper = mount(TodoUpdatePage);

    const checkbox = wrapper.find('input[aria-label="Completed"]');
    await checkbox.setValue(true);
    const textarea = wrapper.find('textarea[aria-label="Update a note..."]');
    await textarea.setValue('Something else');
    const form = wrapper.find('form');
    await form.trigger('submit');

    expect(mockUpdate).toHaveBeenCalledWith(1, {
      completed: true,
      todo: 'Something else',
    });
    expect(mocks.router.back).toHaveBeenCalled();
    expect(mocks.$toast.success).toHaveBeenCalledWith('Updated successfully');
  });

  it('should disable the update button when todo is empty', async () => {
    vi.mocked(useTodoData).mockReturnValue({
      data: {
        value: {
          todos: [{ id: 1, todo: 'Buy groceries', completed: false }],
        },
      },
    } as unknown as ReturnType<typeof useTodoData>);

    const wrapper = mount(TodoUpdatePage);

    const checkbox = wrapper.find('input[aria-label="Completed"]');
    await checkbox.setValue(true);
    const textarea = wrapper.find('textarea[aria-label="Update a note..."]');
    await textarea.setValue('');
    const button = wrapper.find('button[type="submit"]');

    expect(button.attributes('disabled')).toBe('');
  });

  it('should cancel and go back when cancel button is clicked', async () => {
    vi.mocked(useTodoData).mockReturnValue({
      data: {
        value: {
          todos: [{ id: 1, todo: 'Buy groceries', completed: false }],
        },
      },
    } as unknown as ReturnType<typeof useTodoData>);

    const wrapper = mount(TodoUpdatePage);

    const button = wrapper.find('button[data-test-id="cancel-button"]');
    await button.trigger('click');

    expect(mocks.router.back).toHaveBeenCalled();
  });

  it('should replace the route when todo is not found', async () => {
    vi.mocked(useTodoData).mockReturnValue({
      data: {
        value: {
          todos: [{ id: 2, todo: 'Buy groceries', completed: false }],
        },
      },
    } as unknown as ReturnType<typeof useTodoData>);

    mount(TodoUpdatePage);

    expect(mocks.router.replace).toHaveBeenCalled();
  });
});
