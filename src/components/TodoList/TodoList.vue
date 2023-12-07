<script lang="ts" setup>
import TodoListItem from './TodoListItem.vue';
import { type TodoDataItem } from '@/composables/useTodoData';

defineProps<{
  todoItems: TodoDataItem[];
}>();
</script>

<template>
  <section>
    <template v-if="todoItems.length === 0">
      <p class="text-center">No results.</p>
      <p class="text-center">Check filter params or reset LocalStorage to refetch todos.</p>
    </template>
    <ul v-else>
      <TodoListItem
        v-for="todoItem in todoItems"
        :id="todoItem.id"
        :key="todoItem.id"
        :todo="todoItem.todo"
        :completed="todoItem.completed"
        class="mt-5 first:mt-0"
      />
    </ul>
  </section>
</template>
