import axios from "axios";
export default axios.create({
    baseURL: process.env.VUE_APP_SERVICE_URL,
    headers: {
        "Content-type": "application/json",
    },
});
