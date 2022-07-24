import { CreateQuestionDTO } from "@/dto/request/create-question.dto";
import { FilterQuestionsDTO } from "@/dto/request/question-filter.dto";
import QuestionDetailResponseDTO from "@/dto/response/question-detail-response.dto";
import QuestionListResponseDTO from "@/dto/response/question-list-response.dto";
import APIService from "./http-common";

class CommentsAPIService extends APIService {
  async getComments(id: string): Promise<any> {
    const response = await this.axiosCall<any>({
      method: "GET",
      url: `/questions/${id}/comments`,
    });
    return response;
  }

  async createComment(questionId: string, comment: string): Promise<any> {
    const response = await this.axiosCall<any>({
      method: "POST",
      url: "/comments/create",
      data: {
        questionId,
        comment,
      },
    });
    return response;
  }

  async vote(commentId: string, vote: "up" | "down"): Promise<any> {
    const response = await this.axiosCall<any>({
      method: "GET",
      url: "/comments/vote/" + commentId + "/" + vote,
    });
    return response;
  }
}

export default new CommentsAPIService();
