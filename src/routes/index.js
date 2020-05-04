import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import Home from "@/views/Home";
import Todo from "@/views/Todo";

const routes = [
  { path: "/", component: Home },
  { path: "/:route", component: Todo, props: true },
];

const router = new Router({ routes });

export default router;
