import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue";
import DeleteGame from "../views/DeleteGame.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
        {
            path: "/",
            name: "Home",
            component: Home
        },
        {
            path: "/delete-page",
            name: "delete-page",
            component: DeleteGame
        },
    ]
})

export default router;