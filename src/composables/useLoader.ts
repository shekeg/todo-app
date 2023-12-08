import { ref } from 'vue';

export const useLoader = () => {
  const isLoading = ref(false);

  function startLoading() {
    isLoading.value = true;
  }

  function stopLoading() {
    isLoading.value = false;
  }

  return {
    isLoading,
    startLoading,
    stopLoading,
  };
};
