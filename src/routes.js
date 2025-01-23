import { createRouter,createWebHistory } from "vue-router";
import Login from './components/login.vue';
import Home from './components/Home.vue';
import Logs from './components/Logs.vue';
import UploadForm from './components/uploadForm.vue';
import Documents from './components/documents.vue';




const routes=[
    {
        name:'Login',
        Path:'/',
        component:Login
    },
    {
        name: 'home',
        path: '/home',
        component: Home,
        children: [
            {
                name: 'logs',
                path: 'logs',
                component: Logs
            },
            {
                name: 'uploadform',
                path: 'uploadform',
                component: UploadForm
            },
            {
                name: 'documents',
                path: 'documents',
                component: Documents
            }
        ]
    }
]
const router=createRouter({
    history:createWebHistory(),
    routes,
    linkActiveClass:'active'
})
export default router