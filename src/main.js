import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import VeeValidate from './plugins/validation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './plugins/firebase';

import './assets/main.css';
import '../master';

let app;

onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App);

    app.use(createPinia());
    app.use(router);
    app.use(VeeValidate);

    app.mount('#app');
  }
});
