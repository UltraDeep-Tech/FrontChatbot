/* eslint-disable react-hooks/rules-of-hooks */
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const getSingleSession = (
  modelId: any,
  showPopUpVoice: boolean,
  onSuccessSession: any,
  onErrorSession: any
) => {
  return useQuery(
    [`getSingleSession`, modelId, showPopUpVoice],
    () => api.get(`session/getSingleSession/${modelId}`),
    {
      enabled: modelId ? true : false,
      refetchOnMount: true,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      retry: false,

      onSuccess: (res) => {
        onSuccessSession(res);
      },
      onError: ({ res }) => {
        onErrorSession(res);
      },
    }
  );
};
