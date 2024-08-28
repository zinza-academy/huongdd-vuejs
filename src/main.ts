import { createApp } from 'vue';
import App from './App.vue';
import router from './router/IndexRouter';
import './assets/css/styles.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'bootstrap/dist/css/bootstrap-utilities.min.css';

import axios from 'axios';

createApp(App).use(router).mount('#app');
