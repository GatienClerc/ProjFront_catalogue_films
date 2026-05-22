<script setup>
import Card from "@/components/Card.vue";
const img = "https://media.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,00192f,00baff)/4drV6iluttgjZmU1Q0xDqjrBQ1.jpg"
</script>

<template>
  <main>
    <!-- most popular film at the moment ? -->
    <img :src="img" class="img-fluid shadow" alt="BestMovie">
    <div class="px-5 py-3">
      <Card card_type="film"/>
    <!-- popular carousel -->
    <!-- new carousel -->
    </div>
  </main>
</template>