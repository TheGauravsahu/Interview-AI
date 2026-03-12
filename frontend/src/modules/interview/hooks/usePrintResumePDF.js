import { useMutation } from "@tanstack/react-query";
import { interviewApi } from "../services/interview.api";
import toast from "react-hot-toast";

export const usePrintResumePDF = (id) =>
  useMutation({
    mutationFn: () => interviewApi.generateResume(id),
    onSuccess: async (res) => {
      try {
        const html = res.data;
        const newWindow = window.open("");
        newWindow.document.write(html);
        newWindow.print();
        toast.success("Resume PDF generated successfully");
      } catch (err) {
        toast.error("Failed to generate resume PDF");
        console.error(err);
      }
    },
  });
