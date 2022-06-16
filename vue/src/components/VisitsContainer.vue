<template>
  <div class="t-steps">
    <div v-if="centerLoaded" class="t-app-itinerary__map">
      <l-map v-model="zoom" :center="[center.lat, center.lon]" :zoom="zoom">
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

    <div v-if="itinerary.steps.length" class="t-steps__loaded t-loaded">
      <div class="t-loaded__title">{{ $t.visitList }}</div>
      <div class="t-loaded__steps">
        <VisitItem
          v-for="(step, index) in itinerary.steps"
          :id="index"
          :key="step"
          :status="true"
          :step="step"
          @removeStep="removeStep"
        />
      </div>
    </div>

    <div v-if="removedSteps.length" class="t-steps__loaded t-loaded">
      <div class="t-loaded__title">{{ $t.add }}</div>
      <div class="t-loaded__steps">
        <VisitItem
          v-for="(step, index) in removedSteps"
          :id="index"
          :key="step"
          :status="false"
          :step="step"
          @addStep="addStep"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, toRefs } from 'vue'
import VisitItem from './VisitItem.vue'
import { LMap, LMarker, LTileLayer } from '@vue-leaflet/vue-leaflet'
import { icon as renderIcon } from 'leaflet'
import 'leaflet/dist/leaflet.css'

const props = defineProps({
  piece: Object,
})

const $t = window.apos.itinerary.labels
const assetBaseUrl = window.apos.itinerary.assetBaseUrl
const { piece } = toRefs(props)
const itinerary = piece.value
const removedSteps = reactive([])
const zoom = 10
let center = reactive({})
let centerLoaded = reactive(false)
const icon = renderIcon({
  iconUrl: assetBaseUrl + '/modules/content/icons/orange-marker.png',
  iconSize: [20, 20],
  iconAnchor: [16, 37],
})

const emit = defineEmits(['updateItinerary'])

function removeStep(delIndex) {
  let temp = itinerary.steps.splice(delIndex, 1)
  removedSteps.push(temp[0])
  updateItinerary(itinerary)
  updateCenter()
}

function addStep(addIndex) {
  let temp = removedSteps.splice(addIndex, 1)
  itinerary.steps.push(temp[0])
  itinerary.steps.sort((a, b) => a.order - b.order)
  updateItinerary(itinerary)
  updateCenter()
}

function attributeId() {
  const length = itinerary.steps.length
  for (let index = 0; index < length; index++) {
    itinerary.steps[index].order = index
  }
}

const updateItinerary = (itinerary) => {
  emit('updateItinerary', itinerary)
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

.t-steps {
  margin-top: 36px;
}

.t-app-itinerary__map {
  position: fixed;
  top: 12vh;
  right: 0;
  left: 0;
  height: 35vh;
  width: 100vw;
  z-index: 99;
}

.t-loaded__title {
  color: $color-purple;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 17px;
}
</style>
