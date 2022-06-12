<template>
  <div class="t-visit">
    <div class="t-visit__fixed">
      <h2 class="t-visit__title">{{ domain.title }}</h2>
      <div class="t-visit__map t-map__container">
        <l-map
          draggable="false"
          :minZoom="zoom - 1"
          :maxZoom="zoom + 2"
          v-model="zoom"
          :center="[userLat, userLong]"
          bounceAtZoomLimits="true"
          zoomControl="false"
          @moveend="getUserPos"
        >
          <l-tile-layer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          ></l-tile-layer>

          <l-geo-json :geojson="geojson" />

          <l-marker :lat-lng="[userLat, userLong]" @moveend="getUserPos">
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
          v-for="(step, stepIndex) in domain.visitSteps"
          :key="stepIndex"
          class="t-step__bloc"
        >
          <div class="t-step__container">
            <div class="t-step__item">
              <p class="t-step__name">
                <b>Etape {{ stepIndex + 1 }} :</b> {{ step.name }}
              </p>
              <span class="t-step__icon"></span>
            </div>
            <p class="t-step__timing">{{ step.timeLength }} minutes</p>
          </div>
          <div class="t-media__container">
            <div
              class="t-media__item"
              v-for="(subStep, subStepIndex) in step.subSteps"
              :key="'subStep' + subStepIndex"
            >
              <div
                class="t-media__image"
                v-for="(image, imageIndex) in subStep._image"
                :key="imageIndex"
                :style="`background-image: url( ${
                  attachmentList.filter(
                    (x) => x.name === image.attachment.name,
                  )[0]._urls.full
                })`"
              >
                <p class="t-media__info">
                  {{ subStep.name }}
                </p>
              </div>
              <span :class="{ 't-media__download': subStep.downloadable }">
                <IconArrow />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  computed,
  onUpdated,
  onBeforeMount,
  onMounted,
  reactive,
} from 'vue'
import {
  LMap,
  LTileLayer,
  LMarker,
  LIcon,
  LGeoJson,
} from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'
import IconArrow from '@/components/icons/IconArrow.vue'

const props = defineProps(['piece', 'attachments'])

let zoom = ref(17)
let userCoords = reactive({
  latitude: 43.6367,
  longitude: 3.5866,
})
let geojson = reactive({})
let jsonUrl = reactive({})

const domain = computed(() => JSON.parse(props.piece))
const attachmentList = computed(() => JSON.parse(props.attachments))

let userLat = computed(() => {
  return userCoords.latitude
})
let userLong = computed(() => {
  return userCoords.longitude
})

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
onBeforeMount(() => {
  watchUserPos()
})
onMounted(() => {
  jsonUrl = attachmentList.value.filter((x) => x.extension === 'geojson')[0]
    ._url

  fetch(jsonUrl)
    .then((response) => response.json())
    .then((data) => {
      geojson = data
    })
})
onUpdated(() => {
  watchUserPos()
})
</script>
