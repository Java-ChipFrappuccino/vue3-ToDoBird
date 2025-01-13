<template>
  <div class="about">
    <h1>About</h1>
    <textarea
      class="form-control"
      :placeholder="defaultPlaceHolder"
      name=""
      v-model="message"
      id=""
    ></textarea>

    <div>{{ message }}</div>
  </div>
</template>
<script setup>
import { ref } from "vue";
const message = ref("");
const defaultPlaceHolder = ref("아무글이나 끄적끄적");
</script>
<style></style>
