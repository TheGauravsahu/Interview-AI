import { InterviewError } from "../utils/interviewError.js";
import jwt from "jsonwebtoken";
import env from "../config/env.js";
import { tokenBlacklistModel } from "../models/blacklist.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies["jwt"];
  if (!token) next(new InterviewError("Token not provided", 401));

  const isBlacklistedToken = await tokenBlacklistModel.findOne({ token });
  if (isBlacklistedToken)
    next(new InterviewError("Token is invalid."));

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    req.user = decoded;
    next()
  } catch (e) {
    next(new InterviewError("Invalid token", 401));
  }
};
