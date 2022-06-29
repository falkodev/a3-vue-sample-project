import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App_Itinerary from './AppItinerary.vue'
import AppVisit from './AppVisit.vue'

const mountEl = document.querySelector('#app_itinerary')
if (mountEl) {
  const app = createApp(App_Itinerary, mountEl.dataset)
  app.use(createPinia())
  app.mount('#app_itinerary')
}

const mountElVisit = document.querySelector('#app-visit')
if (mountElVisit) {
  const appVisit = createApp(AppVisit, mountElVisit.dataset)
  appVisit.use(createPinia())
  appVisit.mount('#app-visit')
}
