<template>
  <nav class="navbar navbar-expand-sm bg-body-tertiary">
    <div class="container-fluid">
      <RouterLink class="navbar-brand" to="/">ToDoBird</RouterLink>
      <button
        ref="navBtn"
        id="navbar-toggler"
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink
              class="nav-link"
              @click="closeNavbar"
              aria-current="page"
              to="/todo"
              >ToDo</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" @click="closeNavbar" to="/about"
              >About</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" @click="closeNavbar" to="/other"
              >Other</RouterLink
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
const navBtn = ref(null);
const closeNavbar = () => {
  // 버튼 클릭 트리거
  if (navBtn.value) {
    navBtn.value.click(); // 버튼 클릭 이벤트를 강제로 호출
  }
};
</script>

<style scoped></style>
