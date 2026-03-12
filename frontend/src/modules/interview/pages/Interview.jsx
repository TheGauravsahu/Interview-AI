import { useInterview } from "../hooks/useInterview";
import { Link, useParams } from "react-router";
import LoadingScreen from "../../../components/LoadingScreen";
import ErrorOccurred from "../../../components/ErrorOccurred";
import {
  RiAiGenerate2Line,
  RiExpandLeftRightLine,
  RiChat4Line,
  RiSendPlaneLine,
} from "@remixicon/react";
import { useState } from "react";
import { cn } from "../../../lib/utils.js";
import AiReport from "../components/AiReport.jsx";
import QuestionCard from "../components/QuestionCard.jsx";
import GradiantText from "../../../components/GradiantText.jsx";
import RoadMapDay from "../components/RoadMapDay.jsx";
import NoQuestionFound from "../components/NoQuestionFound.jsx";
import Badge from "../components/Badge.jsx";
import MatchScore from "../components/MatchScore.jsx";

import DownloadDropown from "../components/DownloadDropown.jsx";

const NAV_ITEMS = [
  {
    id: "aiReport",
    label: "AI Report",
    icon: <RiAiGenerate2Line className="w-5" />,
  },

  {
    id: "technical",
    label: "Technical Questions",
    icon: <RiExpandLeftRightLine className="w-5" />,
  },
  {
    id: "behavioral",
    label: "Behavioral Questions",
    icon: <RiChat4Line className="w-4" />,
  },
  {
    id: "roadmap",
    label: "Road Map",
    icon: <RiSendPlaneLine className="w-4" />,
  },
];

export default function Interview() {
  const [activeNav, setActiveNav] = useState("aiReport");
  const { id } = useParams();
  const { data, isLoading, error } = useInterview(id);
 

  if (isLoading) return <LoadingScreen />;
  if (error) return <ErrorOccurred error={error.message} />;

  const interview = data.data;

  return (
    <div className="h-screen w-full flex items-center justify-center ">
      {/* CARD */}
      <div className="bg-[#141A22] max-w-6xl mx-auto border border-gray-600 rounded-lg h-[90vh] flex  overflow-hidden">
        {/* LEFT SIDEBAR(NAV ITEMS) */}
        <div className="border-r border-gray-600 h-full w-56 p-4 flex flex-col justify-between">
          {/* top */}
          <div>
            <Link
              to="/"
              className="text-gray-600 tracking-wide font-bold  text-xs  px-2"
            >
              HOME
            </Link>
            <div className="mt-4 space-y-1">
              {NAV_ITEMS.map((i) => (
                <div
                  key={i.id}
                  onClick={() => setActiveNav(i.id)}
                  className={cn(
                    "flex items-center  px-2 gap-2 text-sm w-full py-1 cursor-pointer font-semibold hover:scale-95 transition",
                    i.id === activeNav
                      ? "text-fuchsia-400 bg-fuchsia-700/50 border-fuchsia-900 rounded-lg "
                      : "text-white",
                  )}
                >
                  {i.icon}
                  <span>{i.label}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Download/Print */}
         <DownloadDropown id={id} />
        </div>

        {/* CENTER */}
        {activeNav === "aiReport" && <AiReport report={interview.report} />}

        {activeNav === "technical" && (
          <section className="overflow-y-scroll p-4 flex-1">
            <span className="border-gray-700 border-b pb-4 flex items-end gap-4">
              <GradiantText>Technical Questions</GradiantText>
              <span className="border border-gray-600 text-gray-400 text-xs rounded-full px-2 p-1 flex items-center justify-center bg-gray-800">
                {interview.technicalQuestions.length} questions
              </span>
            </span>

            <div className="flex flex-col gap-4  mt-4">
              {interview.technicalQuestions.map((tq, i) => (
                <QuestionCard key={i} q={tq} i={i} />
              ))}
            </div>
          </section>
        )}

        {activeNav === "behavioral" && (
          <section className="overflow-y-scroll p-4 flex-1 w-4xl">
            <span className="border-gray-700 border-b pb-4 flex items-end gap-4">
              <GradiantText>Behavioral Questions</GradiantText>
              <span className="border border-gray-600 text-gray-400 text-xs rounded-full px-2 p-1 flex items-center justify-center bg-gray-800">
                {interview.behavioralQuestions.length} questions
              </span>
            </span>

            <div className="flex flex-col gap-4  mt-4">
              {interview.behavioralQuestions.length > 0 ? (
                interview.behavioralQuestions.map((tq, i) => (
                  <QuestionCard key={i} q={tq} i={i} />
                ))
              ) : (
                <NoQuestionFound />
              )}
            </div>
          </section>
        )}

        {activeNav === "roadmap" && (
          <section className="overflow-y-scroll p-4 flex-1 px-12">
            <span className="border-gray-700 border-b pb-4 flex items-end gap-4">
              <GradiantText>Preparation Roadmap</GradiantText>
              <span className="border border-gray-600 text-gray-400 text-xs rounded-full px-2 p-1 flex items-center justify-center bg-gray-800">
                {interview.preparationPlan.length}-days plan
              </span>
            </span>

            <div className="flex flex-col gap-6  mt-8">
              <ol class="relative border-s border-fuchsia-600 border-default">
                {interview.preparationPlan.map((day) => (
                  <li class="mb-10 ms-4">
                    <div class="absolute w-4 h-4 bg-neutral-quaternary rounded-full mt-1.5 -inset-s-2 border-fuchsia-600 border border-buffer"></div>
                    <RoadMapDay day={day} />
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {/* RIGHT SIDEBAR */}
        <div className="border-l border-gray-600 h-full w-56 p-4 overflow-y-scroll">
          {/* header */}
          <div>
            <h2 className="text-gray-500 tracking-wide font-semibold">
              MATCH SCORE
            </h2>
            <MatchScore matchScore={interview.matchScore} />
          </div>

          {/* SKILL GAP */}
          <div className="mt-4">
            <h2 className="text-gray-500 tracking-wide font-semibold">
              SKILL GAPS
            </h2>
            <div className="flex  justify-center flex-col gap-2 py-4">
              {interview.skillGaps.map((sg, i) => (
                <Badge
                  className={cn(
                    sg.severity === "high"
                      ? "bg-amber-700/50 text-red-400 border-amber-900"
                      : sg.severity === "medium"
                        ? "bg-yellow-700/50 text-yellow-400 border-yellow-900"
                        : "bg-green-700/50 text-green-400 border-green-900",
                  )}
                  key={i}
                >
                  {sg.skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
