<script setup>
import { useRoute } from 'vue-router'
import Carousel from '@/components/Carousel.vue'
import { useMovieStore } from '@/stores/movieStore'
import { onMounted } from 'vue'

const route = useRoute()
const poster_image_path = 'https://image.tmdb.org/t/p/w500'
let favorite = false

const movieStore = useMovieStore()

onMounted(() => {
  movieStore.getMediaById(route.params.id)
})
</script>

<template>
  <main class="container py-3" v-if="!movieStore.media_loading">
    <div class="row g-4">
      <!-- Poster -->
      <div class="col-12 col-md-4">
        <img
            :src="poster_image_path+movieStore.media.poster_path" alt="Affiche du film" class="img-fluid rounded shadow w-100 poster"/>
      </div>
      <!-- Movie Info -->
      <div class="col-12 col-md-8">
        <div class="d-flex flex-wrap align-items-end mb-3">
          <h1 class="mb-0">{{movieStore.media.title}}</h1>
          <h2 class="ms-4 mb-0">{{movieStore.media.release_date}}</h2>
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
          >
            <i v-if="favorite === false" class="bi bi-heart fs-1"></i>
            <i v-else class="bi bi-heart-fill fs-1"></i>
          </button>
          <button
              class="rounded-pill border d-flex align-items-center justify-content-center px-3"
          >
            <i class="bi bi-play-fill fs-1 me-2"></i>
            <h5 class="mb-0">Bande d'annonce</h5>
          </button>

        </div>

        <p>{{movieStore.media.tagline}}</p>

        <h3>Synopsis</h3>

        <p>
          {{movieStore.media.overview}}
        </p>

        <div class="row mt-4">
          <div>
            <p class="fw-bold mb-0">{{movieStore.credit.crew[0].name}}</p>
            <p>{{movieStore.credit.crew[0].job}}</p>
          </div>
        </div>
      </div>
    </div>
    <h1>Acteurs</h1>
    <Carousel source=""></Carousel>
    <h1>Episodes</h1>
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