import { GoogleGenAI } from "@google/genai";
import env from "../config/env.js";
import logger from "../config/logger.js";
import { InterviewError } from "../utils/interviewError.js";
import { reportSchema, resumeSchema } from "../schemas/interviewReport.js";

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

/**
 * @name generateResumeAI
 * @description Service for generating resume based on resume, selfDescription and jobDescription using AI service
 * @access private
 */
export async function generateResumeAI({
  resume,
  selfDescription,
  jobDescription,
}) {
  const prompt = `
Generate a html of professional resume tailored for the given job description.
The html content should be well-structured, visually appealing, and optimized for both human readers and Applicant Tracking Systems (ATS).
The html can be converted to pdf using any library like puppeteer or html-pdf. The content should be concise and relevant, highlighting the candidate's strengths and suitability for the job.
Generate a concise and impactful resume that highlights the candidate's relevant skills, experiences, and achievements in alignment with the job description.
The resume should be formatted in HTML and should be ATS-friendly, ensuring it can be easily parsed by Applicant Tracking Systems.
The resume should include the following sections:
1. Contact Information: Name, phone number, email address, and LinkedIn profile (if available).
2. Professional Summary: A brief statement summarizing the candidate's qualifications and career goals.
3. Skills: A list of relevant skills categorized by technical and soft skills.
4. Work Experience: Detailed descriptions of previous job roles, responsibilities, and achievements, formatted with bullet points for clarity.
5. Education: Information about academic background, including degrees earned, institutions attended, and graduation dates.


Candidate Data:
Resume:
${resume}
Self Description:
${selfDescription}
Job Description:
${jobDescription}
`;
  try {
    const res = await ai.models.generateContent({
      model: AI_MODEL,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: resumeSchema,
      },
    });

    const result = JSON.parse(res.text);
    return result;
  } catch (e) {
    logger.error("AI Resume Generation Error:", e);
    throw new InterviewError(e.message, 400);
  }
}
