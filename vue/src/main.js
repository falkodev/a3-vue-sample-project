import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App_Itinerary from './AppItinerary.vue'

const app_itinerary = createApp(App_Itinerary)

app_itinerary.use(createPinia())

app_itinerary.mount('#app_itinerary')
