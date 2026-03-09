import { interviewReportModel } from "../models/interviewReport.js";
import { generateResumeAI } from "./ai.js";
import { generatePDF } from "../utils/pdf.js";

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

  /**
   * @name generateResumePDF
   * @description Generate resume pdf based on interview report id using AI service
   * @param {*} id
   * @returns pdfBuffer
   */
  async generateResumePDF(id) {
    const interviewReport = await interviewReportModel.findById(id);
    if (!interviewReport)
      throw new InterviewError("Interview report not found", 404);
    const { resume, selfDescription, jobDescription } = interviewReport;
    const content = await generateResumeAI({
      resume,
      selfDescription,
      jobDescription,
    });
    const pdfBuffer = await generatePDF(content.html);
    return pdfBuffer;
  }
}

export const interviewService = new InterviewService();
