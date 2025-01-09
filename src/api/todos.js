import axios from "axios";

// const url = "http://localhost:3000/";
const postTodo = (data) => {
  axios
    .post("http://localhost:3000/todos", {
      ...data,
    })
    .then(function (response) {
      // 성공 핸들링
      console.log(response);
    })
    .catch(function (error) {
      // 에러 핸들링
      console.log(error);
    })
    .finally(function () {
      // 항상 실행되는 영역
    });
};

export { postTodo };
