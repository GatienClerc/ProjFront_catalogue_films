<script setup>
import Carousel from "@/components/Carousel.vue";
import { useMovieStore } from "@/stores/movieStore.js";
import { onMounted } from "vue";
const TMDBToken = import.meta.env.VITE_TMDB_TOKEN

const movieStore = useMovieStore()

onMounted(() => {
  movieStore.getHistory()
})
</script>

<template>
  <main>
    <div>
      <h2>Historique</h2>
      <carousel source="history"></carousel>
    </div>
    <div v-show="TMDBToken">
      <h2>Favoris</h2>

    </div>
  </main>
</template>
