<script setup>
import { useRoute } from 'vue-router'
const route = useRoute() // route.params.id
const image = 'https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg'
let favorite = false
</script>

<template>
  <main class="px-5 py-3 d-flex">
    <img class="shadow col-2 rounded" :src="image" alt="'affiche du film">
    <div class="col-10 p-5">
      <div class="d-flex align-items-end">
        <h1>Titre</h1>
        <h2 class="mx-2">Date</h2>
      </div>
      <h2>Genre</h2>
      <!-- percent circle -->
      <div class="d-flex">
        <div class="rounded-circle border d-flex align-items-center justify-content-center" style="width:4rem; height:4rem;">
          <i v-if="favorite===false" class="bi bi-heart fs-1"></i>
          <i v-else class="bi bi-heart-fill fs-1"></i>
        </div>
        <div class="rounded-pill border d-flex align-items-center justify-content-center mx-2" style="width:19rem;">
          <i class="bi bi-play-fill fs-1"></i>
          <h2>Bande d'anonce</h2>
        </div>
      </div>
      <h2>sous-titre</h2>
      <h2>synopsis</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel porta  lorem. Sed sapien risus, posuere ut nibh quis, dapibus finibus magna. In eu volutpat elit. Nullam mattis euismod semper. Etiam in velit auctor,  lobortis mauris nec, aliquam tortor. Mauris eu lorem et lacus convallis  sagittis. Nullam venenatis, nibh in dignissim sapien</p>
      <p>nom</p>
      <p>fonction</p>
    </div>
  </main>
</template>

<style scoped>
.transform-rotate {
  transform: rotate(-90deg); /* Starts the fill from the top */
}
</style>