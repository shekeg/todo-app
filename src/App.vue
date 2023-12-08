<script setup lang="ts">
import { apiClient } from '@/api/apiClient.ts';
import { useLoader } from '@/composables/useLoader.ts';
import { useToastNotifications } from '@/composables/useToastNotifications.ts';
import BaseFullScreenLoader from '@/components/shared/BaseFullScreenLoader.vue';

const $toast = useToastNotifications();

const { isLoading, startLoading, stopLoading } = useLoader();

apiClient.interceptors.request.use(
  (config) => {
    startLoading();
    return config;
  },
  (error) => {
    stopLoading();
    throw error;
  }
);

apiClient.interceptors.response.use(
  (response) => {
    stopLoading();
    return response;
  },
  (error) => {
    stopLoading();
    $toast.error(`Error: ${error}`);
    throw error;
  }
);
</script>

<template>
  <Transition>
    <BaseFullScreenLoader v-show="isLoading" />
  </Transition>
  <div class="container mx-auto p-6 md:p-8" :aria-hidden="isLoading" data-test-id="app-root">
    <header class="flex items-center justify-between border-b-2 py-3">
      <router-link class="text-3xl font-bold text-brand-500" to="/">Todo App</router-link>
      <a href="https://github.com/shekeg/todo-app" target="_blank" rel="noopener noreferrer">
        <img src="@/assets/icons/github.svg" width="40" height="40" alt="GitHub repo" />
      </a>
    </header>
    <main class="py-7">
      <router-view />
    </main>
  </div>
</template>
@/composables/useLoaderProvider @/composables/useLoader
