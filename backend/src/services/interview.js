import { interviewReportModel } from "../models/interviewReport.js";

class InterviewService {
  async getInterviewReportById(id) {
    return await interviewReportModel.findById(id);
  }

  async getRecentInterviewsReports(userId) {
    return await interviewReportModel
      .find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5);
  }
}

export const interviewService = new InterviewService();
