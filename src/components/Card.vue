<script setup>
  //TODO need to use API
  import { computed } from 'vue'
  import { useMovieStore } from '@/stores/movieStore'

  const props = defineProps({
    movie: Object
    //movieId: Number
  })
</script>

<template>
  <div v-if="movie" class="card shadow" style="width: 13rem;">
    <img class="card-img-top" :src="movie.img" :alt="afflass">
      <div class="card-body p-1">
        <p class="m-0 fs-4">{{ movie.title }}</p>
        <p class="m-0">{{ movie.info }}</p>
      </div>
  </div>
</template>

<style scoped>

</style>