<script lang="ts" setup>
import BaseButton from '@/components/shared/BaseButton.vue';
import BaseRouterLinkButton from '@/components/shared/BaseRouterLinkButton.vue';
</script>

<template>
  <li
    class="flex flex-col rounded-2xl bg-gray-100 p-6 md:flex-row md:items-center md:justify-between"
  >
    <p>Design use case page</p>
    <div class="mt-4 flex gap-4 md:ml-4 md:mt-0">
      <BaseRouterLinkButton
        :to="{ name: 'TodoUpdatePage', params: { id: 1 } }"
        intent="primary"
        class="flex-1"
      >
        Edit
      </BaseRouterLinkButton>
      <BaseButton intent="distractive" class="flex-1">Delete</BaseButton>
    </div>
  </li>
</template>
