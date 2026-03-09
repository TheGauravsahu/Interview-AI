import { useMutation } from "@tanstack/react-query";
import { interviewApi } from "../services/interview.api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export const useGenerateInterview = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["generate-interview"],
    mutationFn: interviewApi.generateInterview,
    onSuccess: (res) => {
      toast.success(res.message);
      navigate("/interviews/" + res.data._id);
    },
  });
};
