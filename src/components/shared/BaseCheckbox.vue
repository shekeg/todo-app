<script lang="ts" setup>
defineProps<{
  label: string;
  modelValue: boolean;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

const updateInput = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).checked);
};
</script>

<template>
  <label class="inline-block">
    <input
      class="accent-brand-500"
      type="checkbox"
      :checked="modelValue"
      :aria-label="label"
      @change="updateInput"
    />
    <span class="ml-1">{{ label }}</span>
  </label>
</template>
