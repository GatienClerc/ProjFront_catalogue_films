<script setup>
  //TODO need to use API
  const props = defineProps({
    //TODO Mock data to change
    card_type: String
  })
  let title = ""
  let info = ""
  let img = ""
  //mock
  if (props.card_type === "film") {
    title = "Titre"
    info = "01.01.2000"
    img = "https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg"
  } else if (props.card_type === "actor") {
    title = "Nom Prénom"
    info = "role"
    img = "https://media.themoviedb.org/t/p/w138_and_h175_face/6CkZLwEJxfqqcJHyeXegMAvOlPh.jpg"
  } else {
    title = "Titre"
    info = "01.01.2000"
    img = "https://media.themoviedb.org/t/p/w227_and_h127_face/6SGsPDrZlNoMz1QLMEvkJHcksGg.jpg"
  }
</script>

<template>
  <div class="card shadow" style="width: 10rem;">
    <img class="card-img-top" :src="img" :alt="'affiche '+title">
    <div class="card-body p-1">
      <p class="m-0 fs-4">{{ title }}</p>
      <p class="m-0">{{ info }}</p>
    </div>
  </div>
</template>

<style scoped>

</style>