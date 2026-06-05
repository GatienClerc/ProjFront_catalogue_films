<script setup>
import { storeToRefs } from 'pinia'
import Slider from '@vueform/slider'

let duration = {}
let note = {}
</script>

<template>
  <div class="filter container-fluid">
    <div class="row">
      <div class="col-1">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" v-model="isMovie" id="checkMovie">
          <label class="form-check-label">Film</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" v-model="isSeries" id="checkSeries">
          <label class="form-check-label">Series</label>
        </div>
      </div>

      <div class="col-3">
        <p>catégorie</p>
      </div>

      <div class="col-2">

        <input type="date" id="date" name="trip-end" min="1900-01-01" />

        <fieldset style="border: none; padding: 0; margin-top: 10px;">
          <div style="display: flex; gap: 15px; align-items: center;">

            <label style="display: flex; align-items: center; gap: 5px;">
              <input type="radio" name="gte-lte" value="before" checked />
              avant
            </label>

            <label style="display: flex; align-items: center; gap: 5px;">
              <input type="radio" name="gte-lte" value="after" />
              apres
            </label>

          </div>
        </fieldset>
      </div>

      <div class="col-3">
        <label class="title">Durée</label>
        <Slider v-model="duration" :min="0" :max="400" :step="10" :tooltips="false"/>
        <div class="subtitle">
          entre {{ duration[0] }} / {{ duration[1] }} min
        </div>
      </div>

      <div class="col-2 vue-slide">
        <label class="title">Note</label>
        <Slider v-model="note" :min="0" :max="10" :step="1" :tooltips="false"/>
        <div class="subtitle">
          entre {{ note[0] }} / {{ note[1] }}
        </div>
      </div>


      <div class="col-1">
        <div class="form-check adult">
          <input class="form-check-input" type="checkbox" id="checkAdult">
          <label class="form-check-label">Afficher film pour adulte</label>
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
