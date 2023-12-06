<script lang="ts" setup>
import TodoListItem from './TodoListItem.vue';
</script>

<template>
  <section>
    <ul>
      <TodoListItem v-for="i in 30" :id="i" :key="i" class="mt-5 first:mt-0" />
    </ul>
  </section>
</template>
