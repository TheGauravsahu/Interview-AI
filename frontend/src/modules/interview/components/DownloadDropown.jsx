import Button from "../../../components/Buttton.jsx";
import { RiCloseLine, RiSparkling2Line } from "@remixicon/react";
import { useGenerateResumePDF } from "../hooks/useGenerateResumePDF.js";
import { usePrintResumePDF } from "../hooks/usePrintResumePDF.js";
import { useState } from "react";

export default function DownloadDropown({ id }) {
  const generateResume = useGenerateResumePDF(id);
  const printResume = usePrintResumePDF(id);

  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button
        onClick={() => setOpen(!open)}
        className="w-full  bg-linear-to-b px-2 rounded-lg from-fuchsia-400 to-fuchsia-800 hover:from-fuchsia-600 hover:to-fuchsia-800  transition-all tracking-tight font-semibold"
      >
        <RiSparkling2Line className="w-4 h-4" />
        Download Resume
      </Button>

      {open && (
        <div className="w-64 h-48 p-4 border border-gray-800 bg-[#0D0F13] absolute rounded-lg bottom-28 left-12 ">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-1 right-3 cursor-pointer"
          >
            <RiCloseLine className="w-5 h-5" />
          </button>

          <div className="mt-5">
            <Button
              isLoading={generateResume.isPending}
              loadingText="Downloading...."
              onClick={() => generateResume.mutate()}
              className="w-full bg-green-800/50 text-green-400 tracking-tight font-semibold"
            >
              Download Resume
            </Button>

            <div className="w-full flex items-center  justify-center gap-2">
              <span className="border-[0.1px] border-gray-700 w-full" />
              <span className="text-gray-400">OR</span>
              <span className="border-[0.1px] border-gray-700 w-full" />
            </div>

            <Button
              isLoading={printResume.isPending}
              loadingText="Printing...."
              onClick={() => printResume.mutate()}
              className="w-full bg-amber-800/50 text-amber-400 tracking-tight font-semibold"
            >
              Print Resume
            </Button>
            <span className="text-xs text-gray-700  w-full mt-1">
              (better quality)
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
