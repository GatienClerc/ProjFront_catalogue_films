<script setup>
import { ref, watch } from 'vue'
import Slider from '@vueform/slider'
import { onMounted } from 'vue'
import { useMovieStore } from '@/stores/movieStore'

const store = useMovieStore()

</script>

<template>
  <div class="filter container-fluid">
    <div class="row">
      <div class="col-1">

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

      <div class="col-3">
        <p>catégorie</p>
      </div>

      <div class="col-2">

        <input type="date" id="date" name="trip-end" min="1900-01-01" v-model="store.date" />

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

      <div class="col-3">
        <label class="title">Durée</label>
        <Slider :min="0" :max="400" :step="10" :tooltips="false" v-model="store.duration"/>
        <div class="subtitle">
          entre {{ store.duration[0] }} / {{ store.duration[1] }} min
        </div>
      </div>

      <div class="col-2 vue-slide">
        <label class="title">Note</label>
        <Slider :min="0" :max="10" :step="1" :tooltips="false" v-model="store.note"/>
        <div class="subtitle">
          entre {{ store.note[0] }} / {{ store.note[1] }}
        </div>
      </div>


      <div class="col-1">
        <div class="form-check adult">
          <input class="form-check-input" v-model="store.checkAdult" type="checkbox" id="checkAdult">
          <label class="form-check-label">Afficher les films pour adulte</label>
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
</style>
