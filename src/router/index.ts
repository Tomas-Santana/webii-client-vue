import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '@/views/IndexView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import HomeView from '@/views/HomeView.vue'
import CreateResetPasswordView from '@/views/CreateResetPasswordView.vue'
import ResetPasswordView from '@/views/ResetPasswordView.vue'
import CalculatorView from '@/views/CalculatorView.vue'
import MiembrosView from '@/views/MiembrosView.vue'
import PrincipalView from '@/views/PrincipalView.vue'
import { isAuthenticated } from '@/lib/isAuthenticated'
import ProyectosView from '@/views/ProyectosView.vue'
import ActividadesView from '@/views/ActividadesView.vue'
import TiempoView from '@/views/TiempoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: IndexView,
      children: [
        {
          path: '/calculator',
          name: 'calculator',
          component: CalculatorView
        },
        {
          path: '/miembros',
          name: 'miembros',
          component: MiembrosView
        },
        {
          path: '/principal',
          name: 'principal',
          component: PrincipalView
        },
        {
          path: '/proyecto',
          name: 'proyecto',
          component: ProyectosView
        },
        {
          path: '/actividades',
          name: 'actividades',
          component: ActividadesView
        },
        {
          path: '/tiempo',
          name: 'tiempo',
          component: TiempoView
        }
      ]
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
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/reset-password',
      name: 'create-reset-password',
      component: ResetPasswordView
    },
    {
      path: '/create-reset-password',
      name: 'reset-password',
      component: CreateResetPasswordView
    }
    
  ]
})

router.beforeEach(async (to, from) => {
  const freeViews = ['login', 'register', 'create-reset-password', 'reset-password']
  // if (to.name === 'protected') {
  //   const auth = await isAuthenticated()
  //   if (!auth) {
  //     return '/login'
  //   }
  // }
  if (!freeViews.includes(to.name?.toString() ?? "") && !await isAuthenticated()) {
    return '/login'

  }
})

export default router
