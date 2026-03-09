import { RiArrowDownSLine, RiArrowUpSLine } from "@remixicon/react";
import Badge from "../components/Badge";
import { useState } from "react";

export default function QuestionCard({ q, i }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-[#1B212F]  rounded-lg border border-gray-700 p-4 overflow-y-scroll">
      {/* header   */}
      <div
        onClick={() => setOpen(!open)}
        className=" flex gap-4 items-start  justify-between cursor-pointer"
      >
        <Badge>Q{i + 1}</Badge>
        <h3 className="text-white">{q.question}</h3>
        {open ? (
          <RiArrowUpSLine
            className="w-12 text-fuchsia-400 transition cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        ) : (
          <RiArrowDownSLine
            className="w-12 text-gray-600 cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        )}
      </div>

      {open && (
        <div className="border-t border-gray-600 py-4 pb-2 mt-4 flex flex-col gap-4  justify-center">
          <div>
            <Badge className="text-purple-400 bg-purple-700/50 border-purple-900">
              INTENTION
            </Badge>
            <p className="text-gray-400 text-sm mt-2">{q.intention}</p>
          </div>

          <div>
            <Badge className="text-green-400 bg-green-700/50 border-green-900">
              MODEL ANSWER
            </Badge>
            <p className="text-gray-400 text-sm mt-2">{q.answer}</p>
          </div>
        </div>
      )}
    </div>
  );
}
