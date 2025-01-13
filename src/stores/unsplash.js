import { defineStore } from "pinia";
import { getRandomImage } from "@/api/unsplash";
import { ref } from "vue";

export const useUnsplashStore = defineStore("unsplash", () => {
  const photos = ref([]);
  const isLoading = ref(false);
  const error = ref(null);
  const getPhotos = async (count) => {
    isLoading.value = true;
    error.value = null;
    try {
      const fetchedPhotos = await getRandomImage(count);
      // console.log(photos);
      // 하나씩 추가
      for (const photo of fetchedPhotos) {
        photos.value.push(photo);
        await new Promise((resolve) => setTimeout(resolve, 100)); // 딜레이 추가
      }
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  };
  return { photos, isLoading, error, getPhotos };
});
