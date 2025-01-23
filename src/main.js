import { createApp } from 'vue';
import './style.css'
import App from './App.vue';
import Router from './routes'

// Import Element Plus and its CSS
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

const app = createApp(App);

// Use Element Plus
app.use(ElementPlus);
// Use the Router
app.use(Router);
app.mount('#app');