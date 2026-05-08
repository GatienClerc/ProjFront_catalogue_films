<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, watch } from 'vue'
import { useMovieStore } from '@/stores/movieStore'
import SearchResults from '@/components/Search.vue'

const movieStore = useMovieStore()
const search = ref('')

watch(search, (newValue) => {
  movieStore.searchMovies(newValue)
})
</script>

<template>
  <header class="py-2 shadow position-relative z-3">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 text h5">
          <RouterLink to="/" class="p-1"><li>Accueil</li></RouterLink>
          <RouterLink to="/about" class="p-1"><li>Film/Série</li></RouterLink>
        </ul>

        <form class="col-11 col-lg-auto mb-3 mb-lg-0 me-lg-3 flex-grow-1 mx-3" style="max-width: 350px;">
          <div class="input-group">
            <span class="input-group-text">
              <i class="bi bi-search fs-5"></i>
            </span>

            <input v-model="search" type="search" class="form-control" placeholder="Search..."/>
          </div>
        </form>

        <div class="text-end">
          <RouterLink to="/profil" class="bi bi-person fs-2" />
        </div>
      </div>
    </div>
  </header>
  <SearchResults />
  <RouterView />
</template>