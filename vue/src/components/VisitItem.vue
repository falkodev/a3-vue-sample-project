<template>
  <div class="t-visit">
    <div class="t-visit__image">
      <img
        :src="`@/assets/${this.step._place[0].image.name}.${this.step._place[0].image.extension}`"
        alt=""
      />
    </div>

    <div
      class="t-visit__infos t-infos"
      :class="{
        't-visit__infos-domain': this.step._place[0].placeType == 'domain',
      }"
    >
      <div class="t-infos__title">{{ this.step._place[0].title }}</div>
      <div class="t-infos__description">
        <div class="t-infos__type">
          <img src="" alt="" />
          {{ this.step._place[0].placeType }}
        </div>
        <div class="t-infos__visit">・ {{ trad.SelfGuidedTour }}</div>
      </div>
      <div class="t-infos__footer">
        <div class="">
          <div class="t-infos__status">{{ trad.takeAppointment }}</div>
        </div>
        <div class="t-infos__fav">
          <div class="t-infos__heart-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="t-infos__heart"
              viewBox="0 0 20 20"
              fill="currendColor"
            >
              <path
                fill-rule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="">Favoris</div>
        </div>
      </div>
    </div>
    <div class="t-visit__bin">
      <svg
        v-if="status"
        @click="$emit('delItem', id)"
        xmlns="http://www.w3.org/2000/svg"
        class="t-bin-icon"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
      <svg
        v-else
        @click="$emit('addItem', id)"
        class="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VisitItem',
  props: {
    step: Object,
    id: Number,
    status: Boolean,
    trad: Object,
  },
  emits: ['delItem'],
}
</script>

<style scoped>
.t-visit {
  margin: 16px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
}

.t-visit__image {
  display: flex;
  flex-direction: row;
  width: 20%;
  border-radius: 15px;
}
.t-visit__infos {
  padding: 10px 16px;
  display: flex;
  flex-direction: column;
  width: 70%;
  border-radius: 15px;
  border: 1px solid #5357c145;
  background-color: white;
}
.t-visit__infos-domain {
  padding: 10px 16px;
  display: flex;
  flex-direction: column;
  width: 70%;
  border-radius: 15px;
  border: 1px solid #5357c145;
  background-color: #5357c145;
}

.t-visit__description {
  display: flex;
  flex-direction: column;
}

.t-visit__bin {
  width: 10%;
  fill: #5357c1;
  color: #5357c1;
}

.t-infos {
  color: #5357c1;
}
.t-infos__title {
  font-weight: bold;
}

.t-infos__type {
  font-size: 15px;
}

.t-infos__visit {
  font-size: 12px;
}

.t-infos__status {
  font-size: 10px;
  padding: 2px 4px;
  display: flex;
  border: 1px solid #5357c1;
  border-radius: 20px;
}

.t-infos__footer {
  margin-top: 7px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  position: relative;
}

.t-infos__fav {
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 10px;
}

.t-infos__heart-container {
  padding: 5px;
  border-radius: 100%;
  background-color: #5357c1;
}

.t-infos__heart {
  color: transparent;
  fill: transparent;
  height: 10px;
}
</style>
