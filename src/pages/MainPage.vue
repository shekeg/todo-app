<script setup lang="ts">
import BaseRouterLinkButton from '@/components/shared/BaseRouterLinkButton.vue';
import TodoFilters from '@/components/TodoFilters/TodoFilters.vue';
import TodoList from '@/components/TodoList/TodoList.vue';
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
  <TodoFilters class="mt-7" />
  <TodoList class="mt-7" />
</template>
