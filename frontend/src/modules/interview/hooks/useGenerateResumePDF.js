import { useMutation } from "@tanstack/react-query";
import { interviewApi } from "../services/interview.api";
import toast from "react-hot-toast";

export const useGenerateResumePDF = () =>
  useMutation({
    mutationFn: (id) => interviewApi.generateResumePDF(id),
    onSuccess: (res) => {
      const blob = new Blob([res], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      window.open(url, "_blank");

      toast.success("Resume PDF generated successfully");
    },
  });
