<script setup>
import VisitsContainer from './components/VisitsContainer.vue'
import ValidateItinerary from './components/ValidateItinerary.vue'
import { ref } from 'vue'

const props = defineProps({
  piece: Object,
})
const data = JSON.parse(props.piece)

if (!window.apos.user) {
  location.assign('/login?redirect=itinerary/' + data.slug)
}
const $t = window.apos.itinerary.labels
let descriptionRef = ref(false)

function defineStepType(step, prop) {
  if (step.stepType === 'place') {
    return step._place[0][prop]
  } else {
    return step._domain[0][prop]
  }
}

function dataDescription() {
  if (descriptionRef.value) {
    return data.description
  } else {
    return data.description.substr(0, 150)
  }
}

function dataPrice(price) {
  return price ? price + '€' : $t.free
}

function removeTags(str) {
  if (str === null || str === '') return false
  else str = str.toString()
  return str.replace(/(<([^>]+)>)/gi, '')
}

function dataMileAge(mileage) {
  return mileage + 'km'
}
</script>

<template>
  <div class="t-app-itinerary">
    <div class="t-spacer"></div>
    <div class="t-app-itinerary__title">{{ data.title }}</div>
    <div class="t-app-itinerary__description">
      {{ dataDescription() }}..
      <span class="bold" @click="descriptionRef = !descriptionRef"
        >{{ $t.see }}
        <span v-if="descriptionRef" class="bold">{{ $t.less }}..</span>
        <span v-else class="bold">{{ $t.more }}..</span>
      </span>
    </div>

    <div class="t-app-itinerary__infos t-general-infos">
      <div class="t-general-infos__title">{{ $t.globalInfos }}</div>
      <div class="t-general-infos__container">
        <div class="t-info-tier">
          <img
            :src="'/apos-frontend/default/modules/content/icons/time.png'"
            class="t-info-tier__logo"
          />
          <div class="t-info-tier__value">
            {{ data.duration.replace('00', '').replace(':', 'h') }}
          </div>
        </div>
        <div class="t-info-tier">
          <img
            :src="'/apos-frontend/default/modules/content/icons/event.png'"
            class="t-info-tier__logo"
          />
          <div class="t-info-tier__value">
            {{ dataPrice(data.price) }}
          </div>
        </div>
        <div class="t-info-tier">
          <img
            :src="'/apos-frontend/default/modules/content/icons/destination.png'"
            class="t-info-tier__logo"
          />
          <div class="t-info-tier__value">
            {{ dataMileAge(data.mileage) }}
          </div>
        </div>
      </div>
      <div class="t-general-infos__container">
        <div class="t-info-half">
          <div class="t-info-half__logo-container">
            <img
              :src="'/apos-frontend/default/modules/content/icons/white-marker.png'"
              class="t-info-half__logo t-info-half__logo--left"
            />
          </div>

          <div class="t-info-half__title">
            {{ defineStepType(data.steps[0], 'title') }}
          </div>
          <div class="t-info-half__value">
            {{
              removeTags(
                data.steps[0]._place[0].address.items[0].content.substring(
                  data.steps[0]._place[0].address.items[0].content.indexOf(
                    ',',
                  ) + 1,
                ),
              )
            }}
          </div>
          <div class="t-info-half__value">
            {{
              removeTags(
                data.steps[0]._place[0].address.items[0].content.slice(
                  0,
                  -data.steps[0]._place[0].address.items[0].content.substring(
                    data.steps[0]._place[0].address.items[0].content.indexOf(
                      ',',
                    ),
                  ).length,
                ),
              )
            }}
          </div>
        </div>
        <div class="t-info-half">
          <div class="t-info-half__logo-container">
            <img
              :src="'/apos-frontend/default/modules/content/icons/white-marker.png'"
              class="t-info-half__logo t-info-half__logo--right"
            />
          </div>

          <div class="t-info-half__title">
            {{ data.steps[data.steps.length - 1]._place[0].title }}
          </div>
          <div class="t-info-half__value">
            {{
              removeTags(
                data.steps[
                  data.steps.length - 1
                ]._place[0].address.items[0].content.substring(
                  data.steps[
                    data.steps.length - 1
                  ]._place[0].address.items[0].content.indexOf(',') + 1,
                ),
              )
            }}
          </div>
          <div class="t-info-half__value">
            {{
              removeTags(
                data.steps[
                  data.steps.length - 1
                ]._place[0].address.items[0].content.slice(
                  0,
                  -data.steps[
                    data.steps.length - 1
                  ]._place[0].address.items[0].content.substring(
                    data.steps[
                      data.steps.length - 1
                    ]._place[0].address.items[0].content.indexOf(','),
                  ).length,
                ),
              )
            }}
          </div>
        </div>
      </div>
    </div>
    <ValidateItinerary :translationData="$t" />
    <VisitsContainer :data="piece" :translationData="$t" />
  </div>
</template>

<style lang="scss">
@import './assets/base.css';
@import '/assets/settings.scss';

.t-spacer {
  height: 20vh;
}

.bold {
  font-weight: bold;
  cursor: pointer;
}

.t-app-itinerary {
  padding: 32px;
  margin: 15vh 0 15vh 0;

  &__title {
    font-size: 25px;
    color: $color-purple;
    font-weight: bold;
  }

  &__description {
    margin-top: 36px;
    font-size: 15px;
    line-height: 25px;
  }
}

.t-general-infos {
  margin-top: 36px;
}

.t-general-infos {
  &__title {
    color: $color-orange;
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
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 10px;
    background-color: $color-orange;
    opacity: 75%;
    height: 100px;
    width: 32%;
    border-radius: 15px;

    &__logo {
      position: absolute;
      opacity: 100%;
      top: 5px;
      left: 5px;
      width: 25px;
    }

    &__value {
      color: $color-white;
      font-size: 20px;
      font-weight: bold;
    }
  }

  &-half {
    position: relative;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 10px 10px 10px;
    background-color: $color-orange;
    opacity: 75%;
    height: 120px;
    width: 49%;
    border-radius: 15px;

    &__title {
      color: $color-white;
      font-size: 13px;
      font-weight: bold;
    }

    &__logo-container {
      position: absolute;
      top: 5px;
      right: 5px;
      left: 5px;
      border-bottom: 3px dashed $color-white;
    }

    &__logo {
      width: 25px;

      &--left {
        float: left;
      }

      &--right {
        float: right;
      }
    }

    &__value {
      color: $color-white;
      font-size: 12px;
    }
  }
}
</style>
