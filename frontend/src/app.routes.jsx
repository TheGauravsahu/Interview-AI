import { createBrowserRouter } from "react-router";
import Signin from "./modules/auth/pages/Signin";
import Signup from "./modules/auth/pages/Signup";
import Protected from "./modules/auth/components/Protected";
import Home from "./modules/interview/pages/Home";
import Interview from "./modules/interview/pages/Interview";

export const router = createBrowserRouter([
  {
    path: "/sign-in",
    element: <Signin />,
  },
  {
    path: "/sign-up",
    element: <Signup />,
  },
  {
    path: "/",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: "/interviews/:id",
    element: (
      <Protected>
        <Interview />
      </Protected>
    ),
  },
]);
