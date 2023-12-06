<script setup lang="ts"></script>

<template>
  <div class="container mx-auto p-6 md:p-8">
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
