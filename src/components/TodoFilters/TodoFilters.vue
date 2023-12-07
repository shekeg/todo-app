<script setup lang="ts">
import BaseInput from '@/components/shared/BaseInput.vue';
import BaseRadioButton from '@/components/shared/BaseRadioButton.vue';
import { STATUS_OPTIONS } from '@/composables/useTodoFilters';

const props = defineProps<{
  name: string;
  status: string;
}>();

const emit = defineEmits<{
  'update:name': [name: string];
  'update:status': [status: string];
}>();
</script>

<template>
  <div>
    <BaseInput
      class="w-full"
      placeholder="Search..."
      aria-label="Search"
      :value="props.name"
      @input="emit('update:name', $event.target.value)"
    />
    <div class="mt-4 flex flex-col gap-3 md:flex-row md:gap-5">
      <BaseRadioButton
        :checked="props.status === STATUS_OPTIONS.all"
        :value="STATUS_OPTIONS.all"
        label="All"
        @change="emit('update:status', STATUS_OPTIONS.all)"
      />
      <BaseRadioButton
        :checked="props.status === STATUS_OPTIONS.active"
        :value="STATUS_OPTIONS.active"
        label="Active"
        @change="emit('update:status', STATUS_OPTIONS.active)"
      />
      <BaseRadioButton
        :checked="props.status === STATUS_OPTIONS.completed"
        :value="STATUS_OPTIONS.completed"
        label="Completed"
        @change="emit('update:status', STATUS_OPTIONS.completed)"
      />
    </div>
  </div>
</template>
