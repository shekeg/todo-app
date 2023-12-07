<script lang="ts" setup>
import BaseButton from '@/components/shared/BaseButton.vue';
import BaseRouterLinkButton from '@/components/shared/BaseRouterLinkButton.vue';

import { useTodoData } from '@/composables/useTodoData.ts';
import { useToastNotifications } from '@/composables/useToastNotifications';

const props = defineProps<{
  id: number;
  todo: string;
  completed: boolean;
}>();

const $toast = useToastNotifications();

const todoData = useTodoData();

const handleDeleteClick = () => {
  todoData.remove(props.id).then(() => {
    $toast.success('Deleted successfully');
  });
};
</script>

<template>
  <li
    class="flex flex-col rounded-2xl bg-gray-100 p-6 md:flex-row md:items-center md:justify-between"
  >
    <p :class="{ 'line-through': completed }">{{ todo }}</p>
    <div class="mt-4 flex gap-4 md:ml-4 md:mt-0">
      <BaseRouterLinkButton
        :to="{ name: 'TodoUpdatePage', params: { id } }"
        intent="primary"
        class="flex-1"
      >
        Edit
      </BaseRouterLinkButton>
      <BaseButton intent="distractive" class="flex-1" @click="handleDeleteClick">
        Delete
      </BaseButton>
    </div>
  </li>
</template>
