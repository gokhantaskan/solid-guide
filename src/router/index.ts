import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: { name: "HomeView" },
    },
    {
      path: "/users",
      name: "HomeView",
      component: HomeView,
      children: [
        {
          path: ":id",
          name: "UserView",
          component: () => import("../views/UserView.vue"),
          props: true,
        },
      ],
    },
  ],
});

export default router;
