import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AccountView from '../views/AccountView.vue'
import MediasView from '../views/MediasView.vue'
import DisplayView from '../views/DisplayView.vue'

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
  ],
})

export default router
