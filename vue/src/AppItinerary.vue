<script setup>
// Imports
import VisitsContainer from './components/VisitsContainer.vue'
import ValidateItinerary from './components/ValidateItinerary.vue'
import { ref } from 'vue'

// Data
const props = defineProps({
  piece: Object,
})
const data = JSON.parse(props.piece)
if (!window.apos.user) {
  location.assign('/login?redirect=itinerary/' + data.slug)
}
const translation = window.apos.itinerary.labels
// Impossible de commit ou push sans le mettre en commentaire ('apos' is not defined )
let descriptionRef = ref(false)

// Methods
function dataDescription() {
  if (descriptionRef.value) {
    return data.description
  } else {
    return data.description.substr(0, 150)
  }
}
function dataPrice(price) {
  if (price == 0) {
    return 'free'
  } else {
    return price + '€'
  }
}

function dataMileAge(mileage) {
  return mileage + 'km'
}

// Hooks
</script>

<template>
  <div class="t-app-itinerary">
    <div class="t-spacer"></div>
    <div class="t-app-itinerary__title">{{ data.title }}</div>
    <div class="t-app-itinerary__description">
      {{ dataDescription() }}..
      <span class="bold" @click="descriptionRef = !descriptionRef"
        >{{ translation.see }}
        <span class="bold" v-if="descriptionRef">{{ translation.less }}..</span>
        <span class="bold" v-else>{{ translation.more }}..</span>
      </span>
    </div>

    <div class="t-app-itinerary__infos t-infos">
      <div class="t-infos__title">{{ translation.globalInfos }}</div>
      <div class="t-infos__container">
        <div class="t-info-tier">
          <div class="t-info-tier__logo"></div>
          <div class="t-info-tier__value">
            {{ data.duration.replace('00', '').replace(':', 'h') }}
          </div>
        </div>
        <div class="t-info-tier">
          <div class="t-info-tier__logo"></div>
          <div class="t-info-tier__value">
            {{ dataPrice(data.price) }}
          </div>
        </div>
        <div class="t-info-tier">
          <div class="t-info-tier__logo"></div>
          <div class="t-info-tier__value">
            {{ dataMileAge(data.mileage) }}
          </div>
        </div>
      </div>
      <div class="t-infos__container">
        <div class="t-info-half">
          <div class="t-info-half__logo"></div>
          <div class="t-info-half__title">
            {{ data.steps[0]._place[0].title }}
          </div>
          <div class="t-info-half__value">
            {{
              data.steps[0]._place[0].address.substring(
                data.steps[0]._place[0].address.indexOf(',') + 1,
              )
            }}
          </div>
          <div class="t-info-half__value">
            {{
              data.steps[0]._place[0].address.slice(
                0,
                -data.steps[0]._place[0].address.substring(
                  data.steps[0]._place[0].address.indexOf(','),
                ).length,
              )
            }}
          </div>
        </div>
        <div class="t-info-half">
          <div class="t-info-half__logo"></div>
          <div class="t-info-half__title">
            {{ data.steps[data.steps.length - 1]._place[0].title }}
          </div>
          <div class="t-info-half__value">
            {{
              data.steps[data.steps.length - 1]._place[0].address.substring(
                data.steps[data.steps.length - 1]._place[0].address.indexOf(
                  ',',
                ) + 1,
              )
            }}
          </div>
          <div class="t-info-half__value">
            {{
              data.steps[data.steps.length - 1]._place[0].address.slice(
                0,
                -data.steps[data.steps.length - 1]._place[0].address.substring(
                  data.steps[data.steps.length - 1]._place[0].address.indexOf(
                    ',',
                  ),
                ).length,
              )
            }}
          </div>
        </div>
      </div>
    </div>
    <ValidateItinerary :translationData="translation" />
    <VisitsContainer :data="piece" :translationData="translation" />
  </div>
</template>

<style scoped lang="scss">
@import './assets/base.css';

.t-spacer {
  height: 20vh;
}

.bold {
  font-weight: bold;
  cursor: pointer;
}

.t-app-itinerary {
  padding: 32px;
  margin-top: 15vh;

  &__title {
    font-size: 25px;
    color: #5357c1;
    font-weight: bold;
  }

  &__description {
    margin-top: 36px;
    font-size: 15px;
    line-height: 25px;
  }
}

.t-infos {
  margin-top: 36px;
}

.t-infos {
  &__title {
    color: #ff8317;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 17px;
  }

  &__container {
    width: 100%;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }
}

.t-info {
  &-tier {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 10px;
    background-color: #ff831775;
    height: 100px;
    width: 32%;
    border-radius: 15px;

    &__value {
      color: white;
      font-size: 20px;
      font-weight: bold;
    }
  }

  &-half {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    background-color: #ff831775;
    height: 100px;
    width: 49%;
    border-radius: 15px;

    &__title {
      color: white;
      font-size: 13px;
      font-weight: bold;
    }

    &__value {
      color: white;
      font-size: 12px;
    }
  }
}
</style>
