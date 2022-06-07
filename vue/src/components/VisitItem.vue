<template>
  <div class="t-visit">
    <div class="t-visit__image-container">
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
        class="t-visit__image"
      />
      <img
        v-else
        :src="assetBaseUrl + '/modules/content/images/default-domain.jpg'"
        class="t-visit__image"
      />
    </div>

    <div
      :class="{
        't-visit__infos--domain': step.place.type === 'domain',
      }"
      class="t-visit__infos t-infos"
    >
      <div class="t-infos__title">{{ step.place.title }}</div>
      <div class="t-infos__description">
        <div class="t-infos__type">
          <img
            :src="placeTypeIcon(step.place.placeType)"
            alt="category heading"
            class="t-infos__place-type"
          />
          {{ $t[step.place.placeType] }}
        </div>
        <div v-if="step.place.isAutoGuidedVisit" class="t-infos__visit">
          ・ {{ $t.autoGuidedVisit }}
        </div>
      </div>
      <div class="t-infos__footer">
        <div class="">
          <div v-if="step.place.type === 'domain'" class="t-infos__status">
            {{ $t.takeAppointment }}
          </div>
        </div>
        <div class="t-infos__fav">
          <HeartIcon />
          <div class="">{{ $t.favorites }}</div>
        </div>
      </div>
    </div>
    <div class="t-visit__bin">
      <BinIcon v-if="status" @click="$emit('removeStep', id)" />
      <AddIcon v-else @click="$emit('addStep', id)" />
    </div>
  </div>
</template>

<script setup>
import HeartIcon from './HeartIcon.vue'
import BinIcon from './BinIcon.vue'
import AddIcon from './AddIcon.vue'

defineProps({
  id: Number,
  step: Object,
  status: Boolean,
})
defineEmits(['addStep', 'removeStep'])

const $t = window.apos.itinerary.labels
const assetBaseUrl = window.apos.itinerary.assetBaseUrl

function placeTypeIcon(type) {
  const img = {
    wineStore: 'wine-bottle',
    wineBar: 'glass',
    poi: 'binoculars',
    domain: 'grap',
  }
  return `${assetBaseUrl}/modules/content/icons/${img[type]}.png`
}
</script>

<style lang="scss">
@import '/assets/settings.scss';

.t-visit {
  margin: 16px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 8px;

  &__image-container {
    height: 100px;
    display: flex;
    flex-direction: row;
    width: 25%;
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
    flex-direction: column;
    width: 60%;
    border-radius: 15px;
    border: 1px solid $color-purple;
    background-color: white;
    position: relative;

    &--domain {
      background-color: $color-purple-transparent;
      color: $color-purple !important;
    }
  }

  &__description {
    display: flex;
    flex-direction: column;
    &__bin {
      width: 10%;
      fill: $color-purple;
      color: $color-purple;
    }
  }

  .t-infos {
    color: $color-purple;

    &__title {
      font-size: 14px;
      font-weight: bold;
      white-space: normal;
      overflow: hidden;
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
    }

    &__place-type {
      width: 15px;
      margin-right: 4px;
    }

    &__status {
      font-size: 10px;
      padding: 2px 4px;
      display: flex;
      border: 1px solid $color-purple;
      border-radius: 20px;
    }

    &__footer {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      justify-content: space-between;
    }

    &__fav {
      display: flex;
      flex-direction: column;
      font-size: 10px;
    }
  }
}
</style>
