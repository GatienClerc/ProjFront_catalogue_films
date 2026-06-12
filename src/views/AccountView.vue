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
  <main class="p-4">
    <div>
      <h2>Historique</h2>
      <carousel v-if="movieStore.history.length > 0" source="history" />
      <h3 v-else>Aucun historique trouvé</h3>
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
      <h3 v-if="movieStore.favoriteMovies.length === 0 && movieStore.favoriteShows.length === 0">Aucun favoris trouvé</h3>
    </div>
  </main>
</template>
