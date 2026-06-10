import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AccountView from '../views/AccountView.vue'
import MediasView from '../views/MediasView.vue'
import DisplayView from '../views/DisplayView.vue'
import PNFView from "@/views/PNFView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/account',
      name: 'account',
      component: AccountView,
    },
    {
      path: '/movies',
      name: 'movies',
      component: MediasView,
    },
    {
      path: '/display/:id',
      name: 'display',
      component: DisplayView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component:PNFView,
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    return { top: 0 };
  }
})

export default router
