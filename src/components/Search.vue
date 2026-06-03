<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useMovieStore } from '@/stores/movieStore'

const movieStore = useMovieStore()

// état pour afficher/masquer les résultats
const isOpen = ref(true)

// référence du bloc
const searchRef = ref(null)

// détecter clic extérieur
const handleClickOutside = (event) => {
  if (searchRef.value && !searchRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

// lifecycle
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

// rouvrir quand nouveaux résultats
watch(() => movieStore.search_movies, (newVal) => {
  if (newVal.length > 0) {
    isOpen.value = true
  }
})
</script>

<template>
  <div
      v-if="movieStore.search_movies.length > 0 && isOpen"
      ref="searchRef"
      class="position-absolute start-0 w-100 shadow z-2 search"
  >
    <div class="container">
      <ul class="list-group list-group-flush">
        <li
            v-for="film in movieStore.search_movies"
            :key="film.id"
            class="result list-group-item list-group-item-action search-item"
        >
          {{ film.title || film.name }}
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

.result {
  background-color: var(--color-background);
  color: var(--color-text);
}

.result:hover {
  background-color: var(--color-border) !important;
  color: var(--color-text) !important;
}
</style>