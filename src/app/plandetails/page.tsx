"use client"
import BillingTabs from "@/components/Billing/Tabs";
import Subscription from "@/components/HomeComponent/Subscription/Subscription";
import api from "@/lib/api";
import fetchApi from "@/lib/fetchApi";
import { getSubscriptionDetailsApi } from "@/services/AllMutation/billing";
import { cookies } from "next/headers";
import { BarLoader } from "react-spinners";


export default function PlanDetails() {


    const {
        data: getSubscriptionDetails,
        isLoading: isLoadinggetSubscriptionDetails,
        isRefetching: isrefetchinggetSubscriptionDetails,
    } = getSubscriptionDetailsApi();


    return (
        <>

            {
                (isLoadinggetSubscriptionDetails) ? (
                    <>
                        <div className="flex justify-center items-center w-full ">
                            <BarLoader color="#ffffff" height={6} width={100} />
                        </div>
                    </>
                ) : (
                    <>
                        {
                            getSubscriptionDetails?.data?.subscription ? (
                                <>
                                    <BillingTabs
                                        isLoadinggetSubscriptionDetails={false}
                                        getSubscriptionDetails={getSubscriptionDetails?.data} />
                                </>
                            ) : (
                                <>
                                    <Subscription />
                                </>
                            )
                        }
                    </>
                )
            }

        </>
    )
}