import { expect, it, describe } from 'vitest';
import { mount } from '@vue/test-utils';

import TodoList from '@/components/TodoList/TodoList.vue';

describe('TodoList', () => {
  it('should render "No results" message when todoItems is empty', () => {
    const wrapper = mount(TodoList, {
      props: {
        todoItems: [],
      },
    });

    expect(wrapper.find('p.text-center').text()).toBe('No results.');
  });

  it('should render TodoListItem components when todoItems is not empty', () => {
    const todoItems = [
      { id: 1, todo: 'Buy groceries', completed: false, userId: 5 },
      { id: 2, todo: 'Clean the house', completed: true, userId: 5 },
    ];
    const wrapper = mount(TodoList, {
      props: {
        todoItems,
      },
    });

    const todoListItems = wrapper.findAll('li');

    expect(todoListItems.length).toBe(todoItems.length);
    expect(todoListItems[0].text()).toContain(todoItems[0].todo);
    expect(todoListItems[1].text()).toContain(todoItems[1].todo);
  });
});
