<template>
  <svg
    class="t-add-icon"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      clip-rule="evenodd"
      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
      fill-rule="evenodd"
    ></path>
  </svg>
</template>

<script>
export default {
  name: 'AddIcon',
}
</script>

<style lang="scss" scoped>
@import '../assets/settings.scss';

.t-add-icon {
  color: $color-main;
  width: 30px;
  width: 30px;
}
</style>
