import { createApp } from 'vue'
import App from '@/App.vue'
import '@/style/reset.scss'

import Top from '@/components/top/index.vue'
import Bottom from '@/components/bottom/index.vue'
import router from '@/router'
import 'virtual:windi.css'
import { createPinia } from 'pinia'

const pinia = createPinia();
const app = createApp(App);
app.component('Top', Top);
app.component('Bottom', Bottom);
app.use(router);
app.use(pinia);
app.mount('#app');
