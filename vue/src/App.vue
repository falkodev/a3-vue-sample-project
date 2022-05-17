<script>
// import {
//   LMap,
//   LIcon,
//   LTileLayer,
//   LMarker,
//   LControlLayers,
//   LTooltip,
//   LPopup,
//   LPolyline,
//   LPolygon,
//   LRectangle,
// } from '@vue-leaflet/vue-leaflet'
// import 'leaflet/dist/leaflet.css'

export default {
  components: {
    // LMap,
    // LIcon,
    // LTileLayer,
    // LMarker,
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
    console.log(this.domain)
  },
}
</script>

<template>
  <div class="t-domain">
    <div class="t-domain__fixed">
      <h2 class="t-domain__title">{{ domain.title }}</h2>
      <div
        class="t-domain__map"
        style="
          background-image: url('https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80');
        "
      >
        {{ domain.latitude }} , {{ domain.longitude }}
      </div>
    </div>

    <div class="t-domain__content">
      <div
        class="t-domain__image"
        :style="`
          background-image: url(${domainPicture})`"
      ></div>
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
