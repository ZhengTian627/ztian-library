<template>
  <div class="login-container">
    <h1 class="login-title">Login</h1>
    <form @submit.prevent="submitLogin">
      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          v-model="username"
          @blur="validateUsername"
          class="form-control"
        />
        <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          @blur="validatePassword"
          class="form-control"
        />
        <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
      </div>

      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')

const errors = ref({
  username: null,
  password: null,
})

const validateUsername = () => {
  if (!username.value) {
    errors.value.username = 'Username is required'
  } else {
    errors.value.username = null
  }
}

const validatePassword = () => {
  if (!password.value) {
    errors.value.password = 'Password is required'
  } else {
    errors.value.password = null
  }
}

const submitLogin = () => {
  validateUsername()
  validatePassword()

  if (!errors.value.username && !errors.value.password) {
    alert('Login successful!')
    // Handle successful login logic here, like redirecting to another page
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.login-title {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-control {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.btn {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.text-danger {
  color: red;
  font-size: 0.875rem;
}
</style>
