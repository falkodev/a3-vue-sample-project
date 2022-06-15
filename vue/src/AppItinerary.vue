<template>
  <div class="t-app-itinerary">
    <div class="t-app-itinerary__spacer"></div>
    <div class="t-image__container">
      <img
        v-if="data.image"
        :src="
          '/uploads/attachments/' +
          data.image._id +
          '-' +
          data.image.name +
          '.' +
          data.image.extension
        "
        alt=""
        class="t-image"
      />
    </div>
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
            :src="assetBaseUrl + '/modules/content/icons/time.png'"
            class="t-info-tier__logo"
          />
          <div class="t-info-tier__value">
            {{ itineraryDuration }}
          </div>
        </div>
        <div v-if="data.steps.length" class="t-info-tier">
          <img
            :src="assetBaseUrl + '/modules/content/icons/event.png'"
            class="t-info-tier__logo"
          />
          <div class="t-info-tier__value">
            {{ dataPrice(data.price) }}
          </div>
        </div>
        <div v-else class="t-info-tier">
          <img
            :src="assetBaseUrl + '/modules/content/icons/event.png'"
            class="t-info-tier__logo"
          />
          <div class="t-info-tier__value">
            {{ data._visits[0].createdAt }}
          </div>
        </div>
        <div class="t-info-tier">
          <img
            :src="assetBaseUrl + '/modules/content/icons/destination.png'"
            class="t-info-tier__logo"
          />
          <div class="t-info-tier__value">
            {{ dataMileAge(data.mileage) }}
          </div>
        </div>
      </div>
      <div class="t-general-infos__container">
        <div
          v-if="data._visits[0]"
          class="t-info-half"
          style="width: 32%; height: 100px"
        >
          <div class="t-info-half__logo-container">
            <img
              :src="assetBaseUrl + '/modules/content/icons/white-marker.png'"
              class="t-info-half__logo t-info-half__logo--left"
            />
          </div>

          <div class="t-info-half__title">
            {{
              data.steps.length
                ? data.steps[0].place.title
                : data._visits[0].steps[0].subSteps[0].title
            }}
          </div>
          <div v-if="data.steps.length">
            <div
              v-for="addressPart in splitAddress(removeTags(startStep))"
              :key="addressPart"
              class="t-info-half__value"
            >
              {{ addressPart }}
            </div>
          </div>
        </div>
        <div v-else-if="data.steps.length" class="t-info-half">
          <div class="t-info-half__logo-container">
            <img
              :src="assetBaseUrl + '/modules/content/icons/white-marker.png'"
              class="t-info-half__logo t-info-half__logo--right"
            />
          </div>

          <div class="t-info-half__title">
            {{
              data.steps.length
                ? data.steps[data.steps.length - 1].place.title
                : data._visits[0].steps[data._visits[0].steps.length - 1]
                    .subSteps[
                    data._visits[0].steps[data._visits[0].steps.length - 1]
                      .subSteps.length - 1
                  ].title
            }}
          </div>

          <div v-if="data.steps.length">
            <div
              v-for="addressPart in splitAddress(removeTags(lastStep))"
              :key="addressPart"
              class="t-info-half__value"
            >
              {{ addressPart }}
            </div>
          </div>
        </div>

        <div
          v-if="data._visits[0]"
          class="t-info-half"
          style="width: 32%; height: 100px"
        >
          <div class="t-info-half__logo-container">
            <img
              :src="assetBaseUrl + '/modules/content/icons/white-marker.png'"
              class="t-info-half__logo t-info-half__logo--right"
            />
          </div>

          <div class="t-info-half__title">
            {{
              data.steps.length
                ? data.steps[data.steps.length - 1].place.title
                : data._visits[0].steps[data._visits[0].steps.length - 1]
                    .subSteps[
                    data._visits[0].steps[data._visits[0].steps.length - 1]
                      .subSteps.length - 1
                  ].title
            }}
          </div>

          <div v-if="data.steps.length">
            <div
              v-for="addressPart in splitAddress(removeTags(lastStep))"
              :key="addressPart"
              class="t-info-half__value"
            >
              {{ addressPart }}
            </div>
          </div>
        </div>

        <div v-else-if="data.steps.lenght" class="t-info-half">
          <div class="t-info-half__logo-container">
            <img
              :src="assetBaseUrl + '/modules/content/icons/white-marker.png'"
              class="t-info-half__logo t-info-half__logo--right"
            />
          </div>

          <div class="t-info-half__title">
            {{
              data.steps.length
                ? data.steps[data.steps.length - 1].place.title
                : data._visits[0].steps[data._visits[0].steps.length - 1]
                    .subSteps[
                    data._visits[0].steps[data._visits[0].steps.length - 1]
                      .subSteps.length - 1
                  ].title
            }}
          </div>

          <div v-if="data.steps.length">
            <div
              v-for="addressPart in splitAddress(removeTags(lastStep))"
              :key="addressPart"
              class="t-info-half__value"
            >
              {{ addressPart }}
            </div>
          </div>
        </div>

        <div
          v-if="data._visits[0]"
          class="t-info-half"
          style="width: 32%; height: 100px"
        >
          <img
            :src="assetBaseUrl + '/modules/content/icons/event.png'"
            class="t-info-tier__logo"
          />
          <div class="t-info-half__value">
            {{ dataPrice(data.price) }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <ValidateButton :buttonText="'validateItinerary'" :buttonLink="'link'" />
  <EventContainer />
  <!-- <VisitsContainer :piece="data" @updateItinerary="updateItinerary" /> -->
</template>

<script setup>
import EventContainer from './components/EventContainer.vue'
// import VisitsContainer from './components/VisitsContainer.vue'
import ValidateButton from './components/ValidateButton.vue'
import { computed, ref, onMounted } from 'vue'
import dayjs from 'dayjs'

const props = defineProps({
  piece: Object,
})
const data = JSON.parse(props.piece)
if (!window.apos.user) {
  location.assign('/login?redirect=itinerary/' + data.slug)
}
// onMounted(() => {
//   if (data._visits[0]) {
//     document.querySelectorAll('.t-info-half').style.height = '100px'
//     document.querySelectorAll('.t-info-half').style.width = '32%'
//   }
// })

const $t = window.apos.itinerary.labels
const assetBaseUrl = window.apos.itinerary.assetBaseUrl
let descriptionRef = ref(false)

function updateItinerary(itinerary) {
  data.steps = itinerary.steps
  refStartStep.value = data.steps[0]
  refLastStep.value = data.steps[data.steps.length - 1]
  refItineraryDuration.value = data.steps
}
const refStartStep = ref(data.steps[0])
const startStep = computed(
  () => refStartStep?.value?.place?.addressN?.items[0]?.content,
)

const refLastStep = ref(data.steps[data.steps.length - 1])
const lastStep = computed(
  () => refLastStep?.value?.place?.address?.items[0]?.content,
)

const refItineraryDuration = ref(data.steps)
const itineraryDuration = computed(() =>
  refItineraryDuration.value.length && Array.isArray(refItineraryDuration.value)
    ? calculateItineraryDuration(refItineraryDuration.value)
    : data.duration,
)

function calculateItineraryDuration(steps) {
  let hours = 0
  let minutes = 0
  steps.forEach((step) => {
    hours = hours + dayjs(`2000-01-01 ${step.duration}`).$H
    minutes = minutes + dayjs(`2000-01-01 ${step.duration}`).$M
  })
  let duration = `${hours}:${minutes}`
  return duration
}

function dataDescription() {
  return descriptionRef.value
    ? data.description
    : data.description.substr(0, 150)
}

function dataPrice(price) {
  return price ? price + '€' : $t.free
}

function removeTags(str) {
  return str?.toString().replace(/(<([^>]+)>)/gi, '')
}

function splitAddress(str) {
  return (str || '').split(',')
}

function dataMileAge(mileage) {
  return mileage + 'km'
}
</script>

<style lang="scss">
@import './assets/base.css';
@import '/assets/settings.scss';

.bold {
  font-weight: bold;
  cursor: pointer;
}

.t-image {
  height: 180px;
  width: 100%;
  object-fit: cover;

  &__container {
    top: 0;
    left: 0;
    right: 0;
    position: absolute;
    margin-bottom: 20px;
    height: 200px;
    width: 100vw;
  }
}

.t-app-itinerary {
  position: relative;
  padding: 10vw;
  margin: 15vh 0;

  &__spacer {
    height: 20vh;
  }

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
