import http from "../http-common.js";

class DataService {
    Register(data) {
        return http.post(`/users/register`, data);
    }
    Login(data) {
        return http.post(`/users/login`, data);
    }
    CreateQuestion(data, video = null) {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });
        if (video) {
            formData.append("video", video);
        }
        return http.post(`/questions/create`, formData, {
            headers: {
                "Content-type": "multipart/form-data",
            },
        });
    }
}
export default new DataService();
