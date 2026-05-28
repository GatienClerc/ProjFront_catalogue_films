<script setup>
import Card from "@/components/Card.vue";
import { computed, ref } from "vue";

const currentOffset = ref(0);
const paginationFactor = 220;

const items = ref([
  { name: "Kin Khao", tag: ["Thai"] },
  { name: "Jū-Ni", tag: ["Sushi", "Japanese", "$$$$"] },
  { name: "Delfina", tag: ["Pizza", "Casual"] },
  { name: "San Tung", tag: ["Chinese", "$$"] },
  { name: "Anchor Oyster Bar", tag: ["Seafood", "Cioppino"] },
  { name: "Locanda", tag: ["Italian"] },
  { name: "Garden Creamery", tag: ["Ice cream"] },
]);

const atEndOfList = computed(() => {
  return (
      currentOffset.value <=
      paginationFactor * -1 * (items.value.length)
  );
});

const atHeadOfList = computed(() => {
  return currentOffset.value === 0;
});

function moveCarousel(direction) {
  if (direction === 1 && !atEndOfList.value) {
    currentOffset.value -= paginationFactor;
  } else if (direction === -1 && !atHeadOfList.value) {
    currentOffset.value += paginationFactor;
  }
}
</script>

<template>
  <div class="container-fluid py-5">

    <div class="d-flex align-items-center justify-content-center">
      <!-- Left button -->
      <button class="btn-primary-outline m-2" @click="moveCarousel(-1)" :disabled="atEndOfList">
        <
      </button>

      <!-- Carousel -->
      <div class="overflow-hidden">
        <div class="d-flex transition" :style="{ transform: `translateX(${currentOffset}px)` }">
          <Card v-for="item in items" :data="{title: item.name, info: item.tag[0], img: 'https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg'}"/>
        </div>
      </div>

      <!-- Right button -->
      <button class="btn-primary-outline m-2" @click="moveCarousel(1)" :disabled="atEndOfList">
        >
      </button>
    </div>
  </div>
</template>

<style scoped>
.transition {
  transition: transform 0.2s ease-in-out;
}
.btn-primary-outline {
  background-color: transparent;
  border-color: transparent;
  color: var(--color-text);
  font-size: 3rem;
}
</style>