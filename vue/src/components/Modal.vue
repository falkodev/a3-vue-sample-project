<template>
  <div class="t-modal" :class="{ 't-modal--open': props.modalOpen }">
    <div class="t-modal__container">
      <cross @click="$emit('closeModal')" />
      <h1 class="t-modal__title">Modal Window</h1>
    </div>
  </div>
</template>

<script setup>
import cross from '@/components/icons/IconCross.vue'
const props = defineProps({
  dataObj: Object,
  modalOpen: Boolean,
  modalStepIndex: Number,
})
</script>
