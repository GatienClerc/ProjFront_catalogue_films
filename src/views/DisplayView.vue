<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const image = 'https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg'
let favorite = false
</script>

<template>
  <main class="container py-3">
    <div class="row g-4">
      <!-- Poster -->
      <div class="col-12 col-md-4">
        <img
            :src="image" alt="Affiche du film" class="img-fluid rounded shadow w-100 poster"/>
      </div>
      <!-- Movie Info -->
      <div class="col-12 col-md-8">
        <div class="d-flex flex-wrap align-items-end mb-3">
          <h1 class="mb-0">Titre</h1>
          <h2 class="ms-2 mb-0">Date</h2>
        </div>
        <h2>Genre</h2>
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

        <h2>Sous-titre</h2>

        <h2>Synopsis</h2>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel porta
          lorem. Sed sapien risus, posuere ut nibh quis, dapibus finibus magna.
          In eu volutpat elit. Nullam mattis euismod semper. Etiam in velit
          auctor, lobortis mauris nec, aliquam tortor. Mauris eu lorem et lacus
          convallis sagittis. Nullam venenatis, nibh in dignissim sapien.
        </p>

        <div class="row mt-4">
          <div class="col-6 col-md-4">
            <p class="fw-bold mb-0">Nom</p>
            <p>Fonction</p>
          </div>

          <div class="col-6 col-md-4">
            <p class="fw-bold mb-0">Nom</p>
            <p>Fonction</p>
          </div>

          <div class="col-6 col-md-4">
            <p class="fw-bold mb-0">Nom</p>
            <p>Fonction</p>
          </div>
        </div>
      </div>
    </div>
    <h1>Acteurs</h1>
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
</style>