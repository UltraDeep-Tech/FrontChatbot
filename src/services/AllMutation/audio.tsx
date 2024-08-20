

import api from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

export const getAudioApi = (streamToBlob: any, setAudioBlob: any, onError: any) => {
    return useMutation((data: any) => api.post("texttospeech/getAudio", data), {
        onSuccess: async (res) => {
            console.log("res", res?.data);
            // setAudioBlob(res?.data)
            const blob = await streamToBlob(res?.data);
            console.log(URL.createObjectURL(blob), "blob")
            setAudioBlob(blob)
        },
        onError: ({ response }) => {
            onError(response)
        }
    })
}

export const getAnswerApi = (setInputMessage: React.Dispatch<React.SetStateAction<string>>, setisLoading: React.Dispatch<React.SetStateAction<boolean>>, setMessages: React.Dispatch<React.SetStateAction<{ text: any; fromUser?: boolean, createdAt: Date }[]>>, scrollToBottom:()=>void) => {
    const queryClient = useQueryClient()
    return useMutation((data: any) => api.post(`texttospeech/getAnswer`,data), {
        onSuccess: async (res) => {
            setMessages((prevMessages) => [
                ...prevMessages, { text: res?.data, fromUser: false, createdAt: new Date() }
            ])
            setInputMessage("")
            setisLoading(false)
            queryClient.refetchQueries(["getUserActiveSubscription"]);
            scrollToBottom()
        },
        onError: ({ response }) => {
        }
    })
}