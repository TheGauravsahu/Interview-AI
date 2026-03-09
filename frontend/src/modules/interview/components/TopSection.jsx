import React from "react";

export default function TopSection() {
  return (
    <div className="flex items-center justify-center flex-col">
      <h1 className="text-4xl font-bold">
        Create Your Custom{" "}
        <span className="bg-linear-to-b from-fuchsia-200 to-fuchsia-700 bg-clip-text text-transparent">
          Interview Plan
        </span>
      </h1>
      <p className="text-gray-400 max-w-xl mx-auto text-center mt-1">
        Let our AI analyze the job requirements and your unique profile to build
        a winning strategy.
      </p>
    </div>
  );
}
