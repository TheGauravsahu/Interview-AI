import { api } from "../../../lib/axios";

class InterviewApi {
  async generateInterview({ jobDescription, selfDescription, resume }) {
    const formData = new FormData();
    formData.append("jobDescription", jobDescription);
    formData.append("selfDescription", selfDescription);
    if (resume) {
      formData.append("resume", resume); // file
    }

    return await api.post("/interviews/generate", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  async getInterview(id) {
    return await api.get("/interviews/" + id);
  }

  async getRecentInterviews() {
    return await api.get("/interviews/recent");
  }
}

export const interviewApi = new InterviewApi();
