"use client";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { BarLoader } from "react-spinners";
import { FiDownload } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { IoCloseCircle } from "react-icons/io5";
import useAuthStore from "@/store/authStore";
import { CgArrowRight } from "react-icons/cg";
import cogoToast from "cogo-toast";

const page = () => {





  return (<>
    <div className="h-screen w-screen flex flex-col lg:flex-row lg:flex justify-center items-center  gap-4 p-8 lg:p-40">
      <div className="flex items-center justify-center text-center w-full lg:w-[25%] h-full">
        <div className="flex flex-col rounded-2xl bg-lightBg dark:bg-cardsBgDark items-center gap-4 justify-center text-center w-full lg:w-[300px] h-full">
          <div className="flex items-center justify-center w-full ">
            <div
              className={`p-2 flex items-center justify-center rounded-full bg-[#1eff9631]`}
            >
              <div
                className={`p-2 flex items-center justify-center rounded-full bg-[#1eff965b]`}
              >
                <div
                  className={`p-2 flex items-center justify-center rounded-full bg-[#1eff96c9]`}
                >
                  {/* {getAllTransactions?.data?.session?.status === "complete" ? ( */}
                  {/* <> */}
                  <IoIosCheckmarkCircle className="text-5xl text-[#ffffff]" />
                  {/* </> */}
                  {/* // ) : (
                  //   <>
                  //     <IoCloseCircle className="text-5xl text-[#ffffff]" />
                  //   </>
                  // )} */}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="text-lg mt-4 mb-4">
              {/* {getAllTransactions?.data?.session?.status === "complete"
                ? "Payment Successful"
                : "Payment Unsuccessful"} */}
              Payment Successful
            </p>
            <Link href={"/plandetails"} className=" bg-mainSecond px-2 rounded-lg flex justify-center items-center">
              Check Plan Details <CgArrowRight className=" -rotate-45" />
            </Link>
          </div>
        </div>
      </div>


    </div >
  </>

  );
};

export default page;
