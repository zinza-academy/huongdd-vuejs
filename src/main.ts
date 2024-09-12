import { createApp } from 'vue';
import App from './App.vue';
import router from './routers/IndexRouter';
import './assets/css/styles.css';
import './main.css';
import '@vuepic/vue-datepicker/dist/main.css';
import registerGlobalComponent from './utils/components';

const app = createApp(App);
app.use(router);
registerGlobalComponent(app);
app.mount('#app');
