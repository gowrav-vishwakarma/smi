import { CreateQuestionDTO } from "@/dto/request/create-question.dto";
import { FilterQuestionsDTO } from "@/dto/request/question-filter.dto";
import QuestionDetailResponseDTO from "@/dto/response/question-detail-response.dto";
import QuestionListResponseDTO from "@/dto/response/question-list-response.dto";
import APIService from "./http-common";

class QuestionsAPIService extends APIService {
  async getQuestions(
    filter: FilterQuestionsDTO | Record<string, never>
  ): Promise<QuestionListResponseDTO[]> {
    const response = await this.axiosCall<QuestionListResponseDTO[]>({
      method: "GET",
      url: "/questions",
    });
    return response;
  }

  async getQuestion(id: string): Promise<QuestionDetailResponseDTO> {
    const response = await this.axiosCall<QuestionDetailResponseDTO>({
      method: "GET",
      url: `/questions/${id}`,
    });
    return response;
  }

  async createQuestion(): Promise<any> {
    const response = await this.axiosCall<any>(
      {
        method: "POST",
        url: "/questions",
      },
      CreateQuestionDTO,
      QuestionListResponseDTO
    );
    return response;
  }
}

export default new QuestionsAPIService();
