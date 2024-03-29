import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CheckoutView from '../views/CheckoutView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/checkout',
    name: 'CheckoutView',
    component: CheckoutView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
