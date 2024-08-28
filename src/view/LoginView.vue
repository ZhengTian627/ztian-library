<template>
  <div class="login-container">
    <h1 class="login-title">Login</h1>
    <form @submit.prevent="submitLogin">
      <div class="form-group">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          v-model="formData.username"
          class="form-control"
          placeholder="Enter your username"
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model="formData.password"
          class="form-control"
          placeholder="Enter your password"
        />
      </div>

      <button type="submit" class="btn btn-primary">Login</button>
      <div v-if="errorMessage" class="text-danger">{{ errorMessage }}</div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { login } from '@/auth.js'

const formData = ref({
  username: '',
  password: ''
})

const errorMessage = ref('')

const submitLogin = () => {
  const hardCodedUsername = 'test'
  const hardCodedPassword = 'Qwer!234'

  if (formData.value.username === hardCodedUsername && formData.value.password === hardCodedPassword) {
    login()  
    window.location.reload() 
  } else {
    errorMessage.value = 'Invalid username or password'
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
}
</style>
