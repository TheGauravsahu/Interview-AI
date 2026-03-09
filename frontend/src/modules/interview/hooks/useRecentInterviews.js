import { useQuery } from "@tanstack/react-query";
import { interviewApi } from "../services/interview.api";

export const useRecentInterviews = () =>
  useQuery({
    queryKey: ["recent-interviews"],
    queryFn: interviewApi.getRecentInterviews,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
