<template>
  <div class="t-steps">
    <div class="t-steps__loaded t-loaded" v-if="itinetary.steps != ''">
      <div class="t-loaded__title">Liste des visites</div>
      <div class="t-loaded__steps">
        <VisitItem
          v-for="(step, index) in itinetary.steps"
          :key="step"
          :id="index"
          :step="step"
          :status="true"
          @delItem="del"
        />
      </div>
    </div>
    <div class="t-steps__loaded t-loaded" v-if="delSteps != ''">
      <div class="t-loaded__title">Ajouter</div>
      <div class="t-loaded__steps">
        <VisitItem
          v-for="(step, index) in delSteps"
          :key="step"
          :id="index"
          :step="step"
          :status="false"
          @addItem="add"
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
      delSteps: [],
    }
  },
  name: 'VisitsContainer',
  props: {
    data: Object,
  },
  methods: {
    del(delIndex) {
      let temp = this.itinetary.steps.splice(delIndex, 1)
      this.delSteps.push(temp[0])
    },
    add(addIndex) {
      let temp = this.delSteps.splice(addIndex, 1)
      this.itinetary.steps.push(temp[0])
    },
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
