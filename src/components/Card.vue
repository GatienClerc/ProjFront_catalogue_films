<script setup>
  import {RouterLink} from "vue-router";

  const props = defineProps({
    data: Object
  })
</script>

<template>
  <RouterLink :to="data.link" v-if="data" class="card shadow mx-2 flex-shrink-0 p-0" style="width: 15rem;">
    <img class="card-img-top" :src="data.img" :alt="data.title">
      <div class="card-body p-1">
        <p class="m-0 fs-5">{{ data.title }}</p>
        <p class="m-0">{{ data.info }}</p>
      </div>
  </RouterLink>
</template>

<style scoped>

</style>