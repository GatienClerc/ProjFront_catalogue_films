<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <main class="h1 p-1">
    Id du film: {{ route.params.id }}
  </main>
</template>
