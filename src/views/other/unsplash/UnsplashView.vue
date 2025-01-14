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
    <!-- 감지용 요소 -->
    <div ref="sentinel"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useUnsplashStore } from "@/stores/unsplash";
const { photos, isLoading, error, getPhotos, resetStore } = useUnsplashStore();

const sentinel = ref(null);

let isFetching = false;

const handleScroll = async () => {
  if (isFetching) return;
  isFetching = true;
  await getPhotos(10);
  isFetching = false;
};
let observer = null;

onMounted(() => {
  // Intersection Observer 생성
  observer = new IntersectionObserver(async (entries) => {
    if (entries[0].isIntersecting) {
      await handleScroll(); // 감지되면 이미지 로드
    }
  });

  if (sentinel.value) {
    observer.observe(sentinel.value); // 감지 요소 관찰 시작
  }
});

onBeforeUnmount(() => {
  if (observer && sentinel.value) {
    observer.unobserve(sentinel.value); // 관찰 중단
    resetStore();
  }
});

// getPhotos(30);
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
