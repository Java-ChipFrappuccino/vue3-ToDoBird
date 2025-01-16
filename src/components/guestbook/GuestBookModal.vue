<template>
  <ModalComp>
    <template #header>
      <span>방명록 작성</span>
    </template>
    <template #default>
      <div class="form-floating mb-3">
        <input
          ref="inputFocus"
          v-model="writer"
          type="text"
          class="form-control"
          id="floatingInput"
          placeholder=""
        />

        <label for="floatingInput">작성자</label>
      </div>
      <div class="form-floating">
        <textarea
          v-model="content"
          style="height: 100px"
          class="form-control"
          placeholder="Leave a comment here"
          id="floatingTextarea"
        ></textarea>
        <label for="floatingTextarea">내용</label>
      </div>
    </template>
    <template #footer>
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
        취소
      </button>
      <button
        type="button"
        class="btn btn-primary"
        data-bs-dismiss="modal"
        @click="addPost"
      >
        등록
      </button>
    </template>
  </ModalComp>
</template>

<script setup>
import ModalComp from "@/components/app/ModalComp.vue";
import dayjs from "dayjs";
import { createPost } from "@/api/guestBook";
import { onMounted, onUnmounted, ref } from "vue";
const writer = ref(null);
const content = ref(null);
const inputFocus = ref(null);

const addPost = () => {
  createPost({
    writer: writer.value,
    content: content.value,
    createdAt: dayjs().format("YYYY.MM.DD"),
  });
  emit("update:modelValue", true);
  writer.value = "";
  content.value = "";
  // reload();
};
// 모달이 열릴 때 input에 focus 설정
const modal = ref(null);
onMounted(() => {
  modal.value = document.getElementById("exampleModal");
  console.log(inputFocus.value);

  modal.value.addEventListener("shown.bs.modal", () => {
    if (inputFocus.value) {
      inputFocus.value.focus();
    }
  });
});
onUnmounted(() => {
  modal.value.removeEventListener("shown.bs.modal", () => {});
});
const prop = defineProps({
  modelValue: Boolean,
});
const emit = defineEmits(["update:modelValue"]);
</script>

<style scoped></style>
