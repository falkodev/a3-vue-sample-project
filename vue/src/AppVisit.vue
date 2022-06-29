<template>
  <div class="t-visit">
    <Modal
      :dataObj="dataObject"
      :modalOpen="modalOpen"
      :modalStepIndex="modalStepIndex"
      :modalSubIndex="modalSubIndex"
      :labels="$t"
      @close-modal="toggleModal"
      @inc-sub-index="incModalSubIndex"
      @dec-sub-index="decModalSubIndex"
    />
    <div class="t-visit__bloc">
      <div class="t-visit__fixed">
        <h2 class="t-visit__title">{{ dataObject.title }}</h2>
        <div class="t-visit__geoloc">
          <div class="t-visit__geoloc-icon">
            <IconUserTarget
              class="t-visit__geoloc-icon-svg"
              @click="centerMapOnUser"
            />
          </div>
          <div class="t-visit__geoloc-icon" id="geoloc">
            <IconGeoloc
              class="t-visit__geoloc-icon-svg"
              @click="centerMapOnGeoPoint"
            />
          </div>
        </div>
        <div class="t-visit__map t-map__container">
          <l-map
            draggable="false"
            :minZoom="zoom - 2"
            :maxZoom="zoom + 2"
            :center="mapCenter.coords"
            v-model="zoom"
            bounceAtZoomLimits="true"
            zoomControl="false"
            @moveend="getUserPos"
          >
            <l-tile-layer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            ></l-tile-layer>

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

            <l-polyline :lat-lngs="geojsonMultiLine.val" color="green">
            </l-polyline>

            <div v-for="(point, pointI) in geojsonPoints.val" :key="pointI">
              <l-marker :lat-lng="point.coords">
                <l-popup>
                  <h3>{{ point.properties.name }}</h3>
                  <p>{{ point.properties.desc }}</p>
                </l-popup>
              </l-marker>
            </div>
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
                <div
                  class="t-step__item"
                  @click="toggleModal(stepIndex, modalSubIndex)"
                >
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
                  class="t-media__item"
                  :class="{
                    't-media__item--rectangle': dataObject.itineraryType,
                  }"
                  v-for="(subStep, subStepIndex) in step.subSteps"
                  :key="'step' + subStepIndex"
                  @click="toggleModal(stepIndex, subStepIndex)"
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
import { ref, computed, onBeforeMount, reactive } from 'vue'
import {
  LMap,
  LTileLayer,
  LMarker,
  LIcon,
  LPopup,
  LPolyline,
} from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'
import IconArrow from '@/components/icons/IconArrow.vue'
import IconUserTarget from '@/components/icons/IconUserTarget.vue'
import IconGeoloc from '@/components/icons/IconGeoloc.vue'
import Modal from '@/components/Modal.vue'

const props = defineProps(['piece', 'attachments'])

const $t = window.apos.itinerary.labels

let geojsonFile = ''
let jsonUrl = ''
let geojsonPoint = reactive({ val: [] })
let geojsonPoints = reactive({ val: [] })
let geojsonMultiLine = reactive({ val: [] })

let modalOpen = ref(false)
let modalStepIndex = ref(0)
let modalSubIndex = ref(0)

let zoom = ref(17)
let userCoords = reactive({
  latitude: 42.5,
  longitude: 3.575,
})

let pointIndex = ref(0)
let mapCenter = reactive({
  coords: [42, 3.575],
})

const dataObject = computed(() => JSON.parse(props.piece))
const attachmentList = computed(() => JSON.parse(props.attachments))

let userLat = computed(() => userCoords.latitude)
let userLong = computed(() => userCoords.longitude)

const toggleModal = (stepIndex, subIndex) => {
  if (modalOpen.value == true) {
    modalOpen.value = false
  } else {
    modalOpen.value = true
  }
  if (modalStepIndex && modalSubIndex) {
    modalStepIndex.value = stepIndex
    modalSubIndex.value = subIndex
  }
  return
}
const incModalSubIndex = () => {
  if (
    modalSubIndex.value <
    dataObject.value._visits[0].steps[modalStepIndex.value].subSteps.length - 1
  ) {
    modalSubIndex.value++
  } else {
    modalSubIndex.value = 0
  }
}
const decModalSubIndex = () => {
  if (modalSubIndex.value > 0) {
    modalSubIndex.value--
  } else {
    modalSubIndex.value =
      dataObject.value._visits[0].steps[modalStepIndex.value].subSteps.length -
      1
  }
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
  mapCenter.coords = [userLat.value, userLong.value]
}
const centerMapOnGeoPoint = () => {
  pointIndex.value %= geojsonPoints.val.length - 1
  if (geojsonPoint.val.length !== 0) {
    mapCenter.coords = [
      geojsonPoints.val[pointIndex.value].coords[0],
      geojsonPoints.val[pointIndex.value].coords[1],
    ]
  }
  pointIndex.value += 1
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

  geojsonPoint.val = [
    geojsonFile.features.filter((x) => x.geometry.type === 'Point')[0].geometry
      .coordinates[1],
    geojsonFile.features.filter((x) => x.geometry.type === 'Point')[0].geometry
      .coordinates[0],
  ]

  geojsonMultiLine.val = await geojsonFile.features
    .filter((x) => x.geometry.type === 'MultiLineString')[0]
    .geometry.coordinates[0].reduce(
      (prev, curr) => [...prev, [curr[1], curr[0]]],
      [],
    )

  geojsonPoints.val = geojsonFile.features
    .filter((x) => x.geometry.type === 'Point')
    .reduce(
      (prev, curr) => [
        ...prev,
        {
          coords: [curr.geometry.coordinates[1], curr.geometry.coordinates[0]],
          properties: curr.properties,
        },
      ],
      [],
    )

  if (geojsonPoint.val.length !== 0) {
    mapCenter.coords = [
      geojsonPoints.val[pointIndex.value].coords[0],
      geojsonPoints.val[pointIndex.value].coords[1],
    ]
  }
  if (dataObject.value.latitude && dataObject.value.longitude) {
    mapCenter.coords = [dataObject.value.latitude, dataObject.value.longitude]
  }
})
</script>
