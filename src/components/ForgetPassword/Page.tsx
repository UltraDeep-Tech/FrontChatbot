'use client'

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import cogoToast from "cogo-toast";
import useAuthStore from "@/store/authStore";
import api from "@/lib/api";
import { BeatLoader } from "react-spinners";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";

export default function Forget() {
    const router = useRouter()
    const loggedIn = useAuthStore((state) => state.loggedIn)
    const [email, setemail] = useState('')

    const { mutate: forget, isLoading } = useMutation((email: string) => api.post("/auth/requestnewpassowrd/" + email), {
        onSuccess: (res) => {
            if (res) {
                cogoToast.success("Email sent Successfully")
            }
            router.push('/login')
        },
        onError: ({ response }) => {
            cogoToast.error(response?.data?.message);
        }
    });

    useEffect(() => {
        if (loggedIn) {
            router.push('/')
        }
        return () => {
        }
    }, [loggedIn])




    return (
        <>
            <div className="flex  w-screen h-screen items-center justify-center ">
                <div className=" bg-[#ffffff23] rounded-[10px] pt-4 pb-6 bg-BtnBg w-[80%] sm:w-[45%] lg:w-[27%] px-5">
                    <div className=" w-full flex items-center justify-center">
                        <Image
                            src="/images/logo.png"
                            width={250}
                            height={100}
                            alt="Img"

                            objectFit="cover"
                        />{" "}
                    </div>


                    <div >
                        <label className="block text-[14px] text-gray-400">
                            E-mail
                        </label>
                        <div className="relative mt-[7px]  rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-[14px]">
                                <img
                                    src="/images/mail.svg"
                                    className=" text-gray"
                                    aria-hidden="true"
                                    alt="mail-icon"
                                />
                            </div>
                            <input
                                type="email"
                                defaultValue={email}
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                                required
                                id="email"
                                className="block h-[44px] w-full rounded-lg border-0 pl-10 text-[16px] font-light text-gray-400"
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>

                    <div className="mt-20">
                        {isLoading ? (
                            <button
                                type="submit"
                                className="flex flex-row items-center w-full justify-center nav-btn bg-mainBtn hover:bg-opacity-80 duration-300 transition-all"
                                disabled
                            >
                                <span className="">
                                    <BeatLoader color="white" />
                                </span>
                            </button>
                        ) : (
                            <button disabled={!email && email == '' ? true : false} onClick={() => forget(email)} className="flex bg-sideBarBg flex-row items-center w-full justify-center nav-btn bg-mainBtn hover:bg-opacity-80 duration-300 transition-all">
                                <span className="">Submit</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
