import { createRouter, createWebHashHistory } from "vue-router";
import MainLayout from "@/layouts/MainLayout.vue";
import Dashboard from "@/views/DashboardView.vue";
import Manage from "@/views/ManageView.vue";
import Task from "@/views/TaskView.vue";
import Activity from "@/views/ActivityView.vue";
import Mapping from "@/views/MappingView.vue";
import SetDay from "@/views/SetDayView.vue";
import Login from "@/views/LoginView.vue";
import DataEmployee from "../components/DataEmployee.vue";
import Approval from "@/views/ApprovalView.vue";
import RequestPermit from "@/views/RequestPermitView.vue";
import Overtime from "@/views/OvertimeView.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: '/manage',
    component: MainLayout,
    children: [
      {
        path: '/manage/data',
        name: 'DataEmployee',
        component: DataEmployee
      },
      {
        path: "/manage/approval",
        name: "Approval",
        component: Approval
      },
      {
        path: "/manage/request",
        name: "RequestPermit",
        component: RequestPermit
      },
      {
        path: "/manage/overtime",
        name: "Overtime",
        component: Overtime
      }
    ]
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { layout: MainLayout }
  },
  {
    path: "/manage",
    name: "Manage",
    component: Manage,
    meta: { layout: MainLayout }
  },
  {
    path: "/task",
    name: "Task",
    component: Task,
    meta: { layout: MainLayout }
  },
  {
    path: "/activity",
    name: "Activity",
    component: Activity,
    meta: { layout: MainLayout }
  },
  {
    path: "/mapping",
    name: "Mapping",
    component: Mapping,
    meta: { layout: MainLayout }
  },
  {
    path: "/setday",
    name: "SetDay",
    component: SetDay,
    meta: { layout: MainLayout }
  },
  // {
  //   path: "/manage/data",
  //   name: "DataEmployee",
  //   component: DataEmployee,
  //   meta: { layout: MainLayout }
  // },
  // {
  //   path: "/manage/approval",
  //   name: "Approval",
  //   component: Approval,
  //   meta: { layout: MainLayout }
  // },
  // {
  //   path: "/manage/request",
  //   name: "RequestPermit",
  //   component: RequestPermit,
  //   meta: { layout: MainLayout }
  // },
  // {
  //   path: "/manage/overtime",
  //   name: "Overtime",
  //   component: Overtime,
  //   meta: { layout: MainLayout }
  // },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  if (to.meta.layout) {
    to.matched.forEach(record => {
      record.components.default = to.meta.layout;
    });
  }
  next();
});

export default router;