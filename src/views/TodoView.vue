<template>
  <h2>할일 목록</h2>
  <div class="text-body-secondary">삭제하려면 Ctrl + 클릭 하세요</div>
  <div class="container text-center">
    <Transition name="fade">
      <div
        v-if="!isLoading && todos.length === 0"
        class="p-5 position-absolute top-50 start-50 translate-middle"
      >
        할일이 없습니다!<br />여유를 즐겨보시는건 어떨까요?
      </div>
    </Transition>
    <TransitionGroup name="list">
      <div class="row" v-for="item in todos" :key="item.id">
        <div
          id="todo"
          class="col-12 p-3 rounded-pill"
          :class="{
            'text-decoration-line-through text-body-secondary': item.is_done,
          }"
          @click="updateOrDeleteTodo($event, item)"
        >
          {{ item.content }}
        </div>
      </div>
    </TransitionGroup>
  </div>

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
          <h1 class="modal-title fs-5" id="exampleModal">ToDo</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
          ></button>
        </div>
        <form action="">
          <div class="">
            <input
              autofocus
              v-model="todo"
              type="text"
              class="form-control"
              placeholder="무엇을 해야할까?"
            />
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
// isdone 상태가 개별로 적용되어야함 , 또한 성사유무를 db에 업데이트 하고 삭
//
//
// 제 버튼을 추가한다
import { ref } from "vue";
import {
  postTodo,
  getTodoList,
  updateTodoStatus,
  deleteTodo,
} from "@/api/todo";

const todos = ref([]);
const todo = ref("");
const isLoading = ref(true); // 로딩 상태 추가
const todoList = async () => {
  try {
    isLoading.value = true; // 로딩 시작
    todos.value = await getTodoList();
    console.log(todos);
  } catch (error) {
    console.error("할 일 목록을 불러오는데 실패했습니다:", error);
  } finally {
    isLoading.value = false; // 로딩 완료
  }
};

// 컴포넌트 마운트시 목록 불러오기
todoList();

const addTodo = async () => {
  try {
    // 입력값이 비어있으면 함수 종료
    if (!todo.value.trim()) return;

    // 새로운 todo 추가
    await postTodo({
      content: todo.value,
      is_done: false,
    });

    // 목록 새로고침
    await todoList();

    // 입력창 초기화
    todo.value = "";
  } catch (error) {
    console.error("할 일을 추가하는데 실패했습니다:", error);
  }
};

const updateOrDeleteTodo = async (e, { id, is_done }) => {
  if (e.ctrlKey) {
    console.log("ctrl click");
    await deleteTodo(id);
    await todoList();
  } else {
    updateTodoStatus(id, !is_done) // is_done 값 업데이트
      .then((updatedTodo) => {
        const index = todos.value.findIndex((todo) => todo.id === id);
        if (index !== -1) {
          // 해당 항목의 is_done 값을 반영
          todos.value[index].is_done = !is_done;
        }
        console.log("Updated Todo:", updatedTodo);
      })
      .catch((error) => {
        console.error("Error updating todo:", error);
      });
  }
};
</script>

<style scoped>
/* 오빤 투두 스타일 */
#todo {
  /* background-color: white; */
  transition: all 0.4s ease;
}
#todo:hover {
  cursor: pointer;
  background-color: rgba(128, 128, 128, 0.377);
}

.btn-position {
  position: fixed;
  bottom: 5%;
  right: 5%;
}
.list-move, /* 움직이는 엘리먼트에 트랜지션 적용 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 오빤 백수 스타일 */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
/* 이동 애니메이션을 올바르게 계산할 수 있도록
   레이아웃 흐름에서 나머지 항목을 꺼내기. */
.list-leave-active {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
