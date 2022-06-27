<template>
  <div class="t-event">
    <div class="t-app-event__map">
      <l-map v-model="zoom" :center="[center.lat, center.lon]" :zoom="zoom">
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ></l-tile-layer>
      </l-map>
    </div>
  </div>
</template>

<script setup>
import { LMap, LTileLayer } from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'
import { reactive } from 'vue'

let zoom = 10
let center = reactive({ lat: 45.12, lon: 8.13 })
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
  height: 26vh;
  width: 100vw;
  z-index: 99;
}
</style>
