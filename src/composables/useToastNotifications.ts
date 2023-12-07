import { useToast } from 'vue-toast-notification';

export const useToastNotifications = () => {
  const $toast = useToast({
    position: 'top',
  });

  return $toast;
};
