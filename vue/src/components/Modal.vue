<template>
  <div class="t-modal" :class="{ 't-modal--open': modalOpen }">
    <div class="t-modal__container">
      <cross @click="$emit('close-modal', 0, 0)" />

      <h1 class="t-modal__title">
        <b>{{ dataObj.title }}</b>
      </h1>

      <template
        v-for="(item, itemIndex) in dataObj._visits[0].steps[modalStepIndex]
          .subSteps[modalSubIndex]?.contents[0]?.presentation.items"
      >
        <div class="t-modal__video" v-if="item.video" :key="itemIndex">
          <iframe
            frameborder="0"
            allow="autoplay; fullscreen"
            allowfullscreen
            :src="item.video.url"
          ></iframe>
        </div>

        <template v-if="item._image">
          <div
            class="t-modal__content"
            v-for="(image, imageIndex) in item._image"
            :key="imageIndex"
            :style="`background-image: url(${image.attachment._urls.max})`"
          ></div>
        </template>
      </template>

      <template
        v-for="(item, itemIndex) in dataObj._visits[0].steps[modalStepIndex]
          .subSteps[modalSubIndex].contents"
      >
        <template v-if="item.urlPodcast">
          <div class="t-modal__podcast" :key="itemIndex">
            <iframe
              margin-top="40px"
              :src="item.urlPodcast"
              frameborder="0"
              scrolling="no"
            ></iframe>
          </div>
        </template>
      </template>

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
      >
        <p
          class="t-modal__contentTitle--resume"
          v-if="item.content"
          v-html="item.content"
          :key="itemIndex"
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

      <template
        v-for="(item, itemIndex) in dataObj._visits[0].steps[modalStepIndex]
          .subSteps[modalSubIndex].contents[0].interview.items"
      >
        <div class="t-modal__video" v-if="item.video" :key="itemIndex">
          <iframe
            frameborder="0"
            allow="autoplay; fullscreen"
            allowfullscreen
            :src="item.video.url"
          ></iframe>
        </div>

        <template v-if="item._image">
          <div
            v-for="(image, imageIndex) in item._image"
            :key="imageIndex"
            class="t-modal__image"
            :style="`background-image: url(${image.attachment._urls.max})`"
          ></div>
        </template>
      </template>

      <div class="t-modal__button">
        <div @click="$emit('dec-sub-index')" class="t-modal__button--content">
          Précédent
        </div>
        <div @click="$emit('inc-sub-index')" class="t-modal__button--content">
          Suivant
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import cross from '@/components/icons/IconCross.vue'

defineProps({
  dataObj: Object,
  modalOpen: Boolean,
  modalStepIndex: Number,
  modalSubIndex: Number,
})
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
  padding-left: 33px;
  margin-top: 40px;
  margin-bottom: 30px;
  display: flex;
  justify-content: left;
  width: 100%;
  font-weight: bold;
  &--resume {
    padding-left: 33px;
    padding-right: 33px;
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
  margin-bottom: calc($footer-height + 30px);

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

.t-modal__podcast {
  position: relative;
  overflow: hidden;
  padding-top: 150px;
  width: 100%;
  margin-top: 40px;
}

.t-modal__podcast iframe {
  position: absolute;
  width: 100%;
  height: auto;
  top: 0;
  left: 0;
  right: 0;
}
</style>
