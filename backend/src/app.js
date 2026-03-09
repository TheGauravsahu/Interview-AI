import express from "express";
import authRouter from "./routes/auth.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import env from "./config/env.js";
import interviewRouter from "./routes/interview.js";
import morgan from "morgan";

const app = express();

//* middlewares
app.use(express.json());
app.use(helmet());
app.use(cookieParser());
app.use(cors({ origin: env.FRONTEND_URL, credentials: true }));
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  return res.status(200).json({
    status: "ok",
    message: "🚀 Server is running successfully.",
  });
});

//* Routes
app.use("/api/auth", authRouter);
app.use("/api/interviews", interviewRouter);

app.use(errorMiddleware);

export default app;
