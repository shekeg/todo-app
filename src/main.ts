import { createApp } from 'vue';
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';

import './styles/index.css';

import App from './App.vue';

import { router } from './router';
import { useToastNotifications } from '@/composables/useToastNotifications.ts';

const $toast = useToastNotifications();

const app = createApp(App);

app.use(router);
app.use(ToastPlugin, {
  position: 'top',
});

app.config.errorHandler = (err) => {
  $toast.error(`Error: ${err}`);
  throw err;
};

app.mount('#app');
