<script setup>
import { useRoute } from 'vue-router'
import Carousel from '@/components/Carousel.vue'
import { useMovieStore } from '@/stores/movieStore'
import { useHistoryStore } from '@/stores/historyStore.js'
import {ref, watch} from 'vue'
import TMDBService from '@/services/TMDBService.js'
import mock_default_flb from '@/assets/mock_default_flb.webp'

const route = useRoute()
const poster_image_path = 'https://image.tmdb.org/t/p/w500'

let isFavorite = ref(false)

const movieStore = useMovieStore()
const historyStore = useHistoryStore()

watch(
    () => [route.params.id, route.query.type, route.query.title],
    ([id, type, title]) => {
      movieStore.getAccountId()
      movieStore.getMediaById(id, type, title)
      movieStore.checkFavorite(type, id)
      historyStore.add({
        id: route.params.id,
        type: route.query.type,
        title: route.query.title
      })
    },
    { immediate: true }
)

function toggleFavorite() {
  movieStore.isFavorite = !movieStore.isFavorite
  TMDBService.manageFavorites(movieStore.accountId, route.query.type, route.params.id, movieStore.isFavorite)
}
  
function getImage(path, base, fallback) {
  if (!path || path === "null") return fallback
  return base + path
}
</script>

<template>
  <main class="container-fluid py-3 px-5" v-if="!movieStore.media_loading">
    <div class="row g-4 px-5">
      <!-- Poster -->
      <div class="col-12 col-md-4">
        <img
            :src="getImage(movieStore.media.poster_path, poster_image_path, mock_default_flb)" alt="Affiche du film" class="img-fluid rounded shadow w-100 poster"/>
      </div>
      <!-- Movie Info -->
      <div class="col-12 col-md-8">
        <div class="d-flex flex-wrap align-items-end mb-3">
          <h1 class="mb-0">{{movieStore.media.title || route.query.title}}</h1>
          <h2 class="ms-4 mb-0">{{movieStore.media.release_date || movieStore.media.air_date}}</h2>
        </div>
        <div class="genres">
          <h2 v-for="genre in movieStore.media.genres" :key="genre.id">
            {{ genre.name }}
          </h2>
        </div>
        <!-- Actions -->
        <div class="d-flex flex-wrap gap-2 my-3">
          <button
              class="rounded-circle border d-flex align-items-center justify-content-center"
              style="width:4rem;height:4rem;"
              @click="toggleFavorite()"
          >
            <i v-if="!movieStore.isFavorite" class="bi bi-heart fs-1"></i>
            <i v-else class="bi bi-heart-fill fs-1"></i>
          </button>
          <a v-if="movieStore.trailer_link" :href="movieStore.trailer_link"
              class="rounded-pill border d-flex align-items-center justify-content-center px-3"
          >
            <i class="bi bi-play-fill fs-1 me-2"></i>
            <h5 class="mb-0">Bande d'annonce</h5>
          </a>

        </div>

        <p>{{movieStore.media.tagline}}</p>

        <h3 v-if="movieStore.media.overview">Synopsis</h3>

        <p>
          {{movieStore.media.overview}}
        </p>

        <div class="row mt-4">
          <div v-if="movieStore.director">
            <p class="fw-bold mb-0">{{movieStore.director.name}}</p>
            <p>{{movieStore.director.job}}</p>
          </div>
        </div>
      </div>
    </div>
    <h1 class="m-5 mb-1" v-if="movieStore.actors.length > 0">Acteurs</h1>
    <Carousel v-if="movieStore.actors.length > 0" source="actors"></Carousel>
    <h1 class="m-5 mb-1" v-if="route.query.type==='tv' && movieStore.episodes.length > 0">Episodes</h1>
    <Carousel source="episodes" v-if="route.query.type==='tv' && movieStore.episodes.length > 0"></Carousel>
  </main>
</template>

<style scoped>
.poster {
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
}
button {
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text);
}
.genres {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  align-items: center;
}
</style>