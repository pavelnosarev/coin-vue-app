import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import CoinsIndex from "../views/CoinsIndex.vue";
import CoinsNew from "../views/CoinsNew.vue";
import CoinsShow from "../views/CoinsShow.vue";
import CoinsEdit from "../views/CoinsEdit.vue";
import UserCoinsIndex from "../views/UserCoinsEdit.vue";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/",
  //   name: "Home",
  //   component: Home,
  // },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  { path: "/", name: "signup", component: Signup },
  { path: "/login", name: "login", component: Login },
  { path: "/logout", name: "logout", component: Logout },
  { path: "/index", name: "coins-index", component: CoinsIndex },
  { path: "/coins/new", name: "coins-new", component: CoinsNew },
  { path: "/coins/:id", name: "coins-show", component: CoinsShow },
  { path: "/coins/:id/edit", name: "coins-edit", component: CoinsEdit },
  { path: "/usercoins", name: "usercoins-index", component: UserCoinsIndex },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
