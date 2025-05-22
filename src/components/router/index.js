import { createRouter, createWebHistory } from "vue-router";
import { useDefaultStore } from "../store/defaultState";
import HomePageView from "../views/HomePageView.vue";
import AboutPageView from "../views/AboutPageView.vue";
import ContactPageView from "../views/ContactPageView.vue";
import LoginPageView from "../views/LoginPageView.vue";
import AdminReservationView from "../views/AdminReservationView.vue";
import AdminUserView from "../views/AdminUserView.vue";
import InqueriesView from "../views/InqueriesView.vue";
import NotFoundView from "../views/NotFoundView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePageView,
  },
  {
    path: "/about",
    name: "About",
    component: AboutPageView,
  },
  {
    path: "/contact",
    name: "Contact",
    component: ContactPageView,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPageView,
  },
  {
    path: "/admin/reservations",
    name: "AdminReservation",
    component: AdminReservationView,
    meta: { requiresAuth: true, role: "admin" },
  },
  {
    path: "/admin/users",
    name: "AdminUser",
    component: AdminUserView,
    meta: { requiresAuth: true, role: "admin" },
  },
  {
    path: "/admin/inqueries",
    name: "AdminInqueries",
    component: InqueriesView,
    meta: { requiresAuth: true, role: "admin" },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFoundView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const store = useDefaultStore();

  if (to.meta.requiresAuth) {
    if (!store.isLogged) {
      return next({ name: "Login" });
    }

    if (to.meta.role && store.role !== to.meta.role) {
      return next({ name: "Home" });
    }
  }

  next();
});

export default router;
