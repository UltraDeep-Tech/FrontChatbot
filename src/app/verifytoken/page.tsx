'use client'

import api from "@/lib/api"
import { useQuery } from "@tanstack/react-query"
import cogoToast from "cogo-toast"
import { useRouter, useSearchParams } from "next/navigation"
import { BounceLoader } from "react-spinners"

export default function Home() {

    const searchParams = useSearchParams()
    const router = useRouter()
    const token = searchParams.get('token')
    const getData = async (data: any) => {
        const respone = await api.put("auth/account/verification/" + data)
        console.log(respone)
        return respone
    }
    const { isLoading, isError, isSuccess, data, isPreviousData, error, refetch, isFetching } = useQuery(
        ["getUser",], () => getData(token), {
        enabled: token ? true : false,
        onSuccess: (res) => {
            router.push('/login')
        },
        onError: ({ response }) => {
            console.log('eer', response)
            if (response?.data?.data) {
                router.push('/forget')
                cogoToast.error(response?.data?.data);
            }
        }
    })
    return (
        <div className="flex w-full flex-col items-center justify-center h-screen bg-content py-2">
            {isLoading ? (
                <div className="flex items-center space-x-3">
                    <BounceLoader size={150} color={"#ffffff"} />
                    <span className="text-xl text-white">Loading...</span>
                </div>
            ) : isError ? (
                <div className="text-red-500 text-xl"></div>
            ) : isSuccess ? (
                <>
                    <div className="text-white text-xl mb-4">Email Verified Successfully!</div>
                </>
            ) : null}
        </div>

    );
}