<script setup>
import { ref, watch } from 'vue'
import Slider from '@vueform/slider'
import { onMounted } from 'vue'
import { useMovieStore } from '@/stores/movieStore'

const store = useMovieStore()

onMounted(() => {
  store.fetchGenres()
})

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

</script>

<template>
  <div class="filter container-fluid">
    <div class="row">
      <div class="col-1 col-xxl-1">

        <fieldset style="border: none;">
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <label>
              <input type="radio" name="type" value="film" v-model="store.type" checked/>
              Films
            </label>

            <label>
              <input type="radio" name="type" value="series" v-model="store.type" />
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
        <label class="title">Durée</label>
        <Slider :min="0" :max="400" :step="10" :tooltips="true" v-model="store.duration"/>
        <div class="subtitle">
          entre {{ store.duration[0] }} / {{ store.duration[1] }} min
        </div>
      </div>

      <div class="col-6 col-xxl-2 vue-slide p-3 align-self-center">
        <label class="title">Note</label>
        <Slider :min="0" :max="10" :step="1" :tooltips="true" v-model="store.note"/>
        <div class="subtitle">
          entre {{ store.note[0] }} / {{ store.note[1] }}
        </div>
      </div>

      <div class="col-6 col-xxl-1 align-self-center">

        <input type="date" id="date" name="trip-end" min="1900-01-01" v-model="store.date"/>

        <fieldset style="border: none; padding: 0; margin-top: 10px;">
          <div style="display: flex; gap: 15px; align-items: center;">

            <label style="display: flex; align-items: center; gap: 5px;">
              <input type="radio" name="gte_lte" value="before" v-model="store.gte_lte" checked />
              avant
            </label>

            <label style="display: flex; align-items: center; gap: 5px;">
              <input type="radio" name="gte_lte" value="after" v-model="store.gte_lte"/>
              apres
            </label>

          </div>
        </fieldset>
      </div>

      <div class="col-6 col-xxl-2 align-self-center">
        <div class="form-check adult">
          <input class="form-check-input" v-model="store.checkAdult" type="checkbox" id="checkAdult">
          <label class="form-check-label m-1">Afficher les films pour adulte</label>
        </div>
      </div>
    </div>
  </div>


</template>

<style>
@import "@vueform/slider/themes/default.css";
//hsl(240 100% 66%)

.title {
  font-size: 18px;
  display: block;
}

.subtitle {
  font-size: 14px;
  color: #777;
  margin-top: 8px;
}

.adult {
  display: flex;
  align-items: center;
  height: 100%;
}

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

.form-check {
  margin-bottom: 8px;
}

.form-check-input {
  cursor: pointer;
}
button {
  background-color: var(--color-background);
  color: var(--color-text);
  border-radius: 25px;
  border: 3px solid var(--color-background-mute);
}
button.active {
  background-color: var(--color-background-mute);
  color: var(--color-text);
}
</style>
