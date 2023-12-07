<script lang="ts" setup>
defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const updateInput = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLTextAreaElement).value);
};
</script>

<template>
  <textarea
    class="inline-block rounded-xl bg-gray-100 px-3 py-2"
    rows="5"
    :value="modelValue"
    @input="updateInput"
  >
  </textarea>
</template>
