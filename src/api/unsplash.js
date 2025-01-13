import axios from "axios";

export const getRandomImage = async (count) => {
  try {
    const response = await axios.get(
      `https://api.unsplash.com/photos/random?count=${count}&client_id=${
        import.meta.env.VITE_UNSPLASH_API_KEY
      }`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
