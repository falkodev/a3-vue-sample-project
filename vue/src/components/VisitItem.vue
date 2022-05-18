<template>
  <div class="t-visit">
    <div class="t-visit__image">
      <img alt="" />
    </div>

    <div
      class="t-visit__infos t-infos"
      :class="{
        't-visit__infos--domain': this.step._place[0].placeType == 'domain',
      }"
    >
      <div class="t-infos__title">{{ this.step._place[0].title }}</div>
      <div class="t-infos__description">
        <div class="t-infos__type">
          <!-- <img
            v-if="this.step._place[0].placeType == 'wineStore'"
            src="/modules/asset/icons/wine-bottle.png"
            alt="category heading"
          />
          <img
            v-if="this.step._place[0].placeType == 'wineBar'"
            src="/modules/asset/icons/glass.png"
            alt="category heading"
          />
          <img
            v-if="this.step._place[0].placeType == 'poi'"
            src="/modules/asset/icons/binoculars.png"
            alt="category heading"
          />
          <img
            v-else
            src="{{
            apos.asset.url('/modules/asset/icons/grap.png')
          }}"
            alt="category heading"
          /> -->
          {{ this.step._place[0].placeType }}
        </div>
        <div class="t-infos__visit">
          ・ {{ this.translation.selfGuidedTour }}
        </div>
      </div>
      <div class="t-infos__footer">
        <div class="">
          <div
            v-if="this.step._place[0].placeType == 'domain'"
            class="t-infos__status"
          >
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
  props: {
    step: Object,
    id: Number,
    status: Boolean,
    translation: Object,
  },
  emits: ['delItem'],
  components: {
    HeartIcon,
  },
}
</script>

<style scoped lang="scss">
.t-visit {
  margin: 16px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;

  &__image {
    display: flex;
    flex-direction: row;
    width: 20%;
    border-radius: 15px;
  }

  &__infos {
    padding: 10px 16px;
    display: flex;
    flex-direction: column;
    width: 70%;
    border-radius: 15px;
    border: 1px solid #5357c145;
    background-color: white;

    &--domain {
      padding: 10px 16px;
      display: flex;
      flex-direction: column;
      width: 70%;
      border-radius: 15px;
      border: 1px solid #5357c145;
      background-color: #5357c145;
    }
  }

  &__description {
    display: flex;
    flex-direction: column;
  }

  &__bin {
    width: 10%;
    fill: #5357c1;
    color: #5357c1;
  }
}
.t-infos {
  color: #5357c1;

  &__title {
    font-weight: bold;
  }

  &__type {
    font-size: 15px;
  }

  &__visit {
    font-size: 12px;
  }

  &__status {
    font-size: 10px;
    padding: 2px 4px;
    display: flex;
    border: 1px solid #5357c1;
    border-radius: 20px;
  }

  &__footer {
    margin-top: 7px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    position: relative;
  }

  &__fav {
    position: absolute;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 10px;
  }
}
</style>
