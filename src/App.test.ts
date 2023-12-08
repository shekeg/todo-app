import { expect, it, describe, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { useLoader } from '@/composables/useLoader.ts';
import App from '@/App.vue';

vi.mock('@/composables/useLoader.ts');

describe('App', () => {
  it('should render the correct header and main content', () => {
    vi.mocked(useLoader).mockReturnValue({
      isLoading: false,
    } as unknown as ReturnType<typeof useLoader>);

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

  it('should render fullscreen loader if loading is true', () => {
    vi.mocked(useLoader).mockReturnValue({
      isLoading: true,
    } as unknown as ReturnType<typeof useLoader>);

    const wrapper = mount(App, {
      global: {
        stubs: {
          'router-view': true,
        },
      },
    });

    const loader = wrapper.find('div[data-test-id="fullscreen-loader"]');
    const app = wrapper.find('div[data-test-id="app-root"]');

    expect(loader.exists()).toBe(true);
    expect(app.attributes('aria-hidden')).toBe('true');
  });
});
