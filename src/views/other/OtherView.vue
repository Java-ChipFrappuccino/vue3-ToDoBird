<template>
  <div>
    <nav class="navbar navbar-expand-sm bg-light">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <RouterLink class="nav-link" aria-current="page" to="/weather"
                >Weather</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/features">Features</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
  <RouterView></RouterView>
</template>

<script setup>
import { RouterView } from "vue-router";
</script>

<style scoped></style>
