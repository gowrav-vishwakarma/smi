import CreateSolutionAttemptDTO from "@/dto/request/create-solution-attempt.dto";
import APIService from "./http-common";

class SolutionsAPIService extends APIService {
  async createSolutionAttempt(
    solutionAttempt: CreateSolutionAttemptDTO
  ): Promise<any> {
    return await this.axiosCall<any>({
      method: "POST",
      url: "/solution-attempt/create",
      data: solutionAttempt,
    });
  }
}

export default new SolutionsAPIService();
