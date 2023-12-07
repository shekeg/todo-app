import { expect, it, describe } from 'vitest';
import { mount } from '@vue/test-utils';
import App from '@/App.vue';

describe('App', () => {
  it('should render the correct header and main content', () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          'router-view': true,
        },
      },
    });

    const header = wrapper.find('header');
    const main = wrapper.find('main');

    expect(header.find('a[href="https://github.com/shekeg/todo-app"]').exists()).toBe(true);
    expect(main.findComponent({ name: 'RouterView' }).exists()).toBe(true);
  });
});
