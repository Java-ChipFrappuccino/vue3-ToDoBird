<template>
  <button
    type="button"
    class="btn-position btn btn-outline-secondary"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
  >
    <i class="bi bi-plus-lg"></i>
  </button>
  <div class="card" style="max-width: 1000px; width: auto">
    <div class="card-header">방명록</div>
    <ul
      v-for="post in posts"
      :key="post.id"
      class="list-group list-group-flush"
    >
      <li class="list-group-item d-flex">
        {{ post.content }}
        <span class="ms-3">[{{ post.writer }}]</span>
        <span class="ms-auto">{{ post.createdAt }}</span>
      </li>
    </ul>
  </div>
  <div ref="endPoint">이걸 마주치면 상단으로 올라감</div>
</template>

<script setup>
import { getPostList } from "@/api/guestBook";
import { onMounted, ref } from "vue";
const posts = ref([]);

const endPoint = ref(null);
onMounted(async () => {
  const observer = new IntersectionObserver(async (entries) => {
    if (entries[0].isIntersecting) {
      posts.value = await getPostList(8); // getPostList()가 반환하는 프로미스가 해결될 때까지 기다림
      console.log(posts.value);
    }
  });

  if (endPoint.value) {
    observer.observe(endPoint.value);
  }
});
</script>

<style scoped>
.btn-position {
  z-index: 999;
  position: fixed;
  bottom: 5%;
  right: 5%;
}
</style>
