import axios from "axios";
import store from "./store";

const api = axios.create({
    baseURL: process.env.VUE_APP_SERVER_URL,
    headers: {
        "Content-type": "application/json",
    },
});

api.interceptors.request.use(
    async (config) => {
        var token = store.state.currentUser && store.state.currentUser.token;
        if (token) {
            config.headers.Authorization = "Bearer " + token;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
