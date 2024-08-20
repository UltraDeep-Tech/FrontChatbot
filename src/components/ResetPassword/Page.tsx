'use client'

import api from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import cogoToast from "cogo-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { BeatLoader, BounceLoader } from "react-spinners";
import Image from "next/image";


type FormValues = {
    password: string;
    password2: string;
}

export default function ResetPassword() {

    const searchParams = useSearchParams()
    const router = useRouter()
    const token = searchParams.get('token')

    const { mutate: create, isLoading } = useMutation((data: any) => api.post(`auth/forgetpassword/${token}`, data), {
        onSuccess: (res) => {
            cogoToast.success('your password is updated successfully please login');
            router.push('/login')
        },
        onError: ({ response }) => {
            cogoToast.error(response?.data?.message);
        }
    });

    const {
        register,
        handleSubmit,
        watch,
        control,
        getValues,
        formState: { errors, }
    } = useForm<FormValues>({ defaultValues: { password: "", password2: "" } })


    const onSubmit = (dataForm: FormValues) => {
        const data = (JSON.parse(JSON.stringify(dataForm)));
        create({
            password: data.password,
        });
        console.log(data)
    }
    return (
        <>
            <div className="flex  w-screen h-screen items-center justify-center ">
                <div className=" bg-[#ffffff23] rounded-[10px] pt-4 pb-6 bg-BtnBg space-y-4 w-[80%] sm:w-[45%] lg:w-[27%] px-5">
                    <div className=" w-full flex items-center justify-center">
                        <Image
                            src="/images/logo.png"
                            width={250}
                            height={100}
                            alt="Img"
                            objectFit="cover"

                        />
                    </div>



                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className=" px-5 space-y-4"
                    >
                        <div>
                            <h1 className="text-2xl font-semibold text-center">Reset Password</h1>
                        </div>
                        <div>
                            <label className="block text-[14px] text-gray-400">
                                Password
                            </label>
                            <div className="relative mt-[7px]  rounded-md shadow-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-[14px]">
                                    <img
                                        src="/images/lock.svg"
                                        className=" text-gray"
                                        aria-hidden="true"
                                        alt="mail-icon"
                                    />
                                </div>
                                <input
                                    type="password"
                                    {...register('password', {
                                        required: 'password is required.',
                                        minLength: {
                                            value: 8,
                                            message: 'minimum length of password must be 8'
                                        }
                                    })}
                                    className="block h-[44px] w-full rounded-lg border-0 pl-10 text-[16px] font-light text-gray-400"
                                    placeholder="Your password"
                                />
                                {errors.password && (
                                    <p className="text-xs text-orange-700">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div>
                            <label className="block text-[14px] text-gray-400">
                                Confirm Password
                            </label>
                            <div className="relative mt-[7px]  rounded-md shadow-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-[14px]">
                                    <img
                                        src="/images/lock.svg"
                                        className=" text-gray"
                                        aria-hidden="true"
                                        alt="mail-icon"
                                    />
                                </div>
                                <input
                                    type="password"
                                    {...register('password2', {
                                        required: 'Confirm password is required.',
                                        validate: (value) => {
                                            const { password } = getValues();
                                            return password === value || "Passwords should match!";
                                        },

                                    })}
                                    className="block h-[44px] w-full rounded-lg border-0 pl-10 text-[16px] font-light text-gray-400"
                                    placeholder="Your password"
                                />
                                {errors.password2 && (
                                    <p className="text-xs text-orange-700">
                                        {errors.password2.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div>
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
                                <button className="flex bg-sideBarBg flex-row items-center w-full justify-center nav-btn bg-mainBtn hover:bg-opacity-80 duration-300 transition-all">
                                    <span className="">Reset Password</span>
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}