<template>
  <div class="t-modal" :class="{ 't-modal--open': modalOpen }">
    <div class="t-modal__container">
      <cross @click="$emit('closeModal')" />
      <h1 class="t-modal__title">Modal Window</h1>
      <p>{{ modalStepIndex }}</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import cross from '@/components/icons/IconCross.vue'
const props = defineProps({
  dataObj: Object,
  modalOpen: Boolean,
  modalStepIndex: Number,
})
onMounted(() => {
  console.log(props.modalStepIndex, props.dataObj)
})
</script>
