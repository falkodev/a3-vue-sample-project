<template>
  <div class="t-modal" :class="{ 't-modal--open': props.modalOpen }">
    <div class="t-modal__container">
      <cross @click="$emit('close-modal', modalSubIndex)" />

      <h1 class="t-modal__title">
        <b>{{ dataObj.title }}</b>
      </h1>

      <template
        v-for="(item, itemIndex) in dataObj._visits[0].steps[modalStepIndex]
          .subSteps[modalSubIndex].contents[0].presentation.items[0]"
        :key="itemIndex"
      >
        <div class="t-modal__video" v-if="item.video">
          <iframe
            frameborder="0"
            allow="autoplay; fullscreen"
            allowfullscreen
            :src="video.url"
          ></iframe>
        </div>

        <div
          v-if="item._image"
          class="t-modal__content"
          :style="`background-image: url(${_image[0].attachment._urls.max})`"
        ></div>
      </template>

      <iframe
        margin-top="40px"
        src="https://anchor.fm/mas-de-la-sranne/embed/episodes/Anglais-Transition-3-Mas-de-la-Sranne-e1kd130"
        height="102px"
        width="400px"
        frameborder="0"
        scrolling="no"
      ></iframe>

      <div class="t-modal__contentTitle">
        <b>
          {{
            dataObj._visits[0].steps[modalStepIndex].subSteps[modalSubIndex]
              .contents[0].title
          }}
        </b>
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

      <div class="t-modal__video">
        <iframe
          frameborder="0"
          allow="autoplay; fullscreen"
          allowfullscreen
          :src="
            dataObj._visits[0].steps[modalStepIndex].subSteps[modalSubIndex]
              .contents[0].interview.items[0].video.url
          "
        ></iframe>
      </div>

      <!-- <div
        class="t-modal__Content"
        :style="`background-image: url(${dataObj._visits[0].steps[modalStepIndex].subSteps[modalSubIndex].contents[0].interview.items[0]._image[0].attachment._urls.max})`"
      ></div> -->

      <!-- <div class="t-modal__button">
        <div @click="modalSubIndex++" class="t-modal__button--content">
          Suivant
        </div>
        <div @click="modalSubIndex--" class="t-modal__button--content">
          Précedent
        </div>
      </div> -->
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
})
const props = defineProps({
  dataObj: Object,
  modalOpen: Boolean,
  modalStepIndex: Number,
  modalSubIndex: Number,
})

// const assetBaseUrl = window.apos.itinerary.assetBaseUrl
</script>

<style lang="scss">
@import '/assets/settings.scss';
.t-modal__title {
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 42px;
  padding-top: 55px;
}
.t-modal__content {
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
  font-weight: bold;
  &--resume {
    margin-left: 33px;
    display: flex;
    justify-content: left;
    width: 100%;
    color: $color-grey-70;
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
  width: 100%;
  margin-top: 40px;
  margin-bottom: 40px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  &--content {
    background-color: $color-orange;
    width: 81px;
    height: 25px;
    border-radius: 13px;
    color: $color-white;
    align-items: center;
    justify-content: center;
    display: flex;
    cursor: pointer;
  }
}
.t-modal__video {
  position: relative;
  overflow: hidden;
  padding-top: 100%;
  width: 100%;
  margin-top: 40px;
}

.t-modal__video iframe {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
</style>
