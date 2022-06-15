<template>
  <div class="t-event">
    <div class="t-app-event__map">
      <l-map v-model="zoom" :center="[center.lat, center.lon]" :zoom="zoom">
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ></l-tile-layer>

        <!-- <l-marker
          v-for="marker in itinerary.steps"
          :key="marker"
          :icon="icon"
          :lat-lng="[marker.place.latitude, marker.place.longitude]"
        >
        </l-marker> -->
      </l-map>
    </div>
  </div>
</template>

<script setup>
// import { LMap, LMarker, LTileLayer } from '@vue-leaflet/vue-leaflet'
// import 'leaflet/dist/leaflet.css'
// import { reactive, toRefs } from 'vue'
// import { icon as renderIcon } from 'leaflet'

// const assetBaseUrl = window.apos.itinerary.assetBaseUrl
// const $t = window.apos.itinerary.labels
// const zoom = 10
// let center = reactive({ lat: 0, lon: 0 })
// let centerLoaded = reactive(false)
// const icon = renderIcon({
//   iconUrl: assetBaseUrl + '/modules/content/icons/orange-marker.png',
//   iconSize: [20, 20],
//   iconAnchor: [16, 37],
// })
</script>

<style lang="scss">
.t-event {
  margin-top: 36px;
}
.t-app-event__map {
  position: fixed;
  top: 12vh;
  right: 0;
  left: 0;
  height: 35vh;
  width: 100vw;
  z-index: 99;
}
</style>
