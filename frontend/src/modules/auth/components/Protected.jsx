import React, { useContext } from "react";
import { AuthContext } from "../auth.context";
import LoadingScreen from "../../../components/LoadingScreen";
import { Navigate } from "react-router";

export default function Protected({ children }) {
  const ctx = useContext(AuthContext);

  if (ctx.loading) {
    return <LoadingScreen />;
  }

  if (!ctx.user) return <Navigate to={"/sign-in"} />;

  return children;
}
