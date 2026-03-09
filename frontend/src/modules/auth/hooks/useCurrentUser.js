import { useQuery } from "@tanstack/react-query";
import { authApi } from "../services/auth.api";

export const useCurrentUser = () =>
  useQuery({
    queryKey: "auth-getCurrentUser",
    queryFn: authApi.getCurrentUser,
    staleTime: 60 * 60 * 5,
  });
