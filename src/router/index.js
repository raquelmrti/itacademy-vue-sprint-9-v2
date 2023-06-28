import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '@/views/LandingView.vue'
import SignUpView from '@/views/SignUpView.vue'
import SignInView from '@/views/SignInView.vue'
import HomeView from '@/views/HomeView.vue'
import EntryFullView from '@/views/EntryFullView.vue'
import { useUserStore } from '@/stores/userStore'

const requireAuth = async (to, from, next) => {
  const userStore = useUserStore()
  const user = await userStore.getCurrentUser()

  user ? next() : next('/sign-in')
}

const redirectAuthUser = async (to, from, next) => {
  const userStore = useUserStore()
  const user = await userStore.getCurrentUser()
  user ? next('/home') : next()
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUpView,
      beforeEnter: redirectAuthUser
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignInView,
      beforeEnter: redirectAuthUser
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      beforeEnter: requireAuth
    },
    {
      path: '/entries/:id',
      name: 'entry',
      component: EntryFullView,
      beforeEnter: requireAuth
    }
  ]
})

export default router
