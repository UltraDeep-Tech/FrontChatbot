/* eslint-disable react-hooks/rules-of-hooks */
import api from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import cogoToast from "cogo-toast";
import { SetStateAction } from "react";

export const createModel = (onSuccess: any, onError: any) => {
    return useMutation((data) => api.post("models/createModel", data), {
        onSuccess: (res) => {
            onSuccess();
        },
        onError: ({ response }) => {
            onError(response)
        }
    })
}



export const createUserModelApi = (setDescription: React.Dispatch<React.SetStateAction<string>>,
    setShowTextArea: React.Dispatch<React.SetStateAction<boolean>>) => {
    const queryClient = useQueryClient()
    return useMutation((data:any) => api.post("models/addUserDescription", data), {
        onSuccess: (res) => {
            cogoToast.success("updated")
            queryClient.refetchQueries([`getUserDescriptionForModel`])
            setDescription("")
            setShowTextArea(false)
        },
        onError: ({ response }) => {
        }
    })
}


export const getUserDescriptionForModelApi = (modelId: string, setDescription: React.Dispatch<React.SetStateAction<string>>) =>
    useQuery(
        [`getUserDescriptionForModel`], async () =>
            await api.get(`models/getUserDescriptionForModel/${modelId}`), {
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
            onSuccess: (res) => {
                setDescription(res?.data?.description)
            },
    })

