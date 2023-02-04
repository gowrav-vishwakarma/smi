// import TopicListResponseDTO from "@/dto/response/question-detail-response.dto";
import APIService from "./http-common";

class TopicAPIService extends APIService {
  async getTopics(): Promise<any> {
    const response = await this.axiosCall<any>({
      method: "GET",
      url: `/topics/list`,
    });
    return response;
  }
}

export default new TopicAPIService();
