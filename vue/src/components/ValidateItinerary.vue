<template>
  <div class="t-validate">{{ $t.validateItinerary }}</div>
</template>

<script>
export default {
  data() {
    return {
      $t: {},
    }
  },
  name: 'ValidateItinerary',
  props: {
    translationData: Object,
  },
  mounted() {
    this.$t = this.translationData
  },
}
</script>

<style scoped lang="scss">
@import '/assets/settings.scss';

.t-validate {
  z-index: 99;
  position: fixed;
  bottom: 9vh;
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
