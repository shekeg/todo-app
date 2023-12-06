<script setup lang="ts">
import { ref } from 'vue';
import BaseInput from '@/components/shared/BaseInput.vue';
import BaseRadioButton from '@/components/shared/BaseRadioButton.vue';

const statusFilter = ref('all');
</script>

<template>
  <div>
    <BaseInput class="w-full" placeholder="Search..." aria-label="Search" />
    <div class="mt-4 flex flex-col gap-3 md:flex-row md:gap-5">
      <BaseRadioButton id="all" v-model="statusFilter" label="All" value="all" />
      <BaseRadioButton id="active" v-model="statusFilter" label="Active" value="active" />
      <BaseRadioButton id="completed" v-model="statusFilter" label="Completed" value="completed" />
    </div>
  </div>
</template>
