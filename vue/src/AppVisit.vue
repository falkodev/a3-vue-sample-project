<template>
  <div class="t-visit">
    <Modal
      :dataObj="dataObject"
      :modalOpen="modalOpen"
      :modalStepIndex="modalStepIndex"
      @close-modal="toggleModal"
    />
    <div class="t-visit__bloc" v-if="dataObject.itineraryType">
      <div class="t-visit__fixed">
        <h2 class="t-visit__title">{{ dataObject.title }}</h2>
        <IconGeoloc class="t-visit__geoloc" @click="centerMapOnUser" />
        <div class="t-visit__map t-map__container">
          <l-map
            draggable="false"
            :minZoom="zoom - 1"
            :maxZoom="zoom + 2"
            :center="[mapCenter.lat, mapCenter.long]"
            v-model="zoom"
            bounceAtZoomLimits="true"
            zoomControl="false"
            @moveend="getUserPos"
          >
            <l-tile-layer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            ></l-tile-layer>

            <l-geo-json :geojson="geojsonFile" />

            <l-marker
              v-if="userLat && userLong"
              :lat-lng="[userLat, userLong]"
              @moveend="getUserPos"
            >
              <l-icon
                iconUrl="/apos-frontend/default/modules/content/icons/pin-user.svg"
                :iconSize="[50, 50]"
              />
            </l-marker>
          </l-map>
        </div>
      </div>
      <div class="t-visit__frame">
        <div class="t-visit__content">
          <div
            v-for="(visit, visitIndex) in dataObject._visits"
            :key="visitIndex"
            class="t-step__bloc"
          >
            <div
              v-for="(step, stepIndex) in visit.steps"
              :key="stepIndex"
              class="t-step__bloc"
            >
              <div class="t-step__container">
                <div class="t-step__item" @click="toggleModal(stepIndex)">
                  <p class="t-step__name">
                    <b> Etape {{ stepIndex + 1 }} :</b> {{ step.title }}
                  </p>
                  <span class="t-step__icon"></span>
                </div>
                <p class="t-step__timing">
                  {{ getTotalDuration(step.subSteps) }}
                </p>
              </div>
              <div class="t-media__container">
                <div
                  class="t-media__item t-media__item--rectangle"
                  v-for="(subStep, subStepIndex) in step.subSteps"
                  :key="'step' + subStepIndex"
                >
                  <div
                    v-if="subStep.image"
                    class="t-media__image"
                    :style="`background-image: url( ${
                      attachmentList.filter(
                        (attachment) => attachment.name === subStep.image.name,
                      )[0]._urls.full
                    })`"
                  >
                    <p class="t-media__info">
                      {{ subStep.title }}
                    </p>
                  </div>
                  <div v-else class="t-media__image">
                    <p class="t-media__info">
                      {{ subStep.title }}
                    </p>
                  </div>
                  <span :class="{ 't-media__download': true }">
                    <IconArrow />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUpdated, onBeforeMount, reactive } from 'vue'
import {
  LMap,
  LTileLayer,
  LMarker,
  LIcon,
  LGeoJson,
} from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'
import IconArrow from '@/components/icons/IconArrow.vue'
import IconGeoloc from '@/components/icons/IconGeoloc.vue'
import Modal from '@/components/Modal.vue'

const props = defineProps(['piece', 'attachments'])

let geojsonFile = reactive({})
let jsonUrl = reactive({})
let geojsonPoint = ref(null)

let modalOpen = ref(false)
let modalStepIndex = ref(0)

let zoom = ref(17)
let userCoords = reactive({
  latitude: 0,
  longitude: 0,
})

let mapCenter = reactive({
  lat: 0,
  long: 0,
})

const dataObject = computed(() => JSON.parse(props.piece))
const attachmentList = computed(() => JSON.parse(props.attachments))

let userLat = computed(() => {
  return userCoords.latitude
})
let userLong = computed(() => {
  return userCoords.longitude
})
const toggleModal = (index) => {
  console.log('toggle modal')
  if (modalOpen.value == true) {
    modalOpen.value = false
  } else {
    modalOpen.value = true
  }
  modalStepIndex.value = index
  return
}
const getTotalDuration = (arr) => {
  let res = arr
    .reduce((pre, curr) => {
      return [
        ...pre,
        parseInt(curr.duration.split(':')[0]) * 60 +
          parseInt(curr.duration.split(':')[1]),
      ]
    }, '')
    .reduce((pre, curr) => {
      return parseInt(pre) + parseInt(curr)
    }, 0)
  if (Math.floor(res / 60) > 0) {
    if (res % 60 < 10) {
      return Math.floor(res / 60) + ' h ' + '0' + (res % 60) + ' min'
    } else {
      return Math.floor(res / 60) + ' h ' + (res % 60) + ' min'
    }
  } else {
    if (res % 60 < 10) {
      return '0' + (res % 60) + ' min'
    } else {
      return (res % 60) + ' min'
    }
  }
}
const centerMapOnUser = () => {
  mapCenter.lat = userLat.value
  mapCenter.long = userLong.value
}
const centerMapOnGeoPoint = () => {
  if (geojsonPoint.value) {
    // mapCenter.lat = geojsonPoint.value[0]
    // mapCenter.long = geojsonPoint.value[1]
  }
}
const setPosition = (pos) => {
  userCoords.latitude = pos.coords.latitude
  userCoords.longitude = pos.coords.longitude
}
const errorGettingPos = (e) => {
  return e
}

const getUserPos = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setPosition, errorGettingPos, {
      timeout: 2000,
      maximumAge: 0,
      enableHighAccuracy: true,
    })
  }
}
const watchUserPos = () => {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(setPosition, errorGettingPos, {
      timeout: 2000,
      maximumAge: 0,
      enableHighAccuracy: true,
    })
  }
}

onBeforeMount(async () => {
  watchUserPos()

  jsonUrl = attachmentList.value.filter(
    (attachment) => attachment.extension === 'geojson',
  )[0]._url

  const response = await fetch(jsonUrl, { method: 'GET' })
  geojsonFile = await response.json()

  geojsonPoint = [
    geojsonFile.features.filter((x) => x.geometry.type === 'Point')[0].geometry
      .coordinates[1],
    geojsonFile.features.filter((x) => x.geometry.type === 'Point')[0].geometry
      .coordinates[0],
  ]

  centerMapOnGeoPoint()

  console.log('dataObject ===>', dataObject.value)
})
onUpdated(() => {
  watchUserPos()
  if (geojsonPoint.value) {
    centerMapOnGeoPoint()
  }
})
</script>
