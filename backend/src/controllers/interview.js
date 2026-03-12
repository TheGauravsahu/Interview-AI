import { PDFParse } from "pdf-parse";
import logger from "../config/logger.js";
import { generateInterviewReportAI } from "../services/ai.js";
import { interviewReportModel } from "../models/interviewReport.js";
import { interviewService } from "../services/interview.js";

/**
 * @name InterveiwController
 * @description Class for all the methods for interview controller
 * @access public
 */
class InterviewController {
  /**
   * @name generateInterviewReportController
   * @description Generates the interview for a user based on the given data
   * @access private
   */
  async generateInterviewReport(req, res, next) {
    const file = req.file;
    let content;
    if (file) {
      const { text } = await new PDFParse(
        Uint8Array.from(file.buffer),
      ).getText();
      content = text;
    }

    const { selfDescription, jobDescription } = req.body;
    logger.info(
      "GENERATING REPORT WITH: ",
      { selfDescription, jobDescription },
      req.user,
    );

    try {
      const aiResponse = await generateInterviewReportAI({
        resume: content,
        selfDescription,
        jobDescription,
      });

      const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: content,
        selfDescription,
        jobDescription,
        ...aiResponse,
      });

      return res.status(201).json({
        status: "success",
        message: "Interview report generated successfully.",
        data: interviewReport,
      });
    } catch (e) {
      next(e);
    }
  }

  /**
   * @name getInterviewReportByIdController
   * @description Get the interview Report Details based on the given id
   * @access private
   */
  async getInterviewReportById(req, res, next) {
    const { id } = req.params;
    try {
      const data = await interviewService.getInterviewReportById(
        id,
        req.user.id,
      );
      return res.status(200).json({
        status: "success",
        message: "Successfully fetched interview report details.",
        data,
      });
    } catch (e) {
      next(e);
    }
  }

  /**
   * @name getRecentInterviewsReportsController
   * @description Get the recent interview Report Details of user
   * @access private
   */
  async getRecentInterviewsReports(req, res, next) {
    try {
      const data = await interviewService.getRecentInterviewsReports(
        req.user.id,
      );
      return res.status(200).json({
        status: "success",
        message: "Successfully fetched recent interview reports.",
        data,
      });
    } catch (e) {
      next(e);
    }
  }

  /**
   * @name generateResumeController
   * @description Generate resume pdf based on interview report id using AI service
   * @access private
   */
  async generateResume(req, res, next) {
    try {
      const data = await interviewService.generateResume(req.params.id);
      return res.status(200).json({
        status: "success",
        message: "Successfully generated resume.",
        data,
      });
    } catch (e) {
      next(e);
    }
  }
}

export const interviewController = new InterviewController();
