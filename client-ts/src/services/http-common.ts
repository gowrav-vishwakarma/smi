import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { ClassConstructor, plainToClass } from "class-transformer";
import { validate } from "class-validator";

export const validatorDto = async <T extends ClassConstructor<any>>(
  dto: T,
  obj: Record<string, unknown>
) => {
  // tranform the literal object to class object
  const objInstance = plainToClass(dto, obj);
  // validating and check the errors, throw the errors if exist
  const errors = await validate(objInstance);
  // errors is an array of validation errors
  if (errors.length > 0) {
    console.error(errors);
    throw new TypeError(
      `validation failed. The error fields : ${errors.map(
        ({ property, children }) =>
          children?.length ? property + "." + children[0].property : property
      )}`
    );
  }

  return objInstance;
};

export default class APIService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.VUE_APP_SERVER_URL,
      headers: {
        "Content-type": "application/json",
      },
    });
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
