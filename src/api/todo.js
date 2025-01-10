import axios from "axios";
//서버 베이스 url
const url = "http://localhost:3000/";
export const postTodo = async (data) => {
  try {
    const response = await axios.post(url + "todos", {
      is_done: false,
      ...data,
    });
    return response.data; // 새로 생성된 todo 데이터 반환
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateTodoStatus = async (id, isDone) => {
  try {
    const response = await axios.patch(url + "todos/" + id, {
      is_done: isDone,
    });
    return response.data; // 새로 생성된 todo 데이터 반환
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteTodo = async (id) => {
  try {
    const response = await axios.delete(url + "todos/" + id);
    return response.data; // 새로 생성된 todo 데이터 반환
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getTodoList = async () => {
  try {
    const response = await axios.get(url + "todos");
    return response.data;
  } catch (error) {
    return error;
  } finally {
    console.log();
  }
};
