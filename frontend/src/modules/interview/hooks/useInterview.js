import { useQuery } from "@tanstack/react-query";
import { interviewApi } from "../services/interview.api";

export const useInterview = (id) =>
  useQuery({
    queryKey: ["interview", id],
    queryFn: () => interviewApi.getInterview(id),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
