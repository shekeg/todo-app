<script setup lang="ts">
import { computed, PropType } from 'vue';

const props = defineProps({
  intent: {
    type: String as PropType<'primary' | 'distractive'>,
    required: true,
    validator: (value: string) => {
      return ['primary', 'distractive'].includes(value);
    },
  },
});

const variantClass = computed(() => {
  return {
    primary: 'bg-brand-100 text-brand-500 border border-brand-500',
    distractive: 'bg-red-100 text-red-500 border border-red-500',
  }[props.intent];
});
</script>

<template>
  <button
    class="inline-block rounded-xl px-3 py-2 text-center font-bold disabled:opacity-50"
    :class="variantClass"
  >
    <slot></slot>
  </button>
</template>
