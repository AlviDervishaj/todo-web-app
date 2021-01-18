/* eslint-disable */
import {
    createWebHistory,
    createRouter
} from "vue-router";
// Lazy load 
const Home = import("../views/Home.vue");
const Login = import("../views/Login.vue");
const Signup = import("../views/Signup.vue");
const Todo = import("../views/Todo.vue");

const routes = [{
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/todos",
        name: "Todos",
        component: Todo
    },
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: "/signup",
        name: "Signup",
        component: Signup
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;