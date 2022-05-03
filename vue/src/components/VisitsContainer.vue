<template>
  <div class="t-steps">
    <div class="t-steps__loaded t-loaded">
      <div class="t-loaded__title">Liste des visites</div>
      <div class="t-loaded__steps">
        <VisitItem
          v-for="step in itinetary.steps"
          :key="step._id"
          :step="step"
        />
      </div>
    </div>
  </div>
</template>

<script>
import VisitItem from './VisitItem.vue'
export default {
  data() {
    return {
      itinetary: null,
      id: null,
    }
  },
  name: 'VisitsContainer',
  props: {
    data: Object,
  },
  components: {
    VisitItem,
  },
  created() {
    this.itinetary = JSON.parse(this.data)
  },
}
</script>

<style scoped>
.t-steps {
  margin-top: 36px;
}

.t-loaded__title {
  color: #5357c1;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 17px;
}
</style>
