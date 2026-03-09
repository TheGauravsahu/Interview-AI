import { useMutation } from "@tanstack/react-query";
import { authApi } from "../services/auth.api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../auth.context.jsx";

export const useSignup = () => {
  const navigate = useNavigate();
  const ctx = useContext(AuthContext);

  const { setUser } = ctx;

  return useMutation({
    mutationKey: "auth-signup",
    mutationFn: authApi.signup,
    onSuccess: (res) => {
      toast.success(res.message);
      setUser(res.data);
      navigate("/");
    },
    onError: () => {
      setUser(null);
    },
  });
};
