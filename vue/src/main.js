import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const mountEl = document.querySelector('#app')

const app = createApp(App, mountEl.dataset)

app.use(createPinia())

app.mount('#app')
