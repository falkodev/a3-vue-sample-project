<script>
import { computed } from 'vue'
import { onMounted } from 'vue'

export default {
  props: {
    piece: Object,
    pieceImage: Object,
  },
  setup(props) {
    // 1.fullName depends on firstName,lastName.
    // 2.computed takes a getter function and returns an immutable reactive ref object
    // for the returned value from the getter.
    const domain = computed(() => {
      return JSON.parse(props.piece)
    })
    const domainPicture = computed(() => {
      return JSON.parse(props.pieceImage)
    })
    onMounted(() => {
      console.log('mounted hook // domain = \r \n', domain.value)
      console.log('mounted hook // domainPicture = \r \n', domainPicture.value)
    })
    return {
      domain,
      domainPicture,
    }
  },
}
</script>

<template>
  <div class="t-domain">
    <div class="t-domain__fixed">
      <h2 class="t-domain__title">{{ domain.title }}</h2>
      <div
        class="t-domain__map"
        style="
          background-image: url('https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80');
        "
      ></div>
    </div>

    <div class="t-domain__content">
      <div
        class="t-domain__image"
        :style="`
          background-image: url(${domainPicture})`"
      ></div>
      <div class="t-etape__container">
        <div
          class="t-etape__item"
          v-for="(etape, etapeIndex) in domain.visit"
          :key="`etape-${etapeIndex}`"
        >
          <p class="t-etape__name">
            <b>Etape {{ etapeIndex + 1 }} :</b> {{ etape.name }}
          </p>
          <span class="t-etape__icon"></span>
        </div>
      </div>
    </div>
  </div>
</template>
