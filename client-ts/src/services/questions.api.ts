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
      method: "POST",
      // method: "GET",
      url: "/questions",
      data: filter,
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

  async createQuestion(
    data: any,
    video: Blob | null,
    onUploadProgress: (progressEvent: ProgressEvent) => void
  ): Promise<any> {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      let v = Array.isArray(value) ? value.join(",") : value;
      if (typeof v === "object") v = JSON.stringify(v);

      formData.append(key, v as string);
    });
    if (video) {
      formData.append("video", video);
    }
    const response = await this.axiosCall<any>(
      {
        method: "POST",
        url: "/questions/create",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
      }
      // CreateQuestionDTO
      // QuestionListResponseDTO
    );
    return response;
  }

  async getOffers(id: string): Promise<any> {
    const response = await this.axiosCall<any>({
      method: "GET",
      url: `/questions/${id}/offers`,
    });
    return response;
  }

  async createOffer(
    questionerId: string,
    questionId: string,
    notes: string,
    solutionChannel: string[]
  ): Promise<any> {
    const response = await this.axiosCall<any>({
      method: "POST",
      url: "/questions/offer-solution",
      data: {
        questionerId,
        questionId,
        notes,
        solutionChannel,
      },
    });
    return response;
  }

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

  async vote(questionId: string, vote: "up" | "down"): Promise<any> {
    const response = await this.axiosCall<any>({
      method: "GET",
      url: "/questions/vote/" + questionId + "/" + vote,
    });
    return response;
  }
}

export default new QuestionsAPIService();
