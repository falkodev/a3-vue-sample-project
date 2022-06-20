<template>
  <div class="">
    <div class="t-step__title">{{ $t.step }} {{ id + 1 }}</div>
    <div class="t-step">
      <div class="t-step__image-container">
        <img
          v-if="step.place.image"
          :src="
            '/uploads/attachments/' +
            step.place.image._id +
            '-' +
            step.place.image.name +
            '.' +
            step.place.image.extension
          "
          alt=""
          class="t-step__image"
        />
        <img
          v-else
          :src="assetBaseUrl + '/modules/content/images/default-domain.jpg'"
          class="t-step__image"
        />
      </div>

      <div class="t-step__infos t-infos">
        <div class="">
          <div class="t-infos__title">
            {{ step.place.title }}
            <img
              :src="placeTypeIcon(step.place.placeType)"
              alt="category heading"
              class="t-infos__place-type"
            />
          </div>
          <div
            v-if="step.place.description.items[0].content"
            class="t-infos__description"
          >
            {{ removeTags(step.place.description.items[0].content) }}
          </div>
        </div>
        <div v-if="isPay" class="t-infos__buttons">
          <GoIcon :lat="step.place.latitude" :lon="step.place.longitude" />
          <VisitIcon v-if="step.content.length" />
        </div>
      </div>
      <div class="t-step__indefinite">
        {{ $t.indefiniteDuration }}
      </div>
    </div>
    <div class="t-step__center">
      <div
        @click="seeProximityRef = !seeProximityRef"
        class="t-step__proximity"
      >
        {{ $t.seeNearDomains }}
      </div>
    </div>
    <div v-if="seeProximityRef && isPay" class="">
      <VisitItem
        v-for="(step, index) in step.nearDomains"
        :id="index"
        :key="step"
        :status="false"
        :step="step"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VisitItem from './ThemeStepItem.vue'
import VisitIcon from './VisitIcon.vue'
// import Content from './Content.vue'
import GoIcon from './GoIcon.vue'
defineProps({
  id: Number,
  step: Object,
  status: Boolean,
})
defineEmits(['addStep', 'removeStep'])

const $t = window.apos.itinerary.labels
const assetBaseUrl = window.apos.itinerary.assetBaseUrl
const isPay = true
const seeProximityRef = ref(false)
function placeTypeIcon(type) {
  const img = {
    wineStore: 'wine-bottle',
    wineBar: 'glass',
    poi: 'binoculars',
    domain: 'grap',
  }
  return `${assetBaseUrl}/modules/content/icons/${img[type]}.png`
}

function removeTags(str) {
  return str?.toString().replace(/(<([^>]+)>)/gi, '')
}
</script>

<style lang="scss" scoped>
@import '/assets/settings.scss';

.t-step {
  position: relative;
  margin: 25px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 8px;

  &__center {
    display: flex;
    justify-content: center;
  }

  &__title {
    color: $color-purple;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 17px;
  }

  &__image-container {
    height: 100px;
    display: flex;
    flex-direction: row;
    width: 30%;
    border-radius: 15px;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 15px;
  }

  &__infos {
    height: 100px;
    padding: 10px 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 70%;
    border-radius: 15px;
    border: 1px solid $color-purple;
    background-color: white;
    position: relative;

    &--domain {
      background-color: $color-purple-transparent;
      color: $color-purple !important;
    }
  }
  &__indefinite {
    font-size: 13px;
    color: $color-grey-50;
    position: absolute;
    bottom: -20px;
    right: 0;
  }

  &__proximity {
    display: inline-block;
    font-size: 12px;
    margin: auto;
    padding: 2px 6px;
    background: $color-purple;
    border-radius: 15px;
  }

  .t-infos {
    color: $color-purple;

    &__title {
      font-size: 14px;
      font-weight: bold;
      white-space: normal;
      overflow: hidden;
      display: flex;
      align-items: center;
    }

    &__type {
      display: flex;
      align-items: center;
      font-size: 13px;
    }

    &__visit {
      font-size: 12px;
    }

    &__description {
      display: flex;
      font-size: 10px;
    }

    &__place-type {
      width: 15px;
      margin-left: 5px;
    }

    &__buttons {
      margin-left: 5px;
    }
  }
}
</style>
