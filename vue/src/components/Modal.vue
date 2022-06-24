<template>
  <div class="t-modal" :class="{ 't-modal--open': props.modalOpen }">
    <div class="t-modal__container">
      <cross @click="$emit('close-modal', modalSubIndex)" />

      <h1 class="t-modal__title">
        <b>{{ dataObj.title }}</b>
      </h1>

      <!-- <video width="400" height="350" controls>
        {{
          dataObj._visits[0].steps[modalStepIndex].subSteps[modalSubIndex]
            .contents[0].presentation.items[0].video.url
        }}
      </video> -->

      <iframe
        class="t-modal__video"
        frameborder="0"
        allow="autoplay; fullscreen"
        allowfullscreen
        :src="
          dataObj._visits[0].steps[modalStepIndex].subSteps[modalSubIndex]
            .contents[0].presentation.items[0].video.url
        "
      ></iframe>

      <!-- <div
        class="t-modal__Content"
        :style="`background-image: url(${dataObj._visits[0].steps[modalStepIndex].subSteps[modalSubIndex].contents[0].presentation.items[0]._image[0].attachment._urls.max})`"
      ></div> -->

      <div class="t-modal__contentTitle">
        <p>
          {{
            dataObj._visits[0].steps[modalStepIndex].subSteps[modalSubIndex]
              .contents[0].title
          }}
        </p>
      </div>
      <template
        v-for="(item, itemIndex) in dataObj._visits[0].steps[modalStepIndex]
          .subSteps[modalSubIndex].contents[0].content.items"
        :key="itemIndex"
      >
        <p
          class="t-modal__contentTitle--resume"
          v-if="item.content"
          v-html="item.content"
        ></p>

        <template v-if="item._image">
          <div
            class="t-modal__image"
            v-for="(image, imageIndex) in item._image"
            :key="imageIndex"
            :style="`background-image: url(${image.attachment._urls.original})`"
          ></div>
        </template>
      </template>
      <button @click="modalSubIndex++" class="t-modal__button">suivant</button>
      <button @click="modalSubIndex--" class="t-modal__button">
        précedent
      </button>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount } from 'vue'
import cross from '@/components/icons/IconCross.vue'

onBeforeMount(() => {
  console.log(
    props.dataObj,
    'hahahahahahahahahahahahahahahahahahahahahahahahahahahahah',
  )

  // console.log(
  //   props.dataObj._visits[0].steps[props.modalStepIndex].subSteps[
  //     props.modalSubIndex
  //   ].contents[0].presentation.items[0].video.url,
  //   'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
  // )
})
const props = defineProps({
  dataObj: Object,
  modalOpen: Boolean,
  modalStepIndex: Number,
  // modalSubIndex: Number,
})

// const assetBaseUrl = window.apos.itinerary.assetBaseUrl
</script>

<style lang="scss">
.t-modal__video {
  width: 100%;
}
.t-modal__title {
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 42px;
  padding-top: 55px;
}
.t-modal__Content {
  width: 100%;
  height: 240px;
  background-size: cover;
  background-position: center;
}

.t-modal__contentTitle {
  font-size: 20px;
  margin-left: 33px;
  margin-top: 72px;
  margin-bottom: 30px;
  display: flex;
  justify-content: left;
  width: 100%;

  &--resume {
    display: flex;
    justify-content: left;
    width: 100%;
    margin-left: 33px;
  }
}

.t-modal__image {
  margin-top: 40px;
  margin-bottom: 40px;
  background-size: cover;
  height: 240px;
  width: 60vw;
  background-position: center;
}

.t-modal__button {
  margin-top: 40px;
  margin-bottom: 40px;
  background-color: orangered;
}
</style>
