<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useMovieStore } from '@/stores/movieStore'
import {useMockMovieStore} from "@/stores/mockMovieStore.js";

const store = useMockMovieStore()

//const store = useMovieStore()
const cards = computed(() => store.movies)


const chunkSize = ref(6)

const updateChunkSize = () => {
  const width = window.innerWidth

  if (width < 576) {
    chunkSize.value = 1
  } else if (width < 768) {
    chunkSize.value = 2
  } else if (width < 992) {
    chunkSize.value = 3
  } else if (width < 1200) {
    chunkSize.value = 4
  } else {
    chunkSize.value = 6
  }
}

onMounted(async () => {
  updateChunkSize()
  window.addEventListener('resize', updateChunkSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateChunkSize)
})

const slides = computed(() => {
  const result = []
  const total = cards.value.length

  for (let i = 0; i < total; i++) {
    const group = []

    for (let j = 0; j < chunkSize.value; j++) {
      const index = (i + j) % total
      group.push(cards.value[index])
    }

    result.push(group)
  }
  return result
})
</script>

<template>
  <div class="container-fluid mt-4">
    <div id="carousel" class="carousel slide custom-carousel">

      <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon"></span>
      </button>

      <div class="carousel-inner">
        <div v-for="(slide, index) in slides" :key="index" class="carousel-item" :class="{ active: index === 0 }">
          <div class="row gx-3 justify-content-evenly">
            <div v-for="card in slide" :key="card.id" class="col-auto">

              <slot :card="card" />

            </div>
          </div>
        </div>
      </div>

      <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
        <span class="carousel-control-next-icon"></span>
      </button>

    </div>
  </div>
</template>


<style scoped>
.carousel{
  color: var(--color-text);
}

.carousel-item {
  transition: none !important;
}

.custom-carousel {
  border-top: 2px solid var(--color-border);
  border-bottom: 2px solid var(--color-border);
  padding: 20px 40px;
  background: var(--color-background);
}

.carousel-inner {
  overflow: hidden;
}

.card img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.carousel-control-prev,
.carousel-control-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 50px;
}

.carousel-control-next-icon,
.carousel-control-prev-icon {
  filter: invert(1);
}

@media (prefers-color-scheme: dark) {
  .carousel-control-next-icon,
  .carousel-control-prev-icon {
    filter: none;
  }
}


@media (max-width: 576px) {
  .card img {
    height: 140px;
  }
}

@media (max-width: 992px) {
  .card img {
    height: 160px;
  }
}
</style>