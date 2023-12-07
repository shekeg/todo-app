import { expect, it, describe } from 'vitest';
import { mount } from '@vue/test-utils';
import NotFoundPage from './NotFoundPage.vue';

describe('NotFoundPage', () => {
  it('should render the correct message', () => {
    const wrapper = mount(NotFoundPage);

    expect(wrapper.find('h1').text()).toBe('404 Not Found');
  });
});
