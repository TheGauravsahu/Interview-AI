import express from "express";
import { authController } from "../controllers/auth.js";
import { reqValidator } from "../middlewares/reqValidator.js";
import { authMiddleware } from "../middlewares/auth.js";
import { signupSchema, signinSchema } from "../schemas/auth.js";

const authRouter = express.Router();

/**
 * @route POST /api/auth/signUp
 * @description Register a new user
 * @access Public
 */
authRouter.post(
  "/signUp",
  reqValidator(signupSchema),
  authController.signupUser,
);

/**
 * @route POST /api/auth/signIn
 * @description Signin a existing user
 * @access Public
 */
authRouter.post(
  "/signIn",
  reqValidator(signinSchema),
  authController.signinUser,
);

/**
 * @route POST /api/auth/signOut
 * @description Signout a existing user
 * @access Public
 */
authRouter.post("/signOut", authController.signoutUser);

/**
 * @route POST /api/auth/getCurrentUser
 * @description Get the current logged in user info
 * @access Private
 */
authRouter.get(
  "/getCurrentUser",
  authMiddleware,
  authController.getCurrentUser,
);

export default authRouter;
