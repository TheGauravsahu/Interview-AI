import React from "react";
import { cn } from "../../../lib/utils";

export default function MatchScore({ matchScore }) {
  return (
    <div className="flex items-center justify-center flex-col  border-b border-gray-600  py-4">
      <div
        className={cn(
          "border-4 rounded-full w-28 h-28 flex items-center justify-center",
          matchScore >= 80
            ? "border-green-500"
            : matchScore >= 60
              ? "border-yellow-500"
              : "border-red-500",
        )}
      >
        <span className="text-3xl font-bold">{matchScore}</span>
      </div>
      <span
        className={cn(
          matchScore >= 80
            ? "text-green-400"
            : matchScore >= 60
              ? "text-yellow-400"
              : "text-red-400",
        )}
      >
        {matchScore >= 80
          ? "Strong match for this"
          : matchScore >= 60
            ? "Moderate match for this"
            : "Needs improvement"}
      </span>
    </div>
  );
}
