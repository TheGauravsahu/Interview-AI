import express from "express";
import { authMiddleware } from "../middlewares/auth.js";
import { interviewController } from "../controllers/interview.js";
import { uploadFile } from "../middlewares/file.js";
import { reqValidator } from "../middlewares/reqValidator.js";
import { generateReportSchema } from "../schemas/interviewReport.js";

const interviewRouter = express.Router();

/**
 * @route POST /api/interviews
 * @descripton Create generate new interview report
 * based on user self desctiption, resume pdf and job description.
 * @access private
 */
interviewRouter.post(
  "/generate",
  authMiddleware,
  uploadFile.single("resume"),
  reqValidator(generateReportSchema),
  interviewController.generateInterviewReport,
);

/**
 * @route GET /api/interviews/recent
 * @descripton get recent interview reports of user
 * based on userid.
 * @access private
 */
interviewRouter.get(
  "/recent",
  authMiddleware,
  interviewController.getRecentInterviewsReports,
);

/**
 * @route GET /api/interviews/:id
 * @descripton get details of interview report
 * based on id.
 * @access private
 */
interviewRouter.get(
  "/:id",
  authMiddleware,
  interviewController.getInterviewReportById,
);

export default interviewRouter;
