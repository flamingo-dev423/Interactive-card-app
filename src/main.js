import { createApp } from 'vue'
import App from './App.vue'
import VueCreditCardValidation from 'vue-credit-card-validation';
import router from './router'
import './assets/main.css'


const app = createApp(App)

app.use(router)
app.use(VueCreditCardValidation)
app.mount('#app')
