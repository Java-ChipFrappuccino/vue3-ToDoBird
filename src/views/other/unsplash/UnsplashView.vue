<template>
  <!-- <div v-for="photo in photos" :key="photo.id">
    <img :src="photo.urls.small" class="rounded float-start" alt="..." />
  </div> -->
  <div class="container">
    <div class="row">
      <TransitionGroup name="photos">
        <div class="col-md-4 mb-3" v-for="photo in photos" :key="photo.id">
          <!-- 개별 카드 -->
          <div class="card">
            <img
              :src="photo.urls.small"
              class="rounded float-start border border-0"
              alt="Random Image"
            />
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup>
import { useUnsplashStore } from "@/stores/unsplash";
const { photos, isLoading, error, getPhotos } = useUnsplashStore();
getPhotos(30);
// console.log(photos);
// console.log(photos[0].urls.small);
</script>

<style scoped>
.photos-enter-from,
.photos-leave-to {
  opacity: 0;
}
.photos-enter-to,
.photos-leave-from {
  opacity: 1;
}
.photos-enter-active,
.photos-leave-active {
  transition: all 1s ease;
}
</style>
