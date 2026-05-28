<script setup>
import Card from "@/components/Card.vue";
import { ref } from "vue";

const cardWidth = 220;

const items = ref([
  { name: "Kin Khao", tag: ["Thai"] },
  { name: "Jū-Ni", tag: ["Sushi", "Japanese", "$$$$"] },
  { name: "Delfina", tag: ["Pizza", "Casual"] },
  { name: "San Tung", tag: ["Chinese", "$$"] },
  { name: "Anchor Oyster Bar", tag: ["Seafood", "Cioppino"] },
  { name: "Locanda", tag: ["Italian"] },
  { name: "Garden Creamery", tag: ["Ice cream"] },
]);

const offset = ref(0);
const transitioning = ref(false);

function moveCarousel(direction) {
  if (transitioning.value) return;

  transitioning.value = true;

  // Slide visually
  offset.value = direction === 1 ? -cardWidth : cardWidth;

  setTimeout(() => {
    if (direction === 1) {
      // Move first item to end
      const first = items.value.shift();
      items.value.push(first);
    } else {
      // Move last item to start
      const last = items.value.pop();
      items.value.unshift(last);
    }

    // Reset instantly
    transitioning.value = false;
    offset.value = 0;
  }, 300);
}
</script>

<template>
  <div class="container-fluid py-5">
    <div class="d-flex align-items-center justify-content-center">

      <!-- Left -->
      <button
          class="btn-primary-outline m-2"
          @click="moveCarousel(-1)"
      >
        <
      </button>

      <!-- Carousel -->
      <div class="carousel-window overflow-hidden" style="width: 100%;">
        <div
            class="d-flex"
            :class="{ transition: transitioning }"
            :style="{
            transform: `translateX(${offset}px)`
          }"
        >
          <Card
              v-for="item in items"
              :key="item.name"
              :data="{
              title: item.name,
              info: item.tag[0],
              img: 'https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg'
            }"
          />
        </div>
      </div>

      <!-- Right -->
      <button
          class="btn-primary-outline m-2"
          @click="moveCarousel(1)"
      >
        >
      </button>

    </div>
  </div>
</template>

<style scoped>
.carousel-window {
  width: 900px;
}

.transition {
  transition: transform 0.3s ease-in-out;
}

.btn-primary-outline {
  background-color: transparent;
  border: none;
  color: var(--color-text);
  font-size: 3rem;
  cursor: pointer;
}
</style>