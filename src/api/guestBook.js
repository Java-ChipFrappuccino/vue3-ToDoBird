import axios from "axios";
const url = import.meta.env.VITE_DB_BASE_URL;

export const getPostList = async (page, limit) => {
  try {
    const response = await axios.get(url + "posts", {
      params: {
        _page: page,
        _limit: limit,
        _sort: "createdAt",
        _order: "desc",
      },
    });

    return {
      data: response.data,
      totalCount: parseInt(response.headers["x-total-count"], 10), // 전체 데이터 개수
    };
  } catch (error) {
    console.log(error);
  }
};

export const getPostById = () => {};

export const createPost = async (data) => {
  await axios.post(url + "posts", {
    writer: data.writer,
    content: data.content,
    createdAt: data.createdAt,
  });
};
