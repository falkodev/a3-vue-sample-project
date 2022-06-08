<script>
import {
  LMap,
  LTileLayer,
  LMarker,
  LIcon,
  LGeoJson,
} from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'
import IconArrow from '@/components/icons/IconArrow.vue'

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
    LGeoJson,
    IconArrow,
  },
  props: ['piece', 'attachments'],
  data() {
    return {
      allowZoom: false,
      zoom: 17,
      userCoords: {
        latitude: 43.6367,
        longitude: 3.5866,
      },
      domain: {},
      geojson: '',
    }
  },
  computed: {
    attachmentList() {
      return JSON.parse(this.attachments)
    },
    userLat() {
      return this.userCoords.latitude
    },
    userLong() {
      return this.userCoords.longitude
    },
    visitPath() {
      return [
        { type: 'start', lat: this.userLat, long: this.userLong },
        {
          type: 'point',
          lat: this.userLat - 0.001,
          long: this.userLong - 0.001,
        },
        {
          type: 'place',
          lat: this.userLat + 0.005,
          long: this.userLong - 0.002,
        },
        {
          type: 'point',
          lat: this.userLat + 0.002,
          long: this.userLong + 0.004,
        },
        {
          type: 'place',
          lat: this.userLat + 0.002,
          long: this.userLong + 0.004,
        },
        { type: 'end', lat: this.userLat, long: this.userLong },
      ]
    },
    places() {
      return this.visitPath.filter((x) => x.type === 'place')
    },
    visitPoints() {
      return this.visitPath.reduce((prev, curr) => {
        prev.push([curr.lat, curr.long])
        return prev
      }, [])
    },
  },
  methods: {
    setPosition(pos) {
      let time = new Date().toUTCString()
      console.log(pos.coords, 'time :', time)
      this.userCoords.latitude = pos.coords.latitude
      this.userCoords.longitude = pos.coords.longitude
    },
    errorGettingPos(e) {
      return e
    },
    getUserPos() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          this.setPosition,
          this.errorGettingPos,
          {
            timeout: 2000,
            maximumAge: 0,
            enableHighAccuracy: true,
          },
        )
      } else {
        // notif or "snackbar"
      }
    },
    watchUserPos() {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          this.setPosition,
          this.errorGettingPos,
          {
            timeout: 2000,
            maximumAge: 0,
            enableHighAccuracy: true,
          },
        )
      } else {
        // notif or "snackbar"
      }
    },
  },
  beforeMount() {
    this.watchUserPos()
    this.domain = JSON.parse(this.piece)
    // console.log(this.domain)
    const jsonUrl = this.attachmentList.filter(x => x.extension === 'geojson')[0]._url
    fetch(jsonUrl)
    .then(response => response.json())
    .then(data => {
      console.log(this.geojson = data)
    })
  },
  mounted() {},
  updated() {
    this.watchUserPos()
  },
}
</script>

<template>
  <div class="t-visit">
    <div class="t-visit__fixed">
      <h2 class="t-visit__title">{{ domain.title }}</h2>
      <div class="t-visit__map t-map__container">
        <l-map
          draggable="false"
          :minZoom="zoom"
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
              iconSize="[120, 120]"
            />
          </l-marker>

        </l-map>
      </div>
    </div>

    <div class="t-visit__content">
      <div
        v-for="(step, stepIndex) in this.domain.visit"
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
            v-for="(subStep, subStepIndex) in step.subStep"
            :key="'subStep' + subStepIndex"
          >
            <div
              class="t-media__image"
              v-for="(image, imageIndex) in subStep._image"
              :key="imageIndex"
              :style="`background-image: url( ${
                attachmentList.filter((x) => x.name == image.attachment.name)[0]
                  ._urls.full
              })`"
            >
              <p class="t-media__info">
                {{ subStep.name }}
              </p>
            </div>
            <span :class="{ 't-media__download': subStep.downloadable }">
              <IconArrow/>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
