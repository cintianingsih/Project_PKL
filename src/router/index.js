import { createRouter, createWebHashHistory } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Manage from "@/views/Manage.vue";
import Task from "@/views/Task.vue";
import Activity from "@/views/Activity.vue";
import Mapping from "@/views/Mapping.vue";
import SetDay from "@/views/SetDay.vue";
import Login from "@/views/LoginView.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/manage",
    name: "Manage",
    component: Manage,
  },
  {
    path: "/task",
    name: "Task",
    component: Task,
  },
  {
    path: "/activity",
    name: "Activity",
    component: Activity,
  },
  {
    path: "/mapping",
    name: "Mapping",
    component: Mapping,
  },
  {
    path: "/setday",
    name: "SetDay",
    component: SetDay,
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
