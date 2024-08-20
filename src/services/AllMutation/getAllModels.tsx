/* eslint-disable react-hooks/rules-of-hooks */
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const getAllModels = (onSuccess: any, onError: any, data: any) => {
  return useQuery(
    ["getAllModels"],
    async () => {
      const res = await api.get(`models/getAllModels`)
      return res.data
    },
    {
      refetchOnMount: true,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      initialData: data ? data : null,
      onSuccess: (res) => {
        onSuccess(res);
      },
      onError: ({ res }) => {
        onError(res);
      },
    }
  );
};



