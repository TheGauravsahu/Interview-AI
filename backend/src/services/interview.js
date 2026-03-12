import { interviewReportModel } from "../models/interviewReport.js";
import { generateResumeAI } from "./ai.js";
import { InterviewError } from "../utils/interviewError.js";

class InterviewService {
  async getInterviewReportById(id, userId) {
    const interviewReport = await interviewReportModel.findById(id);
    if (!interviewReport)
      throw new InterviewError("Interview report not found", 404);
    if (interviewReport.user.toString() !== userId) {
      throw new InterviewError("Unauthorized access to interview report", 403);
    }
    return interviewReport;
  }

  async getRecentInterviewsReports(userId) {
    return await interviewReportModel
      .find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5);
  }

  /**
   * @name generateResume
   * @description Generate resume based on interview report id using AI service
   * @param {*} id
   * @returns pdfBuffer
   */
  async generateResume(id) {
    const interviewReport = await interviewReportModel.findById(id);
    if (!interviewReport)
      throw new InterviewError("Interview report not found", 404);
    const { resume, selfDescription, jobDescription } = interviewReport;
    const content = await generateResumeAI({
      resume,
      selfDescription,
      jobDescription,
    });
    return content.html;
  }
}

export const interviewService = new InterviewService();
