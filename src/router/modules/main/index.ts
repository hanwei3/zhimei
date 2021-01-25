// @ts-ignore
const User = () => import("@/views/main/user"); // 用户 view
const parentPath = "@/views/main/user/"; // 页面的父路径
// user=>home 模块
const UserView = () => import("@/views/main/user/index.vue"); // 首页
const userModule = [
  {
    path: "/user",
    component: User,
    children: [
      {
        path: "",
        redirect: "/user/home",
        name: "user-layout"
      },
      {
        path: "/user/home", // 首页
        name: "user-home",
        component: UserView,
        meta: {
          title: "首页",
          auth: true
        }
      }
    ]
  }
];
export default userModule;
