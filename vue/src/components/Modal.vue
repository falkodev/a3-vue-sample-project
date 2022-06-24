<template>
  <div class="t-modal" :class="{ 't-modal--open': modalOpen }">
    <div class="t-modal__container">
      <h1 class="t-modal__title">{{ dataObj.title }}</h1>

      <img
        class="t-imageContent"
        :src="
          dataObj._visits[0].steps[modalStepIndex].subSteps[modalSubIndex]
            .contents[0].presentation.items[0]._image[0].attachment._urls.max
        "
        alt=""
      />

      <div class="t-titleContent">
        <p>
          {{
            dataObj._visits[0].steps[modalStepIndex].subSteps[modalSubIndex]
              .contents[0].title
          }}
        </p>
      </div>
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

      <button>suivant</button>
    </div>
  </div>
</template>

<script setup>
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
.t-imageContent {
  width: 100%;
  height: 240px;
}

.t-titleContent {
  font-size: 20px;
  margin-left: 33px;
  margin-top: 72px;
  margin-bottom: 30px;
  display: flex;
  justify-content: left;
  width: 100%;
}
</style>
