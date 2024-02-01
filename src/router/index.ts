import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "HomeView",
      component: HomeView,
      children: [
        {
          path: "/:id",
          name: "UserView",
          component: () => import("@/views/UserView.vue"),
        },
      ],
    },
  ],
});

export default router;
