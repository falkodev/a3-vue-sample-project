<script setup>
// Imports
import VisitsContainer from './components/VisitsContainer.vue'
import { ref } from 'vue'
console.log('ready!')

// Data
const props = defineProps({
  piece: Object,
})
const data = JSON.parse(props.piece)
let description = ref(false)

function dataDescription() {
  if (description.value === true) {
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

// Map

// Hooks
</script>

<template>
  <div class="t-app-itinenary">
    <div class="t-app-itinetary__map" id="map"></div>
    <div class="t-app-itinetary__title">{{ data.title }}</div>
    <div class="t-app-itinetary__description">
      {{ dataDescription() }}..
      <span class="bold" @click="description = !description"
        >Afficher <span class="bold" v-if="description">moins..</span>
        <span class="bold" v-else>plus..</span>
      </span>
    </div>

    <div class="t-app-itinetary__infos t-infos">
      <div class="t-infos__title">INFOS GENÉRALES</div>
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
        <div class="t-info-demi">
          <div class="t-info-demi__logo"></div>
          <div class="t-info-demi__title">
            {{ data.steps[0]._place[0].title }}
          </div>
          <div class="t-info-demi__value">
            {{
              data.steps[0]._place[0].address.substring(
                data.steps[0]._place[0].address.indexOf(',') + 1,
              )
            }}
          </div>
          <div class="t-info-demi__value">
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
        <div class="t-info-demi">
          <div class="t-info-demi__logo"></div>
          <div class="t-info-demi__title">
            {{ data.steps[data.steps.length - 1]._place[0].title }}
          </div>
          <div class="t-info-demi__value">
            {{
              data.steps[data.steps.length - 1]._place[0].address.substring(
                data.steps[data.steps.length - 1]._place[0].address.indexOf(
                  ',',
                ) + 1,
              )
            }}
          </div>
          <div class="t-info-demi__value">
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

    <VisitsContainer :data="piece" />
  </div>
</template>

<style scoped>
@import './assets/base.css';

.bold {
  font-weight: bold;
}

.t-app-itinenary {
  padding: 32px;
  margin-top: 15vh;
}

.t-app-itinetary__map {
  height: 20vh;
}

.t-app-itinetary__title {
  font-size: 25px;
  color: #5357c1;
  font-weight: bold;
}

.t-app-itinetary__description {
  margin-top: 36px;
  font-size: 15px;
  line-height: 25px;
}

.t-infos {
  margin-top: 36px;
}

.t-infos__title {
  color: #ff8317;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 17px;
}

.t-infos__container {
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

.t-info-tier {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: #ff831775;
  height: 100px;
  width: 32%;
  border-radius: 15px;
}

.t-info-demi {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: #ff831775;
  height: 100px;
  width: 49%;
  border-radius: 15px;
}

.t-info-tier__value {
  color: white;
  font-size: 20px;
  font-weight: bold;
}

.t-info-demi__title {
  color: white;
  font-size: 13px;
  font-weight: bold;
}

.t-info-demi__value {
  color: white;
  font-size: 12px;
}
</style>
