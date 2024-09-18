<template>
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page">Home</router-link>
        </li>

        <li class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active">About</router-link>
        </li>

        <li class="nav-item" v-if="!isAuthenticated">
          <router-link to="/login" class="nav-link" active-class="active">Login</router-link>
        </li>

        <li class="nav-item" v-if="isAuthenticated">
          <a href="#" class="nav-link" @click="handleLogout">Logout</a>
        </li>

        <li class="nav-item">
          <router-link to="/addbook" class="nav-link" active-class="active">Add Book</router-link>
        </li>

        <li class="nav-item">
          <router-link to="/FireLogin" class="nav-link" active-class="active">Firebase Login</router-link>
        </li>

        <li class="nav-item">
          <router-link to="/FireRegister" class="nav-link" active-class="active">Firebase Register
          </router-link>
        </li>

        <li class="nav-item">
          <router-link to="/GetBookCount" class="nav-link" active-class="active">Get Book Count</router-link>
        </li>
      </ul>
    </header>
  </div>
</template>

<script setup>
import { isAuthenticated, logout } from '@/auth.js'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogout = () => {
  logout()
  router.push('/login')
}
</script>

<style scoped>
nav ul {
  display: flex;
  list-style: none;
}

nav ul li {
  margin-right: 15px;
  cursor: pointer;
}
</style>
