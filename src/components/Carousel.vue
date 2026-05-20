<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const cards = ref([
  { id: 1, title: "Michel", date: "22/04/2026", image: "https://via.placeholder.com/150x220" },
  { id: 2, title: "Concert", date: "20/05/2026", image: "https://via.placeholder.com/150x220" },
  { id: 3, title: "Event", date: "15/06/2026", image: "https://via.placeholder.com/150x220" },
  { id: 4, title: "Show", date: "10/07/2026", image: "https://via.placeholder.com/150x220" },
  { id: 5, title: "Music", date: "01/08/2026", image: "https://via.placeholder.com/150x220" },
  { id: 6, title: "Live", date: "12/09/2026", image: "https://via.placeholder.com/150x220" },
  { id: 7, title: "test", date: "22/04/2026", image: "https://via.placeholder.com/150x220" },
  { id: 8, title: "test2", date: "20/05/2026", image: "https://via.placeholder.com/150x220" },
  { id: 9, title: "test3", date: "15/06/2026", image: "https://via.placeholder.com/150x220" },
  { id: 10, title: "test4", date: "10/07/2026", image: "https://via.placeholder.com/150x220" },
  { id: 11, title: "test5", date: "01/08/2026", image: "https://via.placeholder.com/150x220" },
  { id: 12, title: "test6", date: "12/09/2026", image: "https://via.placeholder.com/150x220" }
])

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

onMounted(() => {
  updateChunkSize()
  window.addEventListener('resize', updateChunkSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateChunkSize)
})

const slides = computed(() => {
  const result = []
  for (let i = 0; i < cards.value.length; i += chunkSize.value) {
    result.push(cards.value.slice(i, i + chunkSize.value))
  }
  return result
})
</script>

<template>
  <div class="container-fluid mt-4">
    <h4 class="mb-3">POPULAIRES</h4>
    <div id="carousel" class="carousel slide custom-carousel">

      <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon"></span>
      </button>

      <div class="carousel-inner">
        <div v-for="(slide, index) in slides" :key="index" class="carousel-item" :class="{ active: index === 0 }">
          <div class="row g-3">
            <div v-for="card in slide" :key="card.id" class="col-12 col-sm-6 col-md-3 col-xl-2">

              <div class="card custom-card h-100">
                <img :src="card.image" class="card-img">
                <small class="text-muted">{{ card.title }} {{ card.date }}</small>
              </div>

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
.custom-carousel {
  border-top: 2px solid #ccc;
  border-bottom: 2px solid #ccc;
  padding: 20px 40px;
  position: relative;
}

.carousel-inner {
  overflow: hidden;
}

.custom-card {
  border: 1px solid #ddd;
  background: transparent;
  color: white;
}

.card img {
  width: 100%;
  height: 200px;
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

.carousel-control-prev {
  left: 0;
}

.carousel-control-next {
  right: 0;
}
.card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

/* mobile */
@media (max-width: 576px) {
  .card img {
    height: 140px;
  }
}

/* tablette */
@media (max-width: 992px) {
  .card img {
    height: 160px;
  }
}
</style>