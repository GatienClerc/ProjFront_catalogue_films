<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="yp-2 shadow">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 text h5">
          <RouterLink to="/" class="p-1"><li>Accueil</li></RouterLink>
          <RouterLink to="/movies" class="p-1"><li>Film/Série</li></RouterLink>
        </ul>

        <form class="col-11 col-lg-auto mb-3 mb-lg-0 me-lg-3 flex-grow-1 mx-3" style="max-width: 350px;">
          <div class="input-group">
          <span class="input-group-text">
            <i class="bi bi-search fs-5"></i>
          </span>
            <input
                type="search"
                class="form-control"
                placeholder="Search..."
                aria-label="Search"
            >
          </div>
        </form>

        <div class="text-end">
          <RouterLink to="/account" class="bi bi-person fs-2"></RouterLink>
        </div>
      </div>
    </div>
  </header>
  <RouterView />
</template>