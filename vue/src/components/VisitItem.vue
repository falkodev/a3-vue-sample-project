<template>
  <div class="t-visit">
    <div class="t-visit__image-container">
      <img
        v-if="this.data.image"
        alt=""
        class="t-visit__image"
        :src="
          '/uploads/attachments/' +
          this.data.image._id +
          '-' +
          this.data.image.name +
          '.' +
          this.data.image.extension
        "
      />
      <img
        v-else
        class="t-visit__image"
        :src="'/apos-frontend/default/modules/content/images/default-domain.jpg'"
      />
    </div>

    <div
      class="t-visit__infos t-infos"
      :class="{
        't-visit__infos--domain': this.data.placeType == 'domain',
      }"
    >
      <div class="t-infos__title">{{ this.data.title }}</div>
      <div class="t-infos__description">
        <div class="t-infos__type">
          <img
            v-if="this.data.placeType == 'wineStore'"
            class="t-infos__place-type"
            :src="'/apos-frontend/default/modules/content/icons/wine-bottle.png'"
            alt="category heading"
          />
          <img
            v-if="this.data.placeType == 'wineBar'"
            class="t-infos__place-type"
            :src="'/apos-frontend/default/modules/content/icons/glass.png'"
            alt="category heading"
          />
          <img
            v-if="this.data.placeType == 'poi'"
            class="t-infos__place-type"
            :src="'/apos-frontend/default/modules/content/icons/binoculars.png'"
            alt="category heading"
          />
          <img
            v-if="this.data.placeType == 'domain'"
            class="t-infos__place-type"
            :src="'/apos-frontend/default/modules/content/icons/grap.png'"
            alt="category heading"
          />
          {{ this.translation[this.step._place[0].placeType] }}
        </div>
        <div class="t-infos__visit">
          ・ {{ this.translation.selfGuidedTour }}
        </div>
      </div>
      <div class="t-infos__footer">
        <div class="">
          <div v-if="this.data.placeType == 'domain'" class="t-infos__status">
            {{ this.translation.takeAppointment }}
          </div>
        </div>
        <div class="t-infos__fav">
          <HeartIcon />
          <div class="">{{ this.translation.favorite }}</div>
        </div>
      </div>
    </div>
    <div class="t-visit__bin">
      <svg
        v-if="status"
        @click="$emit('delItem', id)"
        xmlns="http://www.w3.org/2000/svg"
        class="t-bin-icon"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
      <svg
        v-else
        @click="$emit('addItem', id)"
        class="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script>
import HeartIcon from './HeartIcon.vue'
export default {
  name: 'VisitItem',
  data() {
    return {
      data: {},
    }
  },
  props: {
    step: Object,
    id: Number,
    status: Boolean,
    translation: Object,
  },
  mounted() {
    this.data = this.step._place[0]
  },
  emits: ['delItem'],
  components: {
    HeartIcon,
  },
}
</script>

<style scoped lang="scss">
@import '/assets/settings.scss';

.t-visit {
  margin: 16px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;

  &__image-container {
    border: 1px solid $color-purple-light;
    margin-right: 8px;
    height: 90px;
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
    height: 90px;
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
  }

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
  }

  &__type {
    display: flex;
    align-items: center;
    font-size: 13px;
  }

  &__visit {
    font-size: 12px;
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
    margin-top: 7px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }

  &__fav {
    position: absolute;
    right: 8px;
    bottom: 3px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 10px;
  }
}
</style>
