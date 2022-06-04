import http from "../http-common.js";

class DataService {
    Register(data) {
        return http.post(`/users/register`, data);
    }
    Login(data) {
        return http.post(`/users/login`, data);
    }
    CreateQuestion(data) {
        return http.post(`/questions/create`, data);
    }
}
export default new DataService();
