import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '@/views/IndexView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import ProtectedView from '@/views/ProtectedView.vue'
import { isAuthenticated } from '@/lib/isAuthenticated'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: IndexView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    }, 
    // register 
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/protected',
      name: 'protected',
      component: ProtectedView
    }
  ]
})

router.beforeEach(async (to, from) => {
  if (to.name === 'protected') {
    const auth = await isAuthenticated()
    if (!auth) {
      return '/login'
    }
  }
})

export default router
