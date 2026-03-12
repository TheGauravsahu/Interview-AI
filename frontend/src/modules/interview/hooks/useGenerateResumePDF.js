import { useMutation } from "@tanstack/react-query";
import { interviewApi } from "../services/interview.api";
import toast from "react-hot-toast";
import html2pdf from "html2pdf.js";

export const useGenerateResumePDF = (id) =>
  useMutation({
    mutationFn: () => interviewApi.generateResume(id),
    onSuccess: async (res) => {
      try {
        const html = res.data;

        // PRINT PDF
        // const newWindow = window.open("");
        // newWindow.document.write(html);
        // newWindow.print();

        const element = document.createElement("div");
        element.innerHTML = html;

        html2pdf()
          .from(element)
          .set({
            margin: 10,
            filename: `resume_${id}.pdf`,
            html2canvas: {
              scale: 4, 
              useCORS: true,
              logging: false,
            },
            jsPDF: {
              unit: "mm",
              format: "a4",
              orientation: "portrait",
            },
            pagebreak: { mode: ["avoid-all", "css", "legacy"] },
          })
          .save();

        toast.success("Resume PDF generated successfully");
      } catch (err) {
        toast.error("Failed to generate resume PDF");
        console.error(err);
      }
    },
  });
