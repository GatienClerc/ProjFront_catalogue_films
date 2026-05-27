<script setup>
import Card from "@/components/Card.vue";
import { useMovieStore } from '@/stores/movieStore'
import { onMounted } from 'vue'
const img = "https://media.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,00192f,00baff)/4drV6iluttgjZmU1Q0xDqjrBQ1.jpg"

const movieStore = useMovieStore()

onMounted(() => {
  movieStore.getMoviesInTheatre()
  movieStore.getTrendingMedias()
})
</script>

<template>
  <main>
    <!-- most popular film at the moment ? -->
    <img :src="img" class="img-fluid shadow" alt="BestMovie">
    <div class="px-5 py-3">
      <Card card_type="film"/>
      <p>{{movieStore.in_theater_loading}}</p>
      <p>{{movieStore.trending_loading}}</p>
    <!-- Trending carousel -->
    <!-- in theater carousel -->
    </div>
  </main>
</template>