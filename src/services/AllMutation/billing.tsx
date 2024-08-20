import api from "@/lib/api";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import cogoToast from "cogo-toast";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";


export const getUserSubscriptionDetailsApi = () => {
    return useQuery([`getUserSubscriptionDetails`], () => api.get("payment-gateway/getUserSubscription"), {
        refetchOnMount: true,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
        onSuccess: (res) => {
        },
        onError: ({ res }) => {
        },
    });
};

export const getSubscriptionDetailsApi = () => {
    return useQuery([`getSubscriptionDetails`], () => api.get("payment-gateway/subscription"), {
        refetchOnMount: true,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
        retry: false,
        onSuccess: (res) => {
        },
        onError: ({ res }) => {
        },
    });
};

export const cancelSubscriptionApi = (router: AppRouterInstance) => {
    const queryClient = useQueryClient();
    return useMutation(() => api.delete("payment-gateway/cancelUserSubscription"), {
        onSuccess: (res: any) => {
            cogoToast.success("Plan Unsubscribed successfully");
            queryClient.refetchQueries([`getUserSubscriptionDetails`])
            router.push('/subscription-cancel')
        },
        onError: ({ response }: { response: any }) => {

        }
    })
}

export const createPaymentMethodApi = () => {
    const queryClient = useQueryClient();
    return useMutation((data) => api.post("payment-gateway/AddPaymentMethod", data), {
        onSuccess: (res: any) => {
            cogoToast.success(res?.data?.message);
            queryClient.refetchQueries(["getUserSubscriptionDetails"]);
        },
        onError: ({ response }) => {
            // onError(response)
        }
    })
}

export const updateDefaultCardApi = (setDefaultId: any) => {
    const queryClient = useQueryClient();
    return useMutation((data: any) => api.post("payment-gateway/updateDefaultCard", data), {
        onSuccess: (res: any) => {
            cogoToast.success("default card chnaged");
            setDefaultId("")
            queryClient.refetchQueries(["getUserSubscriptionDetails"]);
        },
        onError: ({ response }) => {
            // onError(response)
        }
    })
}

export const updatePaymentMethodApi = (setEditMode: any) => {
    const queryClient = useQueryClient();
    return useMutation(
        (updatedFormData: any) => api.post("payment-gateway/update", updatedFormData),
        {
            onSuccess: (res) => {
                cogoToast.success("Details updated successfully")
                queryClient.refetchQueries(["getUserSubscriptionDetails"]);
                setEditMode(false);
            },
        }
    );
}

export const getUserActiveSubscriptionApi = () =>
    useQuery(
        [`getUserActiveSubscription`], async () =>
        await api.get(`session/useractiveSubscription`), {
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        onSuccess: (res) => {
        },
    })