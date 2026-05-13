<script setup>
  //TODO need to use API
  const title = "Titre"
  const date = "01.01.2000"
  const image = "https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg"
</script>

<template>
  <div class="card shadow" style="width: 10rem;">
    <div class="">
      <img class="card-img-top object-fit-cover" :src="image" :alt="'affiche '+title">
    </div>
    <div class="card-body p-1">
      <p class="m-0 fs-4">{{ title }}</p>
      <p class="m-0">{{ date }}</p>
    </div>
  </div>
</template>

<style scoped>

</style>