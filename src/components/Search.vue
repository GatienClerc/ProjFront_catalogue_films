<script setup>
import { useMovieStore } from '@/stores/movieStore'
const movieStore = useMovieStore()
</script>

<template>
  <div v-if="movieStore.movies.length > 0" class="position-absolute start-0 w-100 bg-white shadow z-2 search">
    <div class="container">
      <ul class="list-group list-group-flush">
        <li v-for="film in movieStore.movies" :key="film.id" class="list-group-item list-group-item-action">
          {{ film.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.search {
  background-color: var(--color-background-soft);

  top: 70px;
  overflow: auto;
  width: auto;
  max-height: 35vh;

  z-index: 1000;
}
</style>