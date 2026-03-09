import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function AiReport({ report }) {
  return (
    <div className="flex-1 overflow-y-scroll p-8 hide-scrollbar">
      <div className="prose prose-invert">
        <div className="border-b pb-2 border-gray-600 mb-4">
          <h1 className="text-xl font-bold">
            Your Custom{" "}
            <span className="bg-linear-to-b from-fuchsia-200 to-fuchsia-700 bg-clip-text text-transparent">
              Detailed Report
            </span>
          </h1>
        </div>

        <ReactMarkdown remarkPlugins={[remarkGfm]}>{report}</ReactMarkdown>
      </div>
    </div>
  );
}
