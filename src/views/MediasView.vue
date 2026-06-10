<script setup>
import { ref } from 'vue'
import Slider from '@vueform/slider'
import { watch } from 'vue'
import { useMovieStore } from '@/stores/movieStore'

const store = useMovieStore()

const selected_genres = ref([])

function toggleGenre(id) {
  const list = selected_genres.value

  const index = list.indexOf(id)

  if (index === -1) {
    list.push(id)
  } else {
    list.splice(index, 1)
  }
}
watch(
    () => [store.type],
    ([type]) => {
      store.fetchGenres(type)
      selected_genres.value = []
      console.log(store.type)
      console.log(store.genres)
    },
    { immediate: true }
)
</script>

<template>
  <div class="filter container-fluid">
    <div class="row">
      <div class="col-1 col-xxl-1">

        <fieldset class="border-0">
          <div class="d-flex flex-column gap-2">
            <label>
              <input type="radio" name="type" value="movie" v-model="store.type" checked />
              Films
            </label>

            <label>
              <input type="radio" name="type" value="tv" v-model="store.type" />
              Series
            </label>
          </div>

        </fieldset>
      </div>

      <div class="col-10 col-xxl-4">
        <div class="d-flex flex-wrap gap-1">
          <button
              v-for="genre in store.genres"
              :key="genre.id"
              :class="{ active: selected_genres.includes(genre.id) }"
              class="m-1"
              @click="toggleGenre(genre.id)"
          >
            {{ genre.name }}
          </button>
        </div>
      </div>

      <div class="col-6 col-xxl-2 p-3 align-self-center">
        <label class="fs-5 d-block">Durée</label>
        <Slider :min="0" :max="400" :step="10" :tooltips="true" v-model="store.duration" />
        <div class="small text-muted mt-2">
          entre {{ store.duration[0] }} / {{ store.duration[1] }} min
        </div>
      </div>

      <div class="col-6 col-xxl-2 vue-slide p-3 align-self-center">
        <label class="fs-5 d-block">Note</label>
        <Slider :min="0" :max="10" :step="1" :tooltips="true" v-model="store.note" />
        <div class="small text-muted mt-2">
          entre {{ store.note[0] }} / {{ store.note[1] }}
        </div>
      </div>

      <div class="col-6 col-xxl-1 align-self-center">

        <input type="date" id="date" name="trip-end" min="1900-01-01" v-model="store.date" />

        <fieldset class="border-0 p-0 mt-2">
          <div class="d-flex align-items-center gap-3">

            <label class="d-flex align-items-center gap-1">
              <input type="radio" name="gte_lte" value="before" v-model="store.gte_lte" checked />
              avant
            </label>

            <label class="d-flex align-items-center gap-1">
              <input type="radio" name="gte_lte" value="after" v-model="store.gte_lte" />
              apres
            </label>

          </div>
        </fieldset>
      </div>

      <div class="col-6 col-xxl-2 align-self-center p-5">
        <div class="form-check d-flex align-items-center justify-content-center h-100">
          <input class="form-check-input" v-model="store.checkAdult" type="checkbox" id="checkAdult">
          <label class="form-check-label ms-2">Afficher les films pour adulte</label>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import "@vueform/slider/themes/default.css";

/* hsl(240 100% 66%) */

.filter {
  padding: 20px 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #777;
}

.filter .col-1,
.filter .col-2,
.filter .col-3 {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.form-check-input {
  cursor: pointer;
}

button {
  background-color: var(--color-background);
  color: var(--color-text);
  border-radius: 25px;
  border: 3px solid var(--color-border);
}

button.active {
  background-color: var(--color-border);
  color: var(--color-text);
}
</style>