<template>
  <div class="fixed inset-0" role="status" aria-live="assertive" data-test-id="fullscreen-loader">
    <div class="absolute inset-0 bg-slate-100 opacity-50"></div>
    <div class="absolute inset-0 flex items-center justify-center">
      <div class="loader"></div>
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<style>
.loader {
  width: 48px;
  height: 48px;
  border: 5px solid;
  @apply border-brand-500;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  position: relative;
  animation: pulse 1s linear infinite;
}
.loader:after {
  content: '';
  position: absolute;
  width: 48px;
  height: 48px;
  border: 5px solid;
  @apply border-brand-500;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  animation: scaleUp 1s linear infinite;
}

@keyframes scaleUp {
  0% {
    transform: translate(-50%, -50%) scale(0);
  }
  60%,
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}
@keyframes pulse {
  0%,
  60%,
  100% {
    transform: scale(1);
  }
  80% {
    transform: scale(1.2);
  }
}
</style>
