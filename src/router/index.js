import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/HomePage.vue';
import Opinions from '@/views/OpinionsPage.vue';
import Admin from '@/views/AdminPage.vue';
import Opciones from '@/views/OpcionesPage.vue';
import NotFound from '@/views/NotFound.vue';
import Inicio from '@/components/InicioPage.vue';

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: Inicio,
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    alias: ['/Juegos', '/Games']
  },
  {
    path: '/opinions/:id',  
    component: Opinions,
    props: true,
  },
  {
    path: '/Admin',  
    name: 'AdminPage',
    component: Admin,
  },
  {
    path: '/Opciones',  
    name: 'Opcion',
    component: Opciones,
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
