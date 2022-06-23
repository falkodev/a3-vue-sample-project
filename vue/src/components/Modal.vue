<template>
  <div class="t-modal" :class="{ 't-modal--open': props.modalOpen }">
    <div class="t-modal__container">
      <cross @click="$emit('closeModal')" />
      <h1 class="t-modal__title">{{ dataObj.title }}</h1>

      <img
        class="imageContent"
        :src="
          dataObj._visits[0].steps[modalStepIndex].subSteps[modalSubIndex].image
            ?._urls.original
        "
        alt=""
      />

      <p>
        {{
          dataObj._visits[0].steps[modalStepIndex].subSteps[modalSubIndex]
            .contents[0].title
        }}
      </p>

      <div
        v-for="(item, index) in dataObj._visits[0].steps[modalStepIndex]
          .subSteps[modalSubIndex].contents[0].content.items"
        :key="index"
      >
        <p v-if="item.content">
          {{ item.content }}
        </p>

        <div v-for="(image, imageIndex) in item._image" :key="imageIndex">
          <img class="imageContent" :src="image.attachment._urls.original" />
        </div>
      </div>

      <!-- <p>{{ modalContentIndex.title }}</p> -->
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

<style lang="scss">
.imageContent {
  width: 25%;
}
</style>
