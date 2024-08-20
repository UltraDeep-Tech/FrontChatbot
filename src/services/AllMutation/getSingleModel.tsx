/* eslint-disable react-hooks/rules-of-hooks */
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const getSingleModel = (modelId: any, onSuccess: any, onError: any) => {
  return useQuery([`getSingleModel`], () => api.get(`models/getSingleModel/${modelId}`), {
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



