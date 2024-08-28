import { ref } from 'vue'

export const isAuthenticated = ref(localStorage.getItem('isAuthenticated') === 'true')

export function login() {
  isAuthenticated.value = true
  localStorage.setItem('isAuthenticated', 'true')
}

export function logout() {
  isAuthenticated.value = false
  localStorage.removeItem('isAuthenticated')
}
