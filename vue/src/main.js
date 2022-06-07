import { createApp } from 'vue'
import { createPinia } from 'pinia'
import AppVisit from './AppVisit.vue'

const mountEl = document.querySelector('#app-visit')

const app = createApp(AppVisit, mountEl.dataset)

app.use(createPinia())

app.mount('#app-visit')
