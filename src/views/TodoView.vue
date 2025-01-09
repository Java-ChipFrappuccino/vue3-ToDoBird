<template>
  <div>투두입니다</div>

  <div class="container text-center">
    <div>모든일 처리</div>
    <div class="row">
      Modal
      <div class="col-12 p-3">Column</div>
      <div class="col-12 p-3">Column</div>
      <div class="col-12 p-3">Column</div>
      <div class="col-12 p-3">Column</div>
      <div class="col-12 p-3">Column</div>
    </div>
  </div>
  <!-- <button
    @click="addTodo"
    class="btn-position btn btn-outline-secondary"
    type="button"
  >
    <i class="bi bi-plus-lg"></i>
  </button> -->

  <!-- Button trigger modal -->
  <button
    type="button"
    class="btn-position btn btn-outline-secondary"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
  >
    <i class="bi bi-plus-lg"></i>
  </button>

  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">ToDo</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
          ></button>
        </div>
        <form action="">
          <div class="input-group mb-3">
            <input
              v-model="todo"
              type="text"
              class="form-control"
              placeholder="무엇을 해야할까?"
            />
            <p>{{ todo }}</p>
          </div>
          <!-- <div class="modal-body">...</div> -->
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              취소
            </button>
            <button
              data-bs-dismiss="modal"
              @click="addTodo"
              type="button"
              class="btn btn-success"
            >
              등록
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- <TodoModalComp v-if="isAdd"></TodoModalComp> -->
</template>

<script setup>
import TodoModalComp from "@/components/todo/TodoModalComp.vue";
import { reactive, ref } from "vue";
import { postTodo } from "@/api/todos";

const todos = reactive([]);
const todo = ref("");
// const isAdd = ref(false);
// 등록을 누르면 모달창이 나와서 거기서 값을 입력하고 등록 취소를 결정한다
const addTodo = () => {
  console.log(todo.value);

  postTodo({ content: todo.value });

  // todos.push{}
  // isAdd.value = true;
};
</script>

<style scoped>
.btn-position {
  position: fixed;
  bottom: 5%;
  right: 5%;
}
</style>
