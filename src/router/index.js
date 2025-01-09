import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import TodoView from "../views/TodoView.vue";
import OtherView from "@/views/other/OtherView.vue";

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
    },
  ],
});

export default router;
