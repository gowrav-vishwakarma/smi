import { validatorDto } from "@/helper/validateDto";
import { AuthStoreModule } from "@/store";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { ClassConstructor } from "class-transformer";

export default class APIService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.VUE_APP_SERVER_URL,
      headers: {
        "Content-type": "application/json",
      },
    });

    this.axiosInstance.interceptors.request.use(
      async (config) => {
        const token = AuthStoreModule.isAuthenticated
          ? AuthStoreModule.token
          : null;
        if (token) {
          if (config && config.headers) {
            config.headers.Authorization = "Bearer " + token;
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  protected async axiosCall<T>(
    config: AxiosRequestConfig,
    requestDtoToValidate?: ClassConstructor<any>,
    responseDtoToValidate?: ClassConstructor<any>
  ): Promise<T | any> {
    // try {
    if (requestDtoToValidate) {
      config.data = await validatorDto(requestDtoToValidate, config.data);
    }
    const response = await this.axiosInstance.request<T>(config);
    if (responseDtoToValidate) {
      const validated = await validatorDto(
        responseDtoToValidate,
        response.data as Record<string, unknown>
      );
      return validated;
    }
    return response.data;
    // } catch (error) {
    // throw error;
    // return error;
    // }
  }
}

// axiosInstance.interceptors.request.use(
//     async (config) => {
//         var token = store.state.currentUser && store.state.currentUser.token;
//         if (token) {
//             config.headers.Authorization = "Bearer " + token;
//         }

//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );
