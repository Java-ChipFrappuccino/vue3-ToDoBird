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
    <ul class="list-group list-group-flush">
      <TransitionGroup name="post">
        <li v-for="post in posts" :key="post.id" class="list-group-item d-flex">
          {{ post.content }}
          <span class="ms-3">[{{ post.writer }}]</span>
          <span class="ms-auto">{{ post.createdAt }}</span>
        </li>
        <div v-if="isLoading" class="d-flex justify-content-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </TransitionGroup>
    </ul>
  </div>
  <div ref="endPoint">이걸 마주치면 상단으로 올라감</div>
</template>

<script setup>
import { getPostList } from "@/api/guestBook";
import { onBeforeUnmount, onMounted, ref } from "vue";
const posts = ref([]);
const currentPage = ref(0);
const totalCount = ref(0);
const endPoint = ref(null);
// const isFirst = ref(true);
const isLoading = ref(false);
let observer = null;
onMounted(async () => {
  observer = new IntersectionObserver(async (entries) => {
    if (entries[0].isIntersecting) {
      console.log("요청전 페이지수", currentPage.value);
      // 첫 번째 요청에서 totalCount를 설정하는 부분을 먼저 처리
      if (totalCount.value === 0) {
        const { totalCount: responseTotalCount } = await getPostList(
          currentPage.value + 1,
          0
        ); // getPostList()가 반환하는 프로미스가 해결될 때까지 기다림
        totalCount.value = responseTotalCount;
      }
      console.log("페이지수 확인 완료");

      // data.forEach(async (post) => { //forEach문은 비동기로직을 지원하지 않는다
      //   posts.value.push(post);
      //   // new Promise = setTimeout(() => {}, 500);
      //   await new Promise((resolve) => setTimeout(resolve, 500)); // 딜레이 추가
      // });
      console.log("");

      if (totalCount.value <= currentPage.value * 10) {
        console.log("요청초과");
        return;
      }
      // if (isFirst.value) {
      if (isLoading.value === false) {
        try {
          isLoading.value = true;
          const { data } = await getPostList(++currentPage.value, 10);
          for (const post of data) {
            posts.value.push(post);
            await new Promise((resolve) => setTimeout(resolve, 100)); // 딜레이 추가
          }
        } catch (error) {
          console.log(error);
        } finally {
          isLoading.value = false;
        }

        // isFirst.value = !isFirst.value;
        // }

        // else if (totalCount.value) {
        const viewportHeight = window.visualViewport.height;
        console.log(viewportHeight);
        while (
          endPoint.value.getBoundingClientRect().top >= 0 &&
          endPoint.value.getBoundingClientRect().bottom <= viewportHeight
        ) {
          console.log("Element is fully inside the viewport.");
          try {
            isLoading.value = true;
            const { data } = await getPostList(++currentPage.value, 10);
            for (const post of data) {
              posts.value.push(post);
              await new Promise((resolve) => setTimeout(resolve, 100)); // 딜레이 추가
            }
          } catch (error) {
            console.log(error);
          } finally {
            isLoading.value = false;
          }
        }
      }
      // if (
      //   endPoint.value.getBoundingClientRect().top >= 0 &&
      //   endPoint.value.getBoundingClientRect().bottom <= viewportHeight
      // ) {
      //   console.log("Element is fully inside the viewport.");
      //   const { data } = await getPostList(++currentPage.value, 10);
      //   for (const post of data) {
      //     posts.value.push(post);
      //     await new Promise((resolve) => setTimeout(resolve, 100)); // 딜레이 추가
      //   }
      // } else {
      //   console.log("Element is outside the viewport.");
      // }

      console.log(endPoint.value.getBoundingClientRect());
      // 요소가 뷰포트 안에 있을 때의 조건
      // while (
      //   endPoint.value.getBoundingClientRect().top >= 0 &&
      //   endPoint.value.getBoundingClientRect().bottom <= viewportHeight
      // ) {
      //   const { data } = await getPostList(++currentPage.value, 10);
      //   for (const post of data) {
      //     posts.value.push(post);
      //     await new Promise((resolve) => setTimeout(resolve, 100)); // 딜레이 추가
      //   }
      // }
      // if (
      //   endPoint.value.getBoundingClientRect().top >= 0 &&
      //   endPoint.value.getBoundingClientRect().bottom <= viewportHeight
      // ) {
      //   console.log("Element is fully inside the viewport.");
      // } else {
      //   console.log("Element is outside the viewport.");
      // }

      console.log(posts.value);
      console.log("요청후 페이지수", currentPage.value);
      // }
    }
  });

  if (endPoint.value) {
    observer.observe(endPoint.value);
  }
});
onBeforeUnmount(() => {
  observer.disconnect(); //컴포넌트가 언마운트 되면 옵저버 이벤트 삭제, 메모리 낭비 방지
});
</script>

<style scoped>
.btn-position {
  z-index: 999;
  position: fixed;
  bottom: 5%;
  right: 5%;
}

.post-enter-from,
.post-leave-to {
  transform: translateX(30px);
  opacity: 0;
}
.post-enter-to,
.post-leave-from {
  opacity: 1;
}
.post-enter-active,
.post-leave-active {
  transition: all 0.5s ease;
}
</style>
