import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/views/main.vue'
import Register from '@/views/registration.vue'
import Auth from '@/views/auth.vue'
import succRegister from '@/views/succ-register.vue'
import game from '@/game/game.vue'
import env from '@/views/env.vue'
import succVerify from '@/views/succ-verify.vue'
import profile from '@/game/profile.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/main',
      name: 'main',
      component: Main
    },
    {
      path: '/registration',
      name: 'register',
      component: Register
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth
    },
    {
      path: '/succ-register',
      name: 'succ-register',
      component: succRegister
    },
    {
      path: '/game',
      name: 'game',
      component: game
    },
    {
      path: '/env',
      name: 'env',
      component: env
    },
    {
      path: '/succ-verify',
      name: 'succ-verify',
      component: succVerify
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile
    }
  ]
})

export default router
