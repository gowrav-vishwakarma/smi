import LoginDTO from "@/dto/request/login.dto";
import RegisterUserDTO from "@/dto/request/register.dto";
import LoginResponseDTO from "@/dto/response/login-response.dto";
import RegisterUserResponseDTO from "@/dto/response/register-response.dto";
import APIService from "./http-common";

class UserAPIService extends APIService {
  async login(loginDetail: LoginDTO): Promise<LoginResponseDTO> {
    const response = await this.axiosCall<LoginResponseDTO>(
      {
        method: "POST",
        url: "/auth/login",
        data: loginDetail,
      },
      LoginDTO,
      LoginResponseDTO
    );
    return response;
  }

  async register(
    registerDetail: RegisterUserDTO
  ): Promise<RegisterUserResponseDTO> {
    const response = await this.axiosCall<RegisterUserResponseDTO>(
      {
        method: "POST",
        url: "/auth/register",
        data: registerDetail,
      },
      RegisterUserDTO
    );
    return response;
  }
}

export default new UserAPIService();
