<script setup>
  import { computed } from 'vue'
  import { useMovieStore } from '@/stores/movieStore'

  const props = defineProps({
    data: Object
    //movieId: Number
  })
</script>

<template>
  <div v-if="data" class="card shadow mx-2 flex-shrink-0" style="width: 15rem;">
    <img class="card-img-top" :src="data.img" :alt="data.title">
      <div class="card-body p-1">
        <p class="m-0 fs-5">{{ data.title }}</p>
        <p class="m-0">{{ data.info }}</p>
      </div>
  </div>
</template>

<style scoped>

</style>