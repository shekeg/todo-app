import { expect, it, describe, vi } from 'vitest';
import { mount } from '@vue/test-utils';

import { useTodoData } from '@/composables/useTodoData.ts';
import TodoCreatePage from '@/pages/TodoCreatePage.vue';

const mocks = vi.hoisted(() => ({
  router: { back: vi.fn() },
}));

vi.mock('@/composables/useTodoData.ts');
vi.mock('vue-router', () => ({
  useRouter: () => mocks.router,
}));

describe('TodoCreatePage', () => {
  it('should create a new task when form is submitted', async () => {
    const mockCreate = vi.fn().mockResolvedValue({});

    vi.mocked(useTodoData).mockReturnValue({
      create: mockCreate,
    } as unknown as ReturnType<typeof useTodoData>);

    const wrapper = mount(TodoCreatePage);

    const checkbox = wrapper.find('input[aria-label="Completed"]');
    await checkbox.setValue(true);
    const textarea = wrapper.find('textarea[aria-label="Add a note..."]');
    await textarea.setValue('Buy groceries');
    const form = wrapper.find('form');
    await form.trigger('submit');

    expect(mockCreate).toHaveBeenCalledWith({
      completed: true,
      todo: 'Buy groceries',
    });
    expect(mocks.router.back).toHaveBeenCalled();
  });

  it('should disable the create button when todo is empty', async () => {
    const wrapper = mount(TodoCreatePage);

    const checkbox = wrapper.find('input[aria-label="Completed"]');
    await checkbox.setValue(true);
    const button = wrapper.find('button[type="submit"]');

    expect(button.attributes('disabled')).toBe('');
  });

  it('should cancel and go back when cancel button is clicked', async () => {
    const wrapper = mount(TodoCreatePage);

    const button = wrapper.find('button[data-test-id="cancel-button"]');
    await button.trigger('click');

    expect(mocks.router.back).toHaveBeenCalled();
  });
});
