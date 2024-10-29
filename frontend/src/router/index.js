import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/LoginPage.vue";
import RegisterPage from '../views/RegisterPage.vue';
import DashboardPage from "../views/DashboardPage.vue";
import TicketDetailPage from '../views/TicketDetailPage.vue';
import UpdateTicketPage from "../views/UpdateTicketPage.vue";
import AddTicketPage from "../views/AddTicketPage.vue";
import SearchResultPage from "../views/SearchResultPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      name: "Login",
      component: LoginPage,
    },
    {
      path: "/register",
      name: "Register",
      component: RegisterPage,
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: DashboardPage,
    },
    {
      path: "/ticket-detail/:ticketId",
      name: "TicketDetail",
      component: TicketDetailPage,
    },
    {
      path: "/ticket-update/:ticketId", 
      name: "UpdateTicket",
      component: UpdateTicketPage,
    },
    {
      path: "/add-ticket",
      name: "AddTicketPage",
      component: AddTicketPage, 
    },
    {
      path: "/search-result",
      name: "SearchResultPage",
      component: SearchResultPage, 
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notfound",
      redirect: "/",
    },
  ],
});

export default router;

