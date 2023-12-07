<script setup lang="ts">
import { onMounted, computed } from 'vue';

import BaseRouterLinkButton from '@/components/shared/BaseRouterLinkButton.vue';
import TodoFilters from '@/components/TodoFilters/TodoFilters.vue';
import TodoList from '@/components/TodoList/TodoList.vue';

import { useTodoData } from '@/composables/useTodoData.ts';
import { useTodoFilters } from '@/composables/useTodoFilters.ts';

const { data, fetch } = useTodoData();
const todos = computed(() => data.value.todos);
const { nameQuery, statusQuery, filteredTodos } = useTodoFilters(todos);

onMounted(() => {
  if (!data.value.isFetched) {
    fetch();
  }
});
</script>

<template>
  <h1 class="text-xl font-bold">Todo List</h1>
  <BaseRouterLinkButton
    class="mt-7 w-full md:w-auto"
    :to="{ name: 'TodoCreatePage' }"
    intent="primary"
  >
    Create Todo
  </BaseRouterLinkButton>
  <TodoFilters v-model:name="nameQuery" v-model:status="statusQuery" class="mt-7" />
  <TodoList :todo-items="filteredTodos" class="mt-7" />
</template>
