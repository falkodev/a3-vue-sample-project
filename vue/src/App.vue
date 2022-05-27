<script>
import {
  LMap,
  LTileLayer,
  LMarker,
  // LControlScale,
  LIcon,
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
    LIcon,
    // LControlLayers,
    // LTooltip,
    // LPopup,
    LPolyline,
    // LPolygon,
    // LRectangle,
  },
  props: ['piece', 'pieceImage', 'pieceSubImages'],
  data() {
    return {
      allowZoom: false,
      zoom: 15,
      userCoords: {
        latitude: 43.6367,
        longitude: 3.5866,
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
    subImagesUrl() {
      return JSON.parse(this.pieceSubImages)
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
          type: 'lieu',
          lat: this.userLat + 0.005,
          long: this.userLong - 0.002,
        },
        {
          type: 'point',
          lat: this.userLat + 0.002,
          long: this.userLong + 0.004,
        },
        {
          type: 'lieu',
          lat: this.userLat + 0.002,
          long: this.userLong + 0.004,
        },
        { type: 'end', lat: this.userLat, long: this.userLong },
      ]
    },
    lieux() {
      return this.visitPath.filter((x) => x.type == 'lieu')
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
      return new Promise((res) => {
        res(pos)
      })
        .then((pos) => {
          let time = new Date().toUTCString()
          console.log(pos.coords, 'time :', time)
          this.userCoords.latitude = pos.coords.latitude
          this.userCoords.longitude = pos.coords.longitude
        })
        .catch((e) => {
          console.log(e)
        })
    },
    errorGettingPos(e) {
      console.log('error getting position ===>', e)
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
        console.log(
          'Cannot execute getUserPos() ===> navigator.geolocation not available ',
        )
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
        console.log(
          'Cannot execute watchUserPos() ===> navigator.geolocation not available ',
        )
      }
    },
  },
  beforeMount() {
    this.watchUserPos()
  },
  mounted() {
    console.log('this.domain ===>', this.domain)
    console.log('visit points ===>', this.visitPoints)
  },
  updated() {
    this.getUserPos()
  },
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
          v-model="zoom"
          :center="[userLat, userLong]"
          bounceAtZoomLimits="true"
          zoomControl="false"
          @moveend="getUserPos"
        >
          <l-tile-layer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          ></l-tile-layer>

          <l-marker :lat-lng="[userLat, userLong]" @moveend="getUserPos">
            <l-icon
              iconUrl="/apos-frontend/default/modules/content/icons/pin-user.svg"
              iconSize="[120, 120]"
            />
          </l-marker>

          <l-marker
            v-for="(lieu, lieuIndex) in lieux"
            :key="'lieu-' + lieuIndex"
            :lat-lng="[lieu.lat, lieu.long]"
          ></l-marker>

          <l-polyline :lat-lngs="visitPoints" color="#e6004c"></l-polyline>
        </l-map>
      </div>
    </div>

    <div class="t-domain__content">
      <!-- <div class="t-domain__image"></div> -->
      <template v-for="(step, stepIndex) in domain.visit" :key="stepIndex">
        <div class="t-step__container">
          <div class="t-step__item">
            <p class="t-step__name">
              <b>Etape {{ stepIndex + 1 }} :</b> {{ step.name }}
            </p>
            <span class="t-step__icon"></span>
          </div>
        </div>
        <div class="t-media__container">
          <div
            class="t-media__item"
            v-for="(substep, substepIndex) in step.substep"
            :key="substepIndex"
          >
            <p class="t-media__info">{{ substep.name }}</p>
            <span :class="{ 't-media__download': substep.downloadable }">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 112 112">
                <circle
                  cx="56"
                  cy="56"
                  r="48"
                  fill="none"
                  stroke="$color-purple"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="7.35"
                />
                <line
                  x1="56"
                  y1="24"
                  x2="56"
                  y2="88"
                  fill="none"
                  stroke="$color-purple"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="7.35"
                />
                <line
                  x1="56"
                  y1="88"
                  x2="74"
                  y2="64"
                  fill="none"
                  stroke="$color-purple"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="7.35"
                />
                <line
                  x1="56"
                  y1="88"
                  x2="38"
                  y2="64"
                  fill="none"
                  stroke="$color-purple"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="7.35"
                />
              </svg>
            </span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
