"use client"

import { getSubscriptionDetailsApi, getUserSubscriptionDetailsApi } from "@/services/AllMutation/billing";
import Link from "next/link";
import React from "react";
import { BarLoader } from "react-spinners";

const UserPlansAndSettings = () => {

  const {
    data: getUserSubscriptionDetails,
    isLoading: isLoadingGetUserSubscriptionDetails,
    isRefetching, } = getUserSubscriptionDetailsApi();

  return (
    <>
      <div className="space-y-8 max-md:mt-4 ">
        <div className="rounded-[10px] py-6 bg-[#ffffff15] backdrop-blur-lg space-y-4">
          <div className="px-6 ">
            <h1 className="text-xl font-medium text-redText">
              Current Plan{" "}
              {getUserSubscriptionDetails?.data?.length > 0 ? (<>
                <span className="font-medium  ">- Paid</span>
              </>) : (<>
                <span className="font-medium  ">- Free</span>
              </>)}
            </h1>
          </div>
          <hr className="border-lineColor w-[100%]" />

          {
            (isLoadingGetUserSubscriptionDetails) ? (
              <>
                <div className="flex justify-center items-center w-full ">
                  <BarLoader color="#ffffff" height={6} width={100} />
                </div>
              </>
            ) : (
              <>
                {
                  getUserSubscriptionDetails?.data?.length > 0 ? (
                    <>
                      <div className="px-6">
                        <p className="text-sm text-darkText text-justify ">
                          You are currently subscribed to our premium plan. Enjoy access to all premium features!
                        </p>
                      </div>
                      <div className="px-6">
                        <Link
                          href="/plandetails"
                          className="border-[1px] font-medium bg-mainBg  rounded-lg w-full py-2 flex items-center justify-center border-[#4481b2] hover:border-[#3498db]"
                        >
                          Check Your Plan Details
                        </Link>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="px-6">
                        <p className="text-sm text-darkText text-justify ">
                          Check our subscription plans and find the best one for your needs.
                        </p>
                      </div>
                      <div className="px-6">
                        <Link
                          href="/plandetails"
                          className="border-[1px] font-medium bg-mainBg  rounded-lg w-full py-2 flex items-center justify-center border-[#4481b2] hover:border-[#3498db]"
                        >
                          Subscribe
                        </Link>
                      </div>
                    </>
                  )
                }
              </>
            )
          }

        </div>
        {/* <div className="rounded-[10px] py-6 bg-[#ffffff15] backdrop-blur-lg space-y-4 px-6">
          <h2 className="text-base font-medium text-darkText ">
            Automatic Notifications
          </h2>

          <p className="flex items-start">
            {" "}
            <input type="checkbox" className="mr-2 mt-1" />
            <label className="text-sm text-justify">
              As a user, you will receive automatic notifications from us. If
              you don’t want any notifications, uncheck the box by clicking on
              it.
            </label>
          </p>
        </div> */}
        {/* <div className="rounded-[10px] py-6 bg-[#ffffff15] backdrop-blur-lg space-y-4 px-6">
          <h2 className="text-base font-medium text-red-600 ">Danger Zone</h2>
          <p className="text-sm text-justify">
            If you want to permanently delete this account and all of its data,
            click the button below..
          </p>
          <button
            type="button"
            className="flex flex-row items-center gap-1 py-3 px-5 w-[100%] justify-center rounded-[10px] bg-chatBoxBtn hover:bg-opacity-80 duration-300 transition-all "
          >
            <span className="text-base font-medium">Delete</span>
          </button>
        </div> */}
      </div>
    </>
  );
};

export default UserPlansAndSettings;
