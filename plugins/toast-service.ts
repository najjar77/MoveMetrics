// plugins/toast-service.ts
import {defineNuxtPlugin} from '#app';
import ToastService from 'primevue/toastservice';

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(ToastService);
});
