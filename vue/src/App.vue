<script>
import {
  LMap,
  LTileLayer,
  LMarker,
  // LIcon,
  // LControlLayers,
  // LTooltip,
  // LPopup,
  // LPolyline,
  // LPolygon,
  // LRectangle,
} from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    // LIcon,
    // LControlLayers,
    // LTooltip,
    // LPopup,
    // LPolyline,
    // LPolygon,
    // LRectangle,
  },
  props: ['piece', 'pieceImage'],
  data() {
    return {
      zoom: 7,
    }
  },
  computed: {
    domain() {
      return JSON.parse(this.piece)
    },
    domainPicture() {
      return JSON.parse(this.pieceImage)
    },
  },
  mounted() {
    console.log('this.domain ===>', this.domain, 'LMap ===>', LMap)
  },
}
</script>

<template>
  <div class="t-domain">
    <div class="t-domain__fixed">
      <h2 class="t-domain__title">{{ domain.title }}</h2>
      <div class="t-domain__map t-map__container">
        <!-- {{ domain.latitude }} , {{ domain.longitude }} -->
        <l-map
          dragging="false"
          v-model="zoom"
          :zoom="zoom"
          :center="[domain.latitude, domain.longitude]"
        >
          <l-tile-layer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          ></l-tile-layer>
          <l-marker :lat-lng="[domain.latitude, domain.longitude]"> </l-marker>
        </l-map>
      </div>
    </div>

    <div class="t-domain__content">
      <div class="t-domain__image"></div>
      <div class="t-etape__container">
        <div
          class="t-etape__item"
          v-for="(etape, etapeIndex) in domain.visit"
          :key="`etape-${etapeIndex}`"
        >
          <p class="t-etape__name">
            <b>Etape {{ etapeIndex + 1 }} :</b> {{ etape.name }}
          </p>
          <span class="t-etape__icon"></span>
        </div>
      </div>
    </div>
  </div>
</template>
