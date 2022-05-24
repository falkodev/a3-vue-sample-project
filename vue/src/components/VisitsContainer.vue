<template>
  <div class="t-steps">
    <div class="t-app-itinerary__map" v-if="centerLoaded">
      <l-map v-model="zoom" :zoom="zoom" :center="[center.lat, center.lon]">
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ></l-tile-layer>

        <l-marker
          v-for="marker in itinerary.steps"
          :key="marker"
          :lat-lng="[marker._place[0].latitude, marker._place[0].longitude]"
          :icon="icon"
        >
        </l-marker>
      </l-map>
    </div>
    <div class="t-steps__loaded t-loaded" v-if="itinerary.steps != ''">
      <div class="t-loaded__title">{{ $t.visitList }}</div>
      <div class="t-loaded__steps">
        <VisitItem
          v-for="(step, index) in itinerary.steps"
          :key="step"
          :id="index"
          :step="step"
          :status="true"
          :translation="$t"
          @delItem="del"
        />
      </div>
    </div>
    <div class="t-steps__loaded t-loaded" v-if="delSteps != ''">
      <div class="t-loaded__title">{{ $t.add }}</div>
      <div class="t-loaded__steps">
        <VisitItem
          v-for="(step, index) in delSteps"
          :key="step"
          :id="index"
          :step="step"
          :status="false"
          :translation="$t"
          @addItem="add"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '/assets/settings.scss';

.t-steps {
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

.t-loaded__title {
  color: $color-purple;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 17px;
}
</style>

<script>
import VisitItem from './VisitItem.vue'
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'
import { icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
export default {
  data() {
    return {
      itinerary: [],
      id: null,
      delSteps: [],
      zoom: 9,
      center: {},
      centerLoaded: false,
      $t: {},
      icon: icon({
        iconUrl:
          '/apos-frontend/default/modules/content/icons/orangeMarker.png',
        iconSize: [32, 37],
        iconAnchor: [16, 37],
      }),
    }
  },
  name: 'VisitsContainer',
  props: {
    data: Object,
    translationData: Object,
  },
  methods: {
    del(delIndex) {
      let temp = this.itinerary.steps.splice(delIndex, 1)
      this.delSteps.push(temp[0])
      this.updateCenter()
    },
    add(addIndex) {
      let temp = this.delSteps.splice(addIndex, 1)
      this.itinerary.steps.push(temp[0])
      this.itinerary.steps.sort((a, b) => a.order - b.order)
      this.updateCenter()
    },
    log(a) {
      console.log(a)
    },
    attributeId() {
      for (let index = 0; index < this.itinerary.steps.length; index++) {
        this.itinerary.steps[index].order = index
      }
    },
    updateCenter() {
      let tempCenter = {
        left: this.itinerary.steps[0]._place[0].latitude,
        right: this.itinerary.steps[0]._place[0].latitude,
        top: this.itinerary.steps[0]._place[0].longitude,
        bottom: this.itinerary.steps[0]._place[0].longitude,
      }
      for (let i = 0; i < this.itinerary.steps.length; i++) {
        if (this.itinerary.steps[i]._place[0].latitude < tempCenter.left) {
          tempCenter.left = this.itinerary.steps[i]._place[0].latitude
        }
        if (this.itinerary.steps[i]._place[0].latitude > tempCenter.right) {
          tempCenter.right = this.itinerary.steps[i]._place[0].latitude
        }
        if (this.itinerary.steps[i]._place[0].longitude < tempCenter.top) {
          tempCenter.top = this.itinerary.steps[i]._place[0].longitude
        }
        if (this.itinerary.steps[i]._place[0].longitude > tempCenter.bottom) {
          tempCenter.bottom = this.itinerary.steps[i]._place[0].longitude
        }
      }
      this.center = {
        lat: (tempCenter.left + tempCenter.right) / 2,
        lon: (tempCenter.top + tempCenter.bottom) / 2,
      }
      this.centerLoaded = true
    },
  },
  components: {
    VisitItem,
    LMap,
    LTileLayer,
    LMarker,
  },
  mounted() {
    this.$t = this.translationData
    this.itinerary = JSON.parse(this.data)
    this.attributeId()
    this.updateCenter()
  },
}
</script>
