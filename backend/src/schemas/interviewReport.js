import { z } from "zod";

export const generateReportSchema = z.object({
  selfDescription: z.string().optional(),
  jobDescription: z
    .string()
    .min(10, "Job description must be atleast of 10 characeters long."),
});

export const reportSchema = {
  type: "object",
  properties: {
    matchScore: {
      type: "number",
      minimum: 0,
      maximum: 100,
    },
    skillGaps: {
      type: "array",
      items: {
        type: "object",
        properties: {
          skill: { type: "string" },
          severity: { type: "string", enum: ["low", "medium", "high"] },
        },
        required: ["skill", "severity"],
      },
    },
    preparationPlan: {
      type: "array",
      items: {
        type: "object",
        properties: {
          day: { type: "number" },
          focus: { type: "string" },
          tasks: {
            type: "array",
            items: { type: "string" },
          },
        },
        required: ["day", "focus", "tasks"],
      },
    },
    strengths: {
      type: "array",
      items: { type: "string" },
    },
    report: {
      type: "string",
    },
    technicalQuestions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          question: { type: "string" },
          intention: { type: "string" },
          answer: { type: "string" },
        },
        required: ["question", "intention", "answer"],
      },
    },
    behavioralQuestions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          question: { type: "string" },
          intention: { type: "string" },
          answer: { type: "string" },
        },
        required: ["question", "intention", "answer"],
      },
    },
  },
  required: [
    "matchScore",
    "skillGaps",
    "strengths",
    "report",
    "technicalQuestions",
    "behavioralQuestions",
  ],
};


export const resumeSchema = {
  type: "object",
  properties: {
    html: {
      type: "string",
    },
  },
  required: ["html"],
};