<script lang="ts" setup>
import { ref } from 'vue';

import BaseCheckbox from '@/components/shared/BaseCheckbox.vue';
import BaseTextarea from '@/components/shared/BaseTextarea.vue';
import BaseButton from '@/components/shared/BaseButton.vue';

const done = ref(false);
const description = ref('');
</script>

<template>
  <h1 class="text-xl font-bold">Update task #{{ $route.params.id }}</h1>
  <BaseCheckbox v-model="done" class="mt-7" label="Completed" />
  <BaseTextarea
    v-model="description"
    class="mt-4 w-full"
    placeholder="Update a note..."
    aria-label="Update a note..."
  />
  <div class="mt-4 flex gap-4">
    <BaseButton class="ml-auto flex-1 md:flex-none" intent="primary">Update</BaseButton>
    <BaseButton class="flex-1 md:flex-none" intent="distractive" @click="() => $router.back()">
      Cancel
    </BaseButton>
  </div>
</template>
