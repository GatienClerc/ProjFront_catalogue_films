<script setup>
import Card from "@/components/Card.vue";
import { useMovieStore } from '@/stores/movieStore'
import { onMounted } from 'vue'

const movieStore = useMovieStore()

onMounted(() => {
  movieStore.getMoviesInTheatre()
  movieStore.getTrendingMedias()
})
</script>

<template>
  <main>
    <!-- most popular film at the moment ? -->
    <img :src="movieStore.trending_banner" class="img-fluid shadow" alt="BestMovie" v-if="!movieStore.trending_loading">
    <div class="px-5 py-3">
    <div v-if="!movieStore.trending_loading">
      <h2>Populaire</h2>
    </div>
    <div v-if="!movieStore.in_theater_loading">
      <h2>Maintenant au cinéma</h2>
    </div>
    </div>
  </main>
</template>