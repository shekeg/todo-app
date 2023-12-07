import { expect, it, describe } from 'vitest';
import { mount } from '@vue/test-utils';

import TodoFilters from '@/components/TodoFilters/TodoFilters.vue';

describe('TodoFilters', () => {
  it('should emit "update:name" event when input value changes', async () => {
    const wrapper = mount(TodoFilters, {
      props: {
        name: '',
        status: 'all',
      },
    });

    const input = wrapper.find('input[aria-label="Search"]');
    await input.setValue('Search term');

    expect(wrapper.emitted('update:name')).toBeTruthy();
    expect(wrapper.emitted('update:name')?.[0][0]).toEqual('Search term');
  });

  it('should emit "update:status" event when radio button is selected', async () => {
    const wrapper = mount(TodoFilters, {
      props: {
        name: '',
        status: 'all',
      },
    });

    const radioButton = wrapper.find('input[value="active"]');
    await radioButton.trigger('change');

    expect(wrapper.emitted('update:status')).toBeTruthy();
    expect(wrapper.emitted('update:status')?.[0][0]).toEqual('active');
  });
});
