<template>
  <a :href="'https://www.google.com/maps/?q=' + lat + ',' + lon" class="t-col">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 112 112"
      class="t-go-icon"
    >
      <path
        d="M108,56a52,52,0,0,1-62,51V58H70.51l-6.75,6.76a6,6,0,1,0,8.48,8.48l17-17a6,6,0,0,0,0-8.48l-17-17a6,6,0,0,0-8.48,8.48L70.51,46H44A10,10,0,0,0,34,56v47.12A52,52,0,1,1,108,56Z"
      />
    </svg>
    {{ $t.goTo }}
  </a>
</template>

<script setup>
const $t = window.apos.itinerary.labels

defineProps({
  lat: Number,
  lon: Number,
})
</script>

<style lang="scss" scoped>
@import '/assets/settings.scss';

.t-col {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 25px;
  font-size: 8px;
}
.t-go-icon {
  color: $color-main;
  width: 20px;
}
</style>
