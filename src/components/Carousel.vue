<script setup>
import { computed, ref } from "vue";

const currentOffset = ref(0);
const windowSize = 3;
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
      paginationFactor * -1 * (items.value.length - windowSize)
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
  <div class="container py-5">

    <div class="d-flex align-items-center justify-content-center">
      <!-- Left button -->
      <button
          class="btn btn-outline-success rounded-circle me-3"
          @click="moveCarousel(-1)"
          :disabled="atHeadOfList"
      >
        ‹
      </button>

      <!-- Carousel -->
      <div class="overflow-hidden col-10">
        <div
            class="d-flex transition"
            :style="{ transform: `translateX(${currentOffset}px)` }"
        >
          <div
              v-for="item in items"
              :key="item.name"
              class="card shadow-sm mx-2 flex-shrink-0"
              style="width: 200px"
          >
            <img
                src="https://placehold.co/200x200"
                class="card-img-top"
                alt="Restaurant"
            />

            <div class="card-body">
              <h5 class="card-title mb-3">
                {{ item.name }}
              </h5>

              <div class="d-flex flex-wrap gap-1">
                <span
                    v-for="tag in item.tag"
                    :key="tag"
                    class="badge text-bg-light border"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right button -->
      <button
          class="btn btn-outline-success rounded-circle ms-3"
          @click="moveCarousel(1)"
          :disabled="atEndOfList"
      >
        ›
      </button>
    </div>
  </div>
</template>

<style scoped>
.transition {
  transition: transform 0.2s ease-in-out;
}
</style>