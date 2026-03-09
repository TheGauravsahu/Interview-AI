import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    intention: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const skillGapSchema = new mongoose.Schema(
  {
    skill: {
      type: String,
      required: [true, "Skill is required"],
    },
    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      required: [true, "Severity is required"],
    },
  },
  {
    _id: false,
  },
);

const preparationPlanSchema = new mongoose.Schema(
  {
    day: {
      type: Number,
      required: [true, "Day is required"],
    },
    focus: {
      type: String,
      required: [true, "Focus is required"],
    },
    tasks: [
      {
        type: String,
        required: [true, "Task is required"],
      },
    ],
  },
  { _id: false },
);

const interviewReportSchema = new mongoose.Schema(
  {
    jobDescription: {
      type: String,
      required: [true, "job description is required."],
    },
    resume: {
      type: String,
    },
    selfDescription: {
      type: String,
    },
    report: {
      type: String,
      required: true,
    },
    strengths: {
      type: [String],
    },
    matchScore: {
      type: Number,
      required: true,
    },
    technicalQuestions: [questionSchema],
    behavioralQuestions: [questionSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true },
);

export const interviewReportModel = mongoose.model(
  "interviewReports",
  interviewReportSchema,
);
