<script setup>
import Carousel from "@/components/Carousel.vue";
import { useMovieStore } from "@/stores/movieStore.js";
import { watch } from "vue";
const TMDBToken = import.meta.env.VITE_TMDB_TOKEN

const movieStore = useMovieStore()

watch(
    () => {},
    () => {
      movieStore.getAccountId()
      movieStore.getHistory()
      movieStore.getFavorites()
    },
    { immediate: true }
)
</script>

<template>
  <main>
    <div>
      <h2>Historique</h2>
      <carousel v-if="movieStore.history.length > 0" source="history" />
    </div>
    <div v-show="TMDBToken">
      <h2>Favoris</h2>
      <div v-if="movieStore.favoriteMovies.length > 0">
        <h3>Films</h3>
        <carousel source="favoriteMovies" />
      </div>
      <div v-if="movieStore.favoriteShows.length > 0">
        <h3>Séries</h3>
        <carousel source="favoriteShows" />
      </div>
    </div>
  </main>
</template>
