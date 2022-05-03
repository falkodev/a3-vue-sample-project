import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App_Itinerary from './AppItinerary.vue'

// const app_itinerary = createApp(App_Itinerary)

const mountEl = document.querySelector('#app_itinerary')
const app = createApp(App_Itinerary, mountEl.dataset)
app.use(createPinia())
app.mount('#app_itinerary')
