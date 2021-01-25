import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import UserModule from "../router/modules/main"; // 用户模块

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/user"
    },
    ...UserModule
  ]
});

export default router;
