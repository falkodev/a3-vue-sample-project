<template>
  <div class="t-modal" :class="{ 't-modal--open': props.modalOpen }">
    <div class="t-modal__container">
      <cross @click="$emit('closeModal')" />
      <h1 class="t-modal__title">{{ dataObj.title }}</h1>

      <div
        v-for="(subStep, subStepIndex) in dataObj._visits[0].steps[
          modalStepIndex
        ].subSteps[subStepIndex]"
        :key="subStepIndex"
      >
        {{ subStep._id }}
        {{ subStep.title }}
        {{ subStep._urls }}
        <!-- <img
          v-if="subStep"
          :src="
            '/uploads/attachments/' +
            subStep.image._id +
            '-' +
            subStep.image.title +
            '.' +
            subStep.image.extension
          "
          alt=""
          class="t-image__container"
        /> -->
      </div>

      <!-- <image  -->
      <p>{{ modalStepIndex }}</p>
    </div>
  </div>
</template>

<script setup>
import cross from '@/components/icons/IconCross.vue'
import { onMounted } from '@vue/runtime-core'

onMounted(() => {
  console.log(
    props.dataObj,
    'hahahahahahahahahahahahahahahahahahahahahahahahahahahahah',
  )

  console.log(
    props.dataObj._visits[0].steps[props.modalStepIndex].subSteps[0].image,
    'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
  )
})
const props = defineProps({
  dataObj: Object,
  modalOpen: Boolean,
  modalStepIndex: Number,
})

// const assetBaseUrl = window.apos.itinerary.assetBaseUrl
</script>
