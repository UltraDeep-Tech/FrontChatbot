/* eslint-disable react-hooks/rules-of-hooks */
import api from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const createHistory = (onSuccess: any, onError: any) => {
    const queryClient = useQueryClient();
    return useMutation((data) => api.post("session/createHistory", data), {
        onSuccess: (res) => {
            onSuccess(res);
            queryClient.refetchQueries(["getUserActiveSubscription"]);
        },
        onError: ({ response }) => {
            onError(response)
        }
    })
}