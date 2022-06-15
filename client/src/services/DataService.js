import http from "../http-common.js";

class DataService {
    Register(data) {
        return http.post(`/users/register`, data);
    }
    Login(data) {
        return http.post(`/users/login`, data);
    }
    CreateQuestion(data, video = null, progressCallBack) {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });
        if (video) {
            formData.append("video", video);
        }
        return http.post(`/questions/create`, formData, {
            headers: {
                "Content-type": "multipart/form-data",
            },
            progressCallBack,
        });
    }

    CreateOffer(data) {
        return http.post("/offer/add", data);
    }

    GetAllOffer(idQ) {
        const query = {
            Q_id: idQ,
        };
        return http.get(`/offer/`, {
            params: query,
        });
    }

    DelOffer(id) {
        const query = {
            O_id: id,
        };
        return http.delete(`/offer/delC/`, {
            params: query,
        });
    }

    CreateCommunityAns(data) {
        return http.post("/comment/add", data);
    }
    GetCommunityAns(idQ) {
        const query = {
            Q_id: idQ,
        };
        return http.get(`/comment/`, {
            params: query,
        });
    }

    DelCommunityAns(C_id) {
        const query = {
            Cd: C_id,
        };
        return http.delete(`/comment/delC/`, {
            params: query,
        });
    }

    getQuestions(filter, page, limit, sort) {
        const topics = filter.topics || [];
        const languages = filter.languages || [];
        const tags = filter.tags || [];

        const isPaid =
            filter.isPaid === true
                ? true
                : filter.isPaid === false
                ? false
                : undefined;

        const query = {
            topics,
            languages,
            tags,
            isPaid,
            page,
            limit,
            sort,
        };

        return http.get(`/questions`, {
            params: query,
        });
    }

    getSolutionAttemptId(offerId) {
        return http.post(`/solution/create`, {
            offerId,
        });
    }

    RatingUpdate(userId,rating,isQuestioner) {
         return http.post(`/solution/rating`, {
            userId,rating,isQuestioner
        });
    }

    getSolutionDetails(solutionId) {
        const query = {
            solutionId,
        }
        return http.get(`/solution/`, {
            params:query,
        });
    }

    getQuestionDetails(id) {
        return http.get(`/questions/${id}`);
    }

    getUserbyId(userId) {
        const query = {
            userId,
        }
        return http.get(`/users/idby/`, {
            params:query,
        });
    }

    editUserbyId(data,id) {
        return http.put(`/users/editU/`, {
            data,id
        });
    }
}
export default new DataService();
