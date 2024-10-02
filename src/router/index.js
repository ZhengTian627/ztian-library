import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/view/HomeView.vue'
import AboutView from '@/view/AboutView.vue'
import LoginView from '@/view/LoginView.vue'
import AccessDeniedView from '@/view/AccessDeniedView.vue'
import { isAuthenticated } from '@/auth.js'
import AddBookView from '@/view/AddBookView.vue'
import FirebaseSigninView from '@/view/FirebaseSigninView.vue'
import FirebaseRegisterView from '@/view/FirebaseRegisterView.vue'
import LogoutView from '@/view/LogoutView.vue'
import GetBookCountView from '@/view/GetBookCountView.vue'
import WeatherView from '@/view/WeatherView.vue'
import CountBookAPI from '@/view/CountBookAPI.vue'
import BookInfo from '@/view/BookInfoView.vue'

const routes = [
  {
    path: '/GetBookCount',
    name: 'GetBookCount',
    component: GetBookCountView
  },
  {
    path: '/CountBookAPI',
    name: 'CountBookAPI',
    component:CountBookAPI
  },
  {
    path: '/BookInfo',
    name: 'BookInfo',
    component:BookInfo
  },
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/access-denied',
    name: 'AccessDenied',
    component: AccessDeniedView
  },
  {
    path: '/addbook',
    name: 'AddBook',
    component:AddBookView
  },
  {
    path: '/FireLogin',
    name: 'FireLogin',
    component:FirebaseSigninView
  },
  {
    path: '/FireRegister',
    name: 'FireRegister',
    component:FirebaseRegisterView
  },
  {
    path: '/Logout',
    name: 'Logout',
    component:LogoutView
  },
  {
    path: '/WeatherCheck',
    name: 'WeatherCheck',
    component: WeatherView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next('/access-denied')
  } else {
    next()
  }
})

export default router
