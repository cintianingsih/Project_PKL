import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/LoginView.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  // Add other routes here
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router