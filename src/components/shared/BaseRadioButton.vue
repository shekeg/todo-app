<script lang="ts" setup>
defineProps<{
  label: string;
  value: string | number;
  modelValue?: string | number;
  checked?: boolean;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string | number];
  change: [e: Event];
}>();

const updateInput = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value);
  emit('change', e);
};
</script>

<template>
  <label class="inline-block">
    <input
      class="accent-brand-500"
      type="radio"
      :checked="modelValue === value || checked"
      :value="value"
      @change="updateInput"
    />
    <span class="ml-1">{{ label }}</span>
  </label>
</template>
