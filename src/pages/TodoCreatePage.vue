<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import BaseCheckbox from '@/components/shared/BaseCheckbox.vue';
import BaseTextarea from '@/components/shared/BaseTextarea.vue';
import BaseButton from '@/components/shared/BaseButton.vue';

import { useToastNotifications } from '@/composables/useToastNotifications.ts';
import { useTodoData } from '@/composables/useTodoData.ts';

const router = useRouter();
const $toast = useToastNotifications();
const todoData = useTodoData();

const isCompleted = ref(false);
const todo = ref('');

const handleSubmit = () => {
  const payload = {
    completed: isCompleted.value,
    todo: todo.value,
  };
  todoData.create(payload).then(() => {
    $toast.success('Created successfully');
    router.back();
  });
};
</script>

<template>
  <h1 class="text-xl font-bold">Create new task</h1>
  <form @submit.prevent="handleSubmit">
    <BaseCheckbox v-model="isCompleted" class="mt-7" label="Completed" />
    <BaseTextarea
      v-model="todo"
      class="mt-4 w-full"
      placeholder="Add a note..."
      aria-label="Add a note..."
    />
    <div class="mt-4 flex gap-4">
      <BaseButton
        class="ml-auto flex-1 md:flex-none"
        intent="primary"
        type="submit"
        :disabled="todo.length === 0"
      >
        Create
      </BaseButton>
      <BaseButton
        class="flex-1 md:flex-none"
        intent="distractive"
        type="button"
        @click="() => $router.back()"
      >
        Cancel
      </BaseButton>
    </div>
  </form>
</template>
