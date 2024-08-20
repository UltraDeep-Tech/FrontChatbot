"use client"

import { cancelSubscriptionApi, getSubscriptionDetailsApi } from "@/services/AllMutation/billing";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Overview from "../HomeComponent/BillingManagement/Overview";
import BillingTable from "../HomeComponent/BillingManagement/BillingTable";
import PaymentMethods from "../HomeComponent/BillingManagement/PaymentMethods";
import Preferences from "../HomeComponent/BillingManagement/Preferences";



export default function BillingTabs({ isLoadinggetSubscriptionDetails, getSubscriptionDetails }:
    { isLoadinggetSubscriptionDetails: boolean, getSubscriptionDetails: any }) {
    const [tab, setTab] = useState("overview")


    return (
        <>
            <div className="w-full h-[75vh] mt-4">
                <ul className="flex flex-wrap  font-medium text-center border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                    <li className="me-2">
                        <p aria-current="page" onClick={() => setTab("overview")} className={`inline-block cursor-pointer px-4 py-2 fon rounded-t-lg text-sm ${tab === "overview" ? "text-white bg-mainBg active dark:bg-mainSecond dark:text-white" : "text-gray-300 hover:text-white hover:bg-gray-50 dark:hover:bg-mainSecond dark:hover:text-gray-200"}`}>Overview</p>
                    </li>
                    <li className="me-2">
                        <p aria-current="page" onClick={() => setTab("paymentmethods")} className={`inline-block cursor-pointer px-4 py-2 fon rounded-t-lg text-sm ${tab === "paymentmethods" ? "text-white bg-mainBg active dark:bg-mainSecond dark:text-white" : "text-gray-300 hover:text-white hover:bg-gray-50 dark:hover:bg-mainSecond dark:hover:text-gray-200"}`}>Payment Methods</p>
                    </li>
                    <li className="me-2">
                        <p onClick={() => setTab("billing")} className={`inline-block cursor-pointer px-4 py-2 rounded-t-lg text-sm ${tab === "billing" ? "text-white bg-mainBg active dark:bg-mainSecond dark:text-white" : "text-gray-300 hover:text-white hover:bg-gray-50 dark:hover:bg-mainSecond dark:hover:text-gray-200"}`}>Billing history</p>
                    </li>
                    <li className="me-2">
                        <p onClick={() => setTab("preferences")} className={`inline-block cursor-pointer px-4 py-2 rounded-t-lg text-sm ${tab === "preferences" ? "text-white bg-mainBg active dark:bg-mainSecond dark:text-white" : "text-gray-300 hover:text-white hover:bg-gray-50 dark:hover:bg-mainSecond dark:hover:text-gray-200"}`}>Preferences</p>
                    </li>
                </ul>

                {
                    tab === "overview" && <Overview getSubscriptionDetails={getSubscriptionDetails} isloading={isLoadinggetSubscriptionDetails} />
                }
                {
                    tab === "paymentmethods" && <PaymentMethods getSubscriptionDetails={getSubscriptionDetails} isloading={isLoadinggetSubscriptionDetails} />
                }
                {
                    tab === "billing" && <BillingTable getSubscriptionDetails={getSubscriptionDetails} />
                }
                {
                    tab === "preferences" && <Preferences getSubscriptionDetails={getSubscriptionDetails} />
                }
            </div>


        </>
    )
}