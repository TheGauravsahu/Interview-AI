import {
  RiBriefcase3Line,
  RiSparkling2Line,
  RiUploadCloud2Line,
  RiUserLine,
} from "@remixicon/react";
import Buttton from "../../../components/Buttton";
import Badge from "./Badge";
import Dropzone from "react-dropzone";
import { useState } from "react";
import { useGenerateInterview } from "../hooks/useGenerateInterview";

export default function GenerateInterview() {
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [resume, setResume] = useState(null);

  const generateInterview = useGenerateInterview();

  const handleGenerateReport = async () => {
    await generateInterview.mutateAsync({
      jobDescription,
      selfDescription,
      resume,
    });
    setJobDescription("");
    setSelfDescription("");
    setResume(null);
  };

  return (
    <div className="flex flex-col border bg-[#161A20] items-center justify-center border-gray-700 rounded-xl w-[60vw]  mx-auto h-[75vh] hide-scrollbar ">
      <div className="h-[84%] w-full flex items-center justify-center hide-scrollbar ">
        {/* Left Section */}
        <div className="bg-[#161A20] w-[50%] border-r border-gray-700 h-full p-4 flex flex-col gap-4 ">
          {/* Header */}
          <div className="flex items-center justify-between gap-4">
            <h2 className="flex items-center justify-center font-semibold gap-1">
              <RiBriefcase3Line className="text-fuchsia-500 w-5" />
              Target Job Desctiption
            </h2>
            <Badge>REQUIRED</Badge>
          </div>

          <div className="overflow-hidden relative h-full w-full">
            <textarea
              onChange={(e) => setJobDescription(e.target.value)}
              value={jobDescription}
              maxLength={5000}
              name="jobDescription"
              id="job-description-tag"
              className="w-full h-full  bg-[#1F2435] p-4 border placeholder:text-gray-500 border-gray-700 rounded-lg focus:border-gray-600 outline-gray-600 focus:ring-gray-600 ring-gray-700"
              placeholder="Paste the full job description here...                
            eg. 'Senior Software Engineer at Google requires proficiency in React, Typescript, and large-scale system design...'"
            />
            <span
              className={`text-xs absolute bottom-2 right-2 ${
                jobDescription.length > 4500 ? "text-red-400" : "text-gray-400"
              }`}
            >
              {jobDescription.length}/5000 chars
            </span>
            /5000 chars
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-[#111619] w-[50%] h-full p-4">
          {/* Header */}
          <div>
            <h2 className="flex items-center font-semibold gap-1">
              <RiUserLine className="text-fuchsia-500 w-5" />
              Your Profile
            </h2>

            <span className="flex items-center gap-4 mt-2">
              Upload your resume
              <Badge>BEST RESULTS</Badge>
            </span>
          </div>

          {/* Upload Section */}
          <Dropzone onDrop={(file) => setResume(file[0])}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div
                  {...getRootProps()}
                  className="flex items-center justify-center bg-[#1F2435] mt-4 border border-gray-700 rounded-lg h-32"
                >
                  <input {...getInputProps()} />
                  <div className="flex flex-col items-center">
                    <RiUploadCloud2Line className="text-fuchsia-500 w-8 h-8" />
                    {resume ? (
                      <>
                        <h3 className="text-white font-semibold mt-1">
                          {resume.name}
                        </h3>
                        <span className="text-green-400 text-sm">
                          File selected
                        </span>
                      </>
                    ) : (
                      <>
                        <h3 className="text-white font-semibold">
                          Click to upload or drag & drop
                        </h3>
                        <span className="text-gray-400 text-sm">
                          PDF or DOCX (Max 3MB)
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </section>
            )}
          </Dropzone>

          <div className="w-full flex items-center  justify-center gap-2">
            <span className="border-[0.1px] border-gray-700 w-full" />
            <span className="text-gray-400">OR</span>
            <span className="border-[0.1px] border-gray-700 w-full" />
          </div>

          {/* Self-Description */}
          <div className="">
            <h3 className="font-semibold  text-white">
              Quick Self-Description
            </h3>
            <textarea
              onChange={(e) => setSelfDescription(e.target.value)}
              value={selfDescription}
              name="selfDescription"
              id="self-description"
              className="bg-[#1F2435] h-20 placeholder:text-sm w-full mt-2 p-4 border placeholder:text-gray-500 border-gray-700 rounded-lg focus:border-gray-600 outline-gray-600 focus:ring-gray-600 ring-gray-700"
              placeholder="Briefly describe your experience, key skills, and year of experience if you don't have a resume handy..."
            />
          </div>

          <div className="bg-[#1A2A4B]  flex gap-2 mt-2 border-indigo-400 font-semibold text-gray-500 border p-2 w-full text-xs rounded-lg">
            <span className="text-xs bg-blue-500 h-3 w-4 mt-1 flex items-center justify-center overflow-hidden rounded-full  text-white"></span>
            <h3>
              Either a <span className="text-white">Resume</span> or a{" "}
              <span className="text-white">Self Description</span> is required
              to generate a personalised plan.
            </h3>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between w-full p-8 h-16 border-t border-gray-700">
        <span className="text-gray-400">
          Ai Powered Interview Report Generator - Approx 30s
        </span>
        <Buttton
          isLoading={generateInterview.isPending}
          loadingText="Generating..."
          onClick={() => handleGenerateReport()}
          className="w-xs rounded-lg bg-linear-to-r from-fuchsia-600  to-fuchsia-800"
        >
          <RiSparkling2Line />
          Generate
        </Buttton>
      </div>
    </div>
  );
}
