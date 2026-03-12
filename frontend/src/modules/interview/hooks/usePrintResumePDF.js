import { useMutation } from "@tanstack/react-query";
import { interviewApi } from "../services/interview.api";
import toast from "react-hot-toast";

export const usePrintResumePDF = (id) =>
  useMutation({
    mutationFn: () => interviewApi.generateResume(id),
    onSuccess: async (res) => {
      try {
        const printWindow = window.open("", "_blank");
        const html = res.data;

        if (!printWindow) {
          toast.error("Popup blocked by browser");
          return;
        }
        printWindow.document.write(html);
        printWindow.document.close();
        printWindow.print();
        toast.success("Resume PDF generated successfully");
      } catch (err) {
        toast.error("Failed to generate resume PDF");
        console.error(err);
      }
    },
  });
