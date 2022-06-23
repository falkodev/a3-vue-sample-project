<template>
  <div class="t-modal" :class="{ 't-modal--open': props.modalOpen }">
    <div class="t-modal__container">
      <cross @click="$emit('closeModal')" />
      <h1 class="t-modal__title">{{ dataObj.title }}</h1>

      <!-- <div
        v-for="(subStep, subStepIndex) in dataObj._visits[0].steps[
          modalStepIndex
        ].subSteps[modalSubIndex]"
        :key="subStepIndex"
      > -->
      <img
        :src="
          dataObj._visits[0].steps[modalStepIndex].subSteps[modalSubIndex].image
            ?._urls.original
        "
        alt=""
      />

      <p>{{ modalStepIndex }}</p>
    </div>
  </div>
</template>

<script setup>
import cross from '@/components/icons/IconCross.vue'
import { ref, onBeforeMount } from 'vue'

let modalSubIndex = ref(1)

onBeforeMount(() => {
  console.log(
    props.dataObj,
    'hahahahahahahahahahahahahahahahahahahahahahahahahahahahah',
  )
})
const props = defineProps({
  dataObj: Object,
  modalOpen: Boolean,
  modalStepIndex: Number,
})

// const assetBaseUrl = window.apos.itinerary.assetBaseUrl
</script>
