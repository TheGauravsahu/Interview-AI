import { useSuspenseQuery } from "@tanstack/react-query";
import { interviewApi } from "../services/interview.api";

export const useInterview = (id) =>
  useSuspenseQuery({
    queryKey: ["interview", id],
    queryFn: () => interviewApi.getInterview(id),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
