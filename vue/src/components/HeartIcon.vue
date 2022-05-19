<template>
  <div class="t-heart-container">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="t-heart"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
        clip-rule="evenodd"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'HeartIcon',
}
</script>

<style>
t-heart-container {
  padding: 5px;
  border-radius: 100%;
  background-color: #5357c1;
}

t-heart {
  color: transparent;
  fill: transparent;
  height: 10px;
  width: 10px;
}
</style>
