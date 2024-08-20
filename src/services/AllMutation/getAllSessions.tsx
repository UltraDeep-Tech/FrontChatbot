/* eslint-disable react-hooks/rules-of-hooks */
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const getAllSessions = (onSuccess: any, onError: any) => {
  return useQuery([`getAllSessions`], () => api.get("session/getAllSessions"), {
    refetchOnMount: true,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    retry: false,

    onSuccess: (res) => {
      onSuccess(res);
    },
    onError: ({ res }) => {
      onError(res);
    },
  });
};


