import axios from 'axios';
import { useToastNotifications } from '@/composables/useToastNotifications.ts';

const $toast = useToastNotifications();

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    $toast.error(`Error: ${error}`);
    throw error;
  }
);
