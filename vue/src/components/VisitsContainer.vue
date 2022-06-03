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
          :lat-lng="[marker._place[0].latitude, marker._place[0].longitude]"
        >
        </l-marker>
      </l-map>
    </div>
    <div v-if="itinerary.steps !== ''" class="t-steps__loaded t-loaded">
      <div class="t-loaded__title">{{ $t.visitList }}</div>
      <div class="t-loaded__steps">
        <VisitItem
          v-for="(step, index) in itinerary.steps"
          :id="index"
          :key="step"
          :status="true"
          :step="step"
          :translation="$t"
          @delItem="del"
        />
      </div>
    </div>
    <div v-if="delSteps != ''" class="t-steps__loaded t-loaded">
      <div class="t-loaded__title">{{ $t.add }}</div>
      <div class="t-loaded__steps">
        <VisitItem
          v-for="(step, index) in delSteps"
          :id="index"
          :key="step"
          :status="false"
          :step="step"
          :translation="$t"
          @addItem="add"
        />
      </div>
    </div>
  </div>
</template>

<script>
import VisitItem from './VisitItem.vue'
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'
import { icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default {
  data() {
    return {
      itinerary: JSON.parse(this.data),
      id: null,
      delSteps: [],
      zoom: 9,
      center: {},
      centerLoaded: false,
      $t: this.translationData,
      icon: icon({
        iconUrl:
          '/apos-frontend/default/modules/content/icons/orange-marker.png',
        iconSize: [20, 20],
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
    this.attributeId()
    this.updateCenter()
  },
}
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
