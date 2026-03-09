import { useRecentInterviews } from "../hooks/useRecentInterviews";
import { formatDate } from "../../../lib/utils.js";
import ErrorOccurred from "../../../components/ErrorOccurred";
import GradiantText from "../../../components/GradiantText";
import { Link } from "react-router";

export default function RecentInterviews() {
  const { data, isLoading, error } = useRecentInterviews();

  if (isLoading) return;
  <div className="flex  flex-wrap items-center gap-4 mt-4">
    {[1, 2, 3, 4, 5].map((i) => (
      <div
        key={i._id}
        className="bg-gray-800 border-gray-600 rounded-xl w-48 h-32"
      />
    ))}
  </div>;

  if (error) return <ErrorOccurred error={error.message} />;

  const interviews = data.data;

  return (
    <div className="my-4 w-[60vw]  mx-auto mt-8">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        Recent<GradiantText className="text-3xl">Interview Plans</GradiantText>
      </h1>
      <div className="flex  flex-wrap items-center gap-4 mt-4">
        {interviews.map((i) => (
          <Link to={"/interviews/" + i._id}>
            <div
              key={i._id}
              className="bg-[#141A22] border border-gray-700 rounded-xl w-64 h-28 p-2 px-4 cursor-pointer"
            >
              <h2 className="font-semibold text-lg">{i.jobDescription}</h2>
              <span className="text-gray-400 text-sm tracking-tight">
                Generated on: {formatDate(i.createdAt)}
              </span>
              <h4 className="text-fuchsia-500 tracking-tight font-semibold">
                Match Score: {i.matchScore}%
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
