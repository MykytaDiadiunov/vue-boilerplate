import App from './App.vue';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useBaseComponents } from '@/composables';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { useLocaleStore } from '@/stores';
import { i18n } from '@/plugins';
import router from '@/router';

import './style.css';
import 'vfonts/Lato.css';
import 'vfonts/FiraCode.css';

const app = createApp(App);
const baseComponents = useBaseComponents();
const pinia = createPinia();

app.use(pinia);
app.use(i18n);
app.use(router);
app.use(VueQueryPlugin);

useLocaleStore();
baseComponents.initialize(app);

router.isReady().then(() => {
  app.mount('#app');
});
