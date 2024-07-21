import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '@/views/IndexView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import HomeView from '@/views/HomeView.vue'
import CreateResetPasswordView from '@/views/CreateResetPasswordView.vue'
import ResetPasswordView from '@/views/ResetPasswordView.vue'
import MiembrosView from '@/views/MiembrosView.vue'
import PrincipalView from '@/views/PrincipalView.vue'
import { isAuthenticated } from '@/lib/isAuthenticated'
import ProyectosView from '@/views/ProyectosView.vue'
import ActividadesView from '@/views/ActividadesView.vue'
import TiempoView from '@/views/TiempoView.vue'
import SelectProfileView from '@/views/SelectProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexView,
      children: [
        {
          path: ':id/miembros',
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
          path: ':id/actividades',
          name: 'actividades',
          component: ActividadesView
        },
        {
          path: ':id/tiempo',
          name: 'tiempo',
          component: TiempoView
        }
      ]
    },
    {
      path: ':projectId/actividades/:activityId',
      name: 'actividad',
      component: ActividadesView
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
      path: "/select-profile",
      name: "select-profile",
      component: SelectProfileView
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
  if (!freeViews.includes(to.name?.toString() ?? "") && !await isAuthenticated()) {
    return '/login'
  }
})

export default router
