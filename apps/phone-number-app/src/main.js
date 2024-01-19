import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'

const pinia = createPinia()
const app = createApp(App)

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

app.use(pinia)
app.use(router)
app.mount('#app')
