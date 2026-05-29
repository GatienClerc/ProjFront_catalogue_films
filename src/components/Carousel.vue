<script setup>
import Card from "@/components/Card.vue";
import { ref } from "vue";
import { useMovieStore } from '@/stores/movieStore'

const movieStore = useMovieStore()

const props = defineProps({
  source: {
    type: String,
    required: true,
  },
});

const items = movieStore[props.source]

// visual effect
const cardWidth = 220;
const offset = ref(0);
const transitioning = ref(false);

function moveCarousel(direction) {
  if (transitioning.value) return;

  transitioning.value = true;

  if (direction === 1) {
    // RIGHT
    offset.value = -cardWidth;

    setTimeout(() => {
      const first = items.shift();
      items.push(first);

      transitioning.value = false;
      offset.value = 0;
    }, 300);

  } else {
    // LEFT

    // Put last item in front FIRST
    const last = items.pop();
    items.unshift(last);

    // Jump instantly to shifted position
    transitioning.value = false;
    offset.value = -cardWidth;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Animate back to center
        transitioning.value = true;
        offset.value = 0;
      });
    });

    setTimeout(() => {
      transitioning.value = false;
    }, 300);
  }
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
      <div class="carousel-window overflow-hidden">
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
              title: item.title,
              info: item.info,
              img: item.img
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