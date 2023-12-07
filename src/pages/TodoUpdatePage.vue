<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import BaseCheckbox from '@/components/shared/BaseCheckbox.vue';
import BaseTextarea from '@/components/shared/BaseTextarea.vue';
import BaseButton from '@/components/shared/BaseButton.vue';

import { useTodoData } from '@/composables/useTodoData.ts';
import { useToastNotifications } from '@/composables/useToastNotifications';

const router = useRouter();
const route = useRoute();
const $toast = useToastNotifications();

const todoData = useTodoData();

const targetId = Number(route.params.id);
const targetItem = todoData.data.value.todos.find((item) => item.id === targetId);

if (targetItem === undefined) {
  router.replace({ name: 'NotFoundPage' });
}

const isCompleted = ref(targetItem?.completed ?? false);
const todo = ref(targetItem?.todo ?? '');

const handleSubmit = () => {
  const payload = {
    completed: isCompleted.value,
    todo: todo.value,
  };

  todoData.update(targetId, payload).then(() => {
    $toast.success('Updated successfully');
    router.back();
  });
};

const handleCancelClick = () => {
  router.back();
};
</script>

<template>
  <h1 class="text-xl font-bold">Update task #{{ targetId }}</h1>
  <form @submit.prevent="handleSubmit">
    <BaseCheckbox v-model="isCompleted" class="mt-7" label="Completed" />
    <BaseTextarea
      v-model="todo"
      class="mt-4 w-full"
      placeholder="Update a note..."
      aria-label="Update a note..."
    />
    <div class="mt-4 flex gap-4">
      <BaseButton
        class="ml-auto flex-1 md:flex-none"
        intent="primary"
        :disabled="todo.length === 0"
        type="submit"
      >
        Update
      </BaseButton>
      <BaseButton
        type="button"
        class="flex-1 md:flex-none"
        intent="distractive"
        data-test-id="cancel-button"
        @click="handleCancelClick"
      >
        Cancel
      </BaseButton>
    </div>
  </form>
</template>
