import { GoogleGenAI } from "@google/genai";
import env from "../config/env.js";
import logger from "../config/logger.js";
import { InterviewError } from "../utils/interviewError.js";
import { reportSchema } from "../schemas/interviewReport.js";

const AI_MODEL = "gemini-2.5-flash";

const ai = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
});

/**
 * @name generateInterviewReportAI
 * @description Service for generating interview report based on resume, selfDescription and jobDescription using AI service
 * @param {resume, selfDescription, jobDescription}
 * @access private
 */
export async function generateInterviewReportAI({
  resume,
  selfDescription,
  jobDescription,
}) {
  const prompt = `
Analyze the candidate resume, self description and job description.

Generate an interview preparation report.

The "report" field should contain a detailed Markdown report with sections:
## Candidate Summary
## Match Score Explanation
## Suggested Improvements


Candidate Data:

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`;

  try {
    const response = await ai.models.generateContent({
      model: AI_MODEL,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: reportSchema,
      },
    });

    const result = JSON.parse(response.text);
    logger.info("AI RESULT:", result);

    return result;
  } catch (e) {
    logger.error("AI Generation Error: ", e);
    throw new InterviewError(e.message, 400);
  }
}
