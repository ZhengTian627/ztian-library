import './assets/main.css'
//import './style.css'

//import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

const app = createApp(App)
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
