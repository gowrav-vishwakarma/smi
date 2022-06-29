import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import store from "../store/index";

Vue.use(VueRouter);
const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView,
        meta: {
            requiresAuth: false,
        },
    },
    {
        path: "/login",
        name: "login",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/Login.vue"),
        meta: {
            requiresAuth: false,
        },
    },
    {
        path: "/register",
        name: "register",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/Register.vue"),
        meta: {
            requiresAuth: false,
        },
    },
    {
        path: "/question/:id",
        name: "QuestionDetails",

        component: () => import("../views/QuestionDetail.vue"),
        meta: {
            requiresAuth: false,
        },
    },
    {
        path: "/ask-question",
        name: "AskQuestion",

        component: () => import("../views/AskQuestion.vue"),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/profile",
        name: "Profile",

        component: () => import("../views/Profile/My.vue"),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/userprofile/:id",
        name: "User-Profile",

        component: require("../views/Profile/Others.vue").default,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/solution-attempt/:id",
        name: "SolutionAttempt",

        component: () => import("../views/SolutionAttempt.vue"),
        meta: {
            requiresAuth: true,
        },
    },

    {
        path: "/error",
        name: "Error 500",

        component: () => import("../components/Errors/500.vue"),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/test-page",
        name: "TestPage",

        component: () => import("../views/TestPage.vue"),
        meta: {
            requiresAuth: true,
        },
    },
];

const router = new VueRouter({
    routes,
});

const isAuthenticated = () => {
    if (store.state.currentUser != null) return true;

    return false;
};

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (isAuthenticated()) {
            next();
        } else {
            next("/login");
        }
    } else {
        next();
    }
});

export default router;
