<template>
  <div>최상단</div>
  <div class="form-floating mb-3">
    <input
      type="email"
      class="form-control"
      id="floatingInput"
      placeholder=""
    />
    <label for="floatingInput">작성자</label>
  </div>
  <div class="form-floating">
    <textarea
      style="height: 100px"
      class="form-control"
      placeholder="Leave a comment here"
      id="floatingTextarea"
      maxlength="10"
    ></textarea>
    <label for="floatingTextarea">내용</label>
  </div>
  <div ref="endPoint">이걸 마주치면 상단으로 올라감</div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const endPoint = ref(null);
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      setTimeout(() => {
        window.scrollTo({ top: 0 });
        console.log("감지");
      }, 300);
    }
  });

  if (endPoint.value) {
    observer.observe(endPoint.value);
  }
});
</script>

<style scoped></style>
