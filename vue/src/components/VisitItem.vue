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
        't-visit__infos--domain': this.data.stepType == 'domain',
      }"
    >
      <div class="t-infos__title">{{ this.data.title }}</div>
      <div class="t-infos__description">
        <div class="t-infos__type">
          <img
            class="t-infos__place-type"
            :src="placeTypeIcon(this.data.placeType)"
            alt="category heading"
          />
          {{ $t[this.step._place[0].placeType] }}
        </div>
        <div class="t-infos__visit">・ {{ $t.selfGuidedTour }}</div>
      </div>
      <div class="t-infos__footer">
        <div class="">
          <div v-if="this.data.stepType == 'domain'" class="t-infos__status">
            {{ $t.takeAppointment }}
          </div>
        </div>
        <div class="t-infos__fav">
          <HeartIcon />
          <div class="">{{ $t.favorite }}</div>
        </div>
      </div>
    </div>
    <div class="t-visit__bin">
      <BinIcon v-if="status" @click="$emit('delItem', id)" />
      <AddIcon v-else @click="$emit('addItem', id)" />
    </div>
  </div>
</template>

<script>
import HeartIcon from './HeartIcon.vue'
import BinIcon from './BinIcon.vue'
import AddIcon from './AddIcon.vue'

export default {
  name: 'VisitItem',
  data() {
    return {
      data: {},
      $t: this.translation,
    }
  },
  methods: {
    placeTypeIcon(type) {
      if (type == 'wineStore') {
        return '/apos-frontend/default/modules/content/icons/wine-bottle.png'
      } else if (type == 'wineBar') {
        return '/apos-frontend/default/modules/content/icons/glass.png'
      } else if (type == 'poi') {
        return '/apos-frontend/default/modules/content/icons/binoculars.png'
      } else {
        return '/apos-frontend/default/modules/content/icons/grap.png'
      }
    },
  },
  props: {
    step: Object,
    id: Number,
    status: Boolean,
    translation: Object,
  },
  mounted() {
    if (this.step.stepType === 'place') {
      this.data = this.step._place[0]
    } else {
      this.data = this.step._domain[0]
    }
  },
  emits: ['delItem'],
  components: {
    HeartIcon,
    BinIcon,
    AddIcon,
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
