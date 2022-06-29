<template>
  <div class="t-content">
    <div class="t-content__spacer"></div>

    <div class="t-content__itinerary">
      {{ title }}
    </div>

    <div
      v-if="props.piece.content[0].presentation.items[0]"
      class="t-content__image-container"
    >
      <img
        :src="
          props.piece.content[0].presentation.items[0]._image[0].attachment
            ._urls.max
        "
        alt=""
        class="t-content__image"
      />
    </div>

    <div class="t-content__title">
      {{ props.piece.content[0].title }}
    </div>

    <div class="t-content__items">
      <div
        class="t-content__text"
        v-for="item in props.piece.content[0].content.items"
        :key="item"
      >
        <div v-if="item.type === '@apostrophecms/rich-text'">
          {{ removeTags(item.content) }}
        </div>
        <div class="t-content__image-container" v-else>
          <img
            :src="item._image[0].attachment._urls.max"
            alt=""
            class="t-content__image"
          />
        </div>
      </div>
    </div>

    <div class="t-content__exit" @click="$emit('leaveModal')">
      {{ $t.exit }}
    </div>
  </div>
</template>

<script setup>
const $t = window.apos.itinerary.labels
const props = defineProps({
  piece: Object,
  title: String,
})
function removeTags(str) {
  return str?.toString().replace(/(<([^>]+)>)/gi, '')
}
defineEmits(['leaveModal'])
</script>

<style scoped lang="scss">
@import '/assets/settings.scss';

.t-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 100;
  background: white;
  position: fixed;
  overflow-y: auto;
  height: 100vh;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  &__spacer {
    height: 15vh;
    @media (min-width: map-get($breakpoints, 'md')) {
      min-height: 15vh;
    }
  }
  &__itinerary {
    color: $color-main;
    font-size: 1.5rem;
    font-weight: bold;
  }

  &__title {
    color: $color-main;
    font-size: 1rem;
    font-weight: bold;
  }

  &__image-container {
    height: 250px;
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__text {
    color: $color-black;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  &__exit {
    color: $color-main;
    border: 1px solid $color-main;
    padding: 1px 5px 1px 5px;
    border-radius: 12px;
    margin-bottom: 30px;
  }
}
</style>
