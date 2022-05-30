import http from '../http-common.js'

class DataService {
  Register(data) {
    return http.post(`/users/register`, data);
  }
  Login(data) {
    return http.post("/login", data);
  }
  
}
export default new DataService();

