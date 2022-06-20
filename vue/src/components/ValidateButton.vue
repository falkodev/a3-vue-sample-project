<template>
  <a :href="buttonLink" class="t-validate">{{ $t[buttonText] }}</a>
</template>

<script setup>
const $t = window.apos.itinerary.labels

defineProps({
  buttonText: Object,
  buttonLink: String,
})
</script>

<style lang="scss">
@import '/assets/settings.scss';

.t-validate {
  z-index: 99;
  position: fixed;
  bottom: 80px;
  left: 0;
  right: 0;
  background: $color-orange;
  color: $color-white;
  text-align: center;
  padding: 20px;
  font-weight: bold;
  font-size: 15px;
}
</style>
