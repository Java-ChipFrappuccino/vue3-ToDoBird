import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import TodoView from "../views/TodoView.vue";
import OtherView from "@/views/other/OtherView.vue";
import OtherHomeView from "@/views/other/OtherHomeView.vue";
import WeatherView from "@/views/other/weather/WeatherView.vue";
import UnsplashView from "@/views/other/unsplash/UnsplashView.vue";
import GuestBookView from "@/views/other/guestbook/GuestBookView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "HomeView",
      component: HomeView,
    },
    {
      path: "/todo",
      name: "TodoView",
      component: TodoView,
    },
    {
      path: "/about",
      name: "AboutView",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/other",
      name: "OtherView",
      component: OtherView,
      meta: { noContainer: true }, // 레이아웃 제외 플래그
      children: [
        {
          path: "",
          name: "OtherHomeView",
          component: OtherHomeView,
        },
        {
          path: "weather",
          name: "WeatherView",
          component: WeatherView,
        },
        {
          path: "guestbook",
          name: "GuestBookView",
          component: GuestBookView,
        },
        {
          path: "unsplash",
          name: "UnsplashView",
          component: UnsplashView,
        },
      ],
    },
  ],
});

export default router;
