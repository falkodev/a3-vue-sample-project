<template>
  <div :href="buttonLink" class="t-validate">{{ $t[buttonText] }}</div>
</template>

<script setup>
const $t = window.apos.itinerary.labels

const props = defineProps({
  buttonText: Object,
  // buttonLink: Object,
})

console.log(props)
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
