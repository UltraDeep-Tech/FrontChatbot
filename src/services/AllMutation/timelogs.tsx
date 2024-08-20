import api from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import cogoToast from "cogo-toast";


export const RecordTimerApi = () => {
    const queryClient = useQueryClient();
    return useMutation(
        (data: any) => api.post("/timelogs/recordtimings", data),
        {
            onSuccess: (res) => {
                // cogoToast.success(res?.data);
                queryClient.refetchQueries([`AllTimingsForModel`]);
                queryClient.refetchQueries(["getUserActiveSubscription"]);
                // queryClient.refetchQueries([`AllTimingsForTask`]);
                // queryClient.refetchQueries([`getProjectsTask`]);
                // queryClient.refetchQueries([`getLatestTimer`]);
            },
            onError: ({ response }) => {
                // cogoToast.error(response.data.message);
            },
        }
    );
}


export const AllTimingsForModelApi = (id: string) =>
    useQuery(
        [`AllTimingsForModel`, id], async () =>
        await api.get(`timelogs/getAllTimings/${id}`), {
        enabled: id ? true : false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        onSuccess: (res) => {
        },
    })