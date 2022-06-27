<template>
  <div class="t-col" @click="contentRef = true">
    <svg
      class="t-visit-icon"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clip-rule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
        fill-rule="evenodd"
      ></path>
    </svg>
    {{ $t.visit }}
  </div>
  <Content
    :title="title"
    :piece="data"
    v-if="contentRef"
    @leaveModal="leaveModal"
  />
</template>

<script setup>
import Content from './ContentModal.vue'
import { ref } from 'vue'
const contentRef = ref(false)
const $t = window.apos.itinerary.labels
defineProps({
  data: Object,
  title: String,
})
function leaveModal() {
  contentRef.value = false
}
</script>

<style lang="scss" scoped>
@import '../assets/settings.scss';

.t-col {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 25px;
  font-size: 8px;
}

.t-visit-icon {
  color: $color-main;
  width: 20px;
}
</style>
