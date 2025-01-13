<template>
  <div v-if="!noContainer" class="container py-4">
    <RouterView></RouterView>
  </div>
  <div v-else>
    <RouterView></RouterView>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
// `route.meta.noContainer`를 반응형으로 처리
const noContainer = computed(() => route.meta.noContainer);
</script>

<style scoped></style>
