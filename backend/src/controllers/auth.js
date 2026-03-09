import { authService } from "../services/auth.js";

class AuthController {
  /**
   * @name singupUserController
   * @description Signup a new user, expects username, email and password
   * @access Public
   */
  async signupUser(req, res, next) {
    try {
      const data = await authService.signupUser(req.body);

      return res.status(201).cookie("jwt", data.token).json({
        message: "Signed up successfully",
        status: "success",
        data: data.user,
      });
    } catch (e) {
      next(e);
    }
  }

  /**
   * @name signOutUserController
   * @description Signin  user, expects email and password in req body
   * @access Public
   */
  async signinUser(req, res, next) {
    try {
      const data = await authService.signinUser(
        req.body.email,
        req.body.password,
      );

      return res
        .status(200)
        .cookie("jwt", data.token, {
          httpOnly: true,
          secure: true,
          sameSite: "none", // cross-site cookies
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .json({
          status: "success",
          message: "Signed in successfully.",
          data: data.user,
        });
    } catch (e) {
      next(e);
    }
  }

  /**
   * @name signOutUserController
   * @description Signout  user and clears token
   * @access Public
   */
  async signoutUser(req, res, next) {
    try {
      await authService.signoutUser(req.cookies.jwt);

      return res.status(200).clearCookie("jwt").json({
        status: "success",
        message: "Signed out successfully.",
      });
    } catch (e) {
      next(e);
    }
  }

  /**
   * @name getCurrentUserController
   * @description Get the data of current logged in user
   * @access Private
   */
  async getCurrentUser(req, res, next) {
    try {
      const data = await authService.getCurrentUser(req.user.id);

      return res.status(200).json({
        status: "success",
        message: "Successfully fetched current user.",
        data,
      });
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
