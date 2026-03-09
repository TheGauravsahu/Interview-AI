import { userModel } from "../models/user.js";
import { tokenBlacklistModel } from "../models/blacklist.js";
import { InterviewError } from "../utils/interviewError.js";
import env from "../config/env.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthService {
  /**
   * @name singupUserService
   * @description Singup  user service, expects username, email and password
   * @access Public
   */
  async signupUser({ username, email, password }) {
    const userExists = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (userExists)
      new InterviewError("User already exits with this email", 400);

    const user = await userModel.create({
      username,
      email,
      password: await bcrypt.hash(password, 10),
    });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    return {
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    };
  }

  /**
   * @name singinUserService
   * @description Singin  user service, expects email and password
   * @access Public
   */
  async signinUser(email, password) {
    const user = await userModel.findOne({ email });
    if (!user) throw new InterviewError("Invalid email or password.", 400);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new InterviewError("Invalid credentials.", 400);

    const token = jwt.sign(
      { id: user._id, username: user.username },
      env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    return {
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    };
  }

  /**
   * @name signoutUserService
   * @description blacklists user token
   * @access Public
   */
  async signoutUser(token) {
    await tokenBlacklistModel.create({ token });
  }

  /**
   * @name getCurrentUserService
   * @description Get the data of current logged in user by id
   * @access Private
   */
  async getCurrentUser(userId) {
    const user = await userModel.findOne({ _id: userId });
    return {
      id: user._id,
      username: user.username,
      email: user.email,
    };
  }
}

export const authService = new AuthService();
