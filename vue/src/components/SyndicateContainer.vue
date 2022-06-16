<template>
  <div class="t-syndicate">
    <div v-if="centerLoaded" class="t-app-itinerary__map">
      <l-map
        v-model="zoom"
        :center="[center.lat, center.lon]"
        :zoom="zoom"
        draggable="false"
      >
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ></l-tile-layer>

        <l-marker
          v-for="marker in itinerary.steps"
          :key="marker"
          :icon="icon"
          :lat-lng="[marker.place.latitude, marker.place.longitude]"
        >
        </l-marker>
      </l-map>
    </div>

    <div class="t-syndicate__steps">
      <VisitItem
        v-for="(step, index) in itinerary.steps"
        :id="index"
        :key="step"
        :status="true"
        :step="step"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive, toRefs } from 'vue'
import { LMap, LMarker, LTileLayer } from '@vue-leaflet/vue-leaflet'
import VisitItem from './SyndicateStepItem.vue'
import { icon as renderIcon } from 'leaflet'
import 'leaflet/dist/leaflet.css'

const props = defineProps({
  piece: Object,
})

const assetBaseUrl = window.apos.itinerary.assetBaseUrl
const { piece } = toRefs(props)
const itinerary = piece.value
const zoom = 10
let center = reactive({})
let centerLoaded = reactive(false)
const icon = renderIcon({
  iconUrl: assetBaseUrl + '/modules/content/icons/orange-marker.png',
  iconSize: [20, 20],
  iconAnchor: [16, 37],
})

function attributeId() {
  const length = itinerary.steps.length
  for (let index = 0; index < length; index++) {
    itinerary.steps[index].order = index
  }
}

function updateCenter() {
  const step = itinerary.steps[0]
  const length = itinerary.steps.length

  let tempCenter = {
    left: step.place.latitude,
    right: step.place.latitude,
    top: step.place.longitude,
    bottom: step.place.longitude,
  }

  for (let i = 0; i < length; i++) {
    const place = itinerary.steps[i].place
    if (place.latitude < tempCenter.left) {
      tempCenter.left = place.latitude
    }
    if (place.latitude > tempCenter.right) {
      tempCenter.right = place.latitude
    }
    if (place.longitude < tempCenter.top) {
      tempCenter.top = place.longitude
    }
    if (place.longitude > tempCenter.bottom) {
      tempCenter.bottom = place.longitude
    }
  }

  center = {
    lat: (tempCenter.left + tempCenter.right) / 2,
    lon: (tempCenter.top + tempCenter.bottom) / 2,
  }
  centerLoaded = true
}

attributeId()
updateCenter()
</script>

<style lang="scss">
@import '/assets/settings.scss';

.t-syndicate {
  margin-top: 36px;
}

.t-app-itinerary__map {
  position: fixed;
  top: 12vh;
  right: 0;
  left: 0;
  height: 20vh;
  width: 100vw;
  z-index: 99;
}

.t-syndicate {
  &__steps {
  }

  &__step {
    &-title {
      color: $color-purple;
      text-transform: uppercase;
      font-weight: bold;
      font-size: 17px;
    }
  }
}
</style>
