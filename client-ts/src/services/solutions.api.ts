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

  async createSolutionRating(ratingParam: {
    rating: number;
    comment: string;
    solutionAttemptId: string;
  }): Promise<any> {
    console.log("Rating Data", ratingParam);
    return await this.axiosCall<any>({
      method: "POST",
      url: "/solution-attempt/createrating",
      data: ratingParam,
    });
  }
}

export default new SolutionsAPIService();
