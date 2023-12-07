<script lang="ts" setup>
defineProps<{
  label: string;
  value: string | number;
  modelValue: string | number;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string | number];
}>();

const updateInput = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value);
};
</script>

<template>
  <label class="inline-block">
    <input
      class="accent-brand-500"
      type="radio"
      :checked="modelValue === value"
      :value="value"
      @change="updateInput"
    />
    <span class="ml-1">{{ label }}</span>
  </label>
</template>
