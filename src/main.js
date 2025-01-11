// main.js
/* 
* Point d'entrée principal de l'application
* Configuration de Vue.js et des plugins
*/

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/fonts/fonts.css'

// Ajout de FontAwesome
import '@fortawesome/fontawesome-free/css/all.css'

const app = createApp(App)

app.use(router)
app.use(store)

app.mount('#app')