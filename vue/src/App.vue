<script>
import {
  LMap,
  LTileLayer,
  LMarker,
  // LControlScale,
  // LIcon,
  // LControlLayers,
  // LTooltip,
  // LPopup,
  LPolyline,
  // LPolygon,
  // LRectangle,
} from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    // LControlScale,
    // LIcon,
    // LControlLayers,
    // LTooltip,
    // LPopup,
    LPolyline,
    // LPolygon,
    // LRectangle,
  },
  props: ['piece', 'pieceImage'],
  data() {
    return {
      allowZoom: false,
      zoom: 14,
      userCoords: {
        latitude: 43.6285,
        longitude: 3.8694,
      },
    }
  },
  computed: {
    domain() {
      return JSON.parse(this.piece)
    },
    pictureUrl() {
      return JSON.parse(this.pieceImage)
    },
    userLat() {
      return this.userCoords.latitude
    },
    userLong() {
      return this.userCoords.longitude
    },
  },
  methods: {
    setPosition(pos) {
      let time = new Date().toUTCString()
      console.log(pos.coords, time)
      this.userCoords.latitude = pos.coords.latitude
      this.userCoords.longitude = pos.coords.longitude
    },
    errorGettingPos(e) {
      console.log('error getting position ===>', e)
    },
    getUserPos() {
      navigator.geolocation.getCurrentPosition(
        this.setPosition,
        this.errorGettingPos,
      )
    },
    watchUserPos() {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          this.setPosition,
          this.errorGettingPos,
        )
      }
    },
  },
  beforeMount() {
    this.watchUserPos()
  },
  mounted() {
    console.log('this.domain ===>', this.domain)
  },
  updated() {},
}
</script>

<template>
  <div class="t-domain">
    <div class="t-domain__fixed">
      <h2 class="t-domain__title">{{ domain.title }}</h2>
      <div class="t-domain__map t-map__container">
        <l-map
          draggable="false"
          :minZoom="zoom"
          :maxZoom="zoom"
          v-model:zoom="zoom"
          :center="[userLat, userLong]"
          bounceAtZoomLimits="true"
          zoomControl="false"
          @moveend="getUserPos"
        >
          <l-tile-layer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          ></l-tile-layer>

          <!-- User Marker -->
          <l-marker
            :lat-lng="[userLat, userLong]"
            @moveend="console.log('moveend')"
          >
          </l-marker>

          <l-marker :lat-lng="[userLat + 0.007, userLong - 0.002]"> </l-marker>
          <l-marker :lat-lng="[userLat - 0.003, userLong - 0.001]"> </l-marker>
          <l-marker :lat-lng="[userLat + 0.002, userLong + 0.004]"> </l-marker>

          <l-polyline
            :lat-lngs="[
              [userLat + 0.007, userLong - 0.002],
              [userLat - 0.003, userLong - 0.001],
              [userLat + 0.002, userLong + 0.004],
              [userLat + 0.007, userLong - 0.002],
            ]"
            color="green"
          ></l-polyline>
        </l-map>
      </div>
    </div>

    <div class="t-domain__content">
      <!-- <div class="t-domain__image"></div> -->
      <div class="t-step__container">
        <div
          class="t-step__item"
          v-for="(step, stepIndex) in domain.visit"
          :key="stepIndex"
        >
          <p class="t-step__name">
            <b>Etape {{ stepIndex + 1 }} :</b> {{ step.name }}
          </p>
          <span class="t-step__icon"></span>
        </div>
      </div>
    </div>
  </div>
</template>
