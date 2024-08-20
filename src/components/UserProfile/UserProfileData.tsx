/* eslint-disable @next/next/no-img-element */
"use client"
import useAuthStore from "@/store/authStore";
import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import DragAndDropImage from "./DragAndDropImage";
import ProfilePicture from "../ChatPage/ProfilePicture";
import api from "@/lib/api";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import UploadingProgress from "../Profile/UploadingProgress";
import cogoToast from "cogo-toast";
import { BeatLoader } from "react-spinners";
const btn = [
  {
    title: "Female First",
  },
  {
    title: "Female Only",
  },
  {
    title: "Male First",
  },
  {
    title: "Male Only",
  },
];

const type = [
  {
    title: "Realistic",
  },
  {
    title: "Anime",
  },
];

type FormValue = {
  firstName: string;
  lastName: string;
  profilePicture: File[];

};

const UserProfileData = () => {
  const queryClient = useQueryClient();

  const user = useAuthStore((state: any) => state.user);
  const { signIn } = useAuthStore();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FormValue>({ defaultValues: { firstName: user?.firstName, lastName: user?.lastName } });





  const toastId: any = useRef(null);
  const { mutate: uploadProfileImage, isLoading: profileImageUploadLoading } =
    useMutation(
      (d: FormData) =>
        api.post(`user/createImage/${d.get("id")}`, d, {
          headers: {
            "Content-Type": "application/octet-stream",
          },
          onUploadProgress: (p: any) => {
            const progress = p.loaded / p.total;
            // console.log('progres', progress)
            UploadingProgress(progress, toastId);
          },
        }),
      {
        onSuccess: (res) => {
          toast.dismiss();
          signIn(res.data);
          return;
        },
        onError: ({ response }) => {
          toast.dismiss();
          toast.error("erro", response.data);
          console.log(response.data);
        },
      }
    );

  const { mutate, isLoading } = useMutation(
    (data) => api.put("user/details/" + user?._id, data),
    {
      onSuccess: (res: any) => {
        console.log(res);
        let data = res.data
        signIn(res.data);
        cogoToast.success("Profile updated successfully");
        let profilePicture = getValues("profilePicture")
        if (profilePicture) {
          Promise.all(
            profilePicture.map(async (image: any) => {
              const formdata = new FormData();
              formdata.append("id", data?._id);
              formdata.append("file", image);
              uploadProfileImage(formdata)
            })
          );
        }
        // reset();
        setValue("firstName", res.data.firstName);
        setValue("lastName", res.data.lastName);
      },
      onError: ({ response }: any) => {
        console.log(response.data);
        cogoToast.error(response?.data?.message);
      },
    }
  );
  const onSubmit = async () => {
    let data = {
      firstName: getValues("firstName") || user.firstName,
      lastName: getValues("lastName") || user.lastName,
    };
    const newData: any = { ...data };
    if (!isLoading) {
      mutate(newData);
    }
  };
  return (
    <>
      <div className="space-y-5 text-darkText ">
        Profile
        <div className=" flex justify-center items-center mb-10">

        </div>
        <div>
          <label className="block text-[14px]  text-darkText">E-mail</label>
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
              name="email"
              id="email"
              value={user?.email}
              className="block h-[44px] w-fit bg-[#ffffff15] rounded-2xl border-0 pl-10 text-[16px] font-light  text-darkText"
              placeholder="you@example.com"
            />
          </div>
        </div>


        <hr className="border-lineColor w-[100%]" />
        <div>User Info</div>
        <div className=" mb-10">
          <Controller
            control={control}
            name="profilePicture"
            render={({ field: { onChange, value, ref } }) => (
              <>
                <DragAndDropImage
                  size={30}
                  images={value}
                  setimages={onChange}
                />
                {!value && (
                  <>
                    <ProfilePicture
                      size={25}
                      user={user}
                      path={user?.profilePicture}
                    />
                  </>
                )}
              </>
            )}
          />
          {errors.profilePicture && (
            <p className="text-xs text-red-500">
              {errors.profilePicture.message}
            </p>
          )}
          { }
        </div>
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4  pt-10 ">
          <div className="w-full ">
            <label className="block text-[14px]  text-darkText">First Name</label>
            <div className="relative mt-[7px] rounded-md shadow-sm">
              <input
                defaultValue={user?.firstName}
                {...register("firstName", {

                })}
                className="py-2 w-full bg-[#ffffff15] rounded-2xl border-0 pl-4 text-[16px] font-light  text-darkText"
                placeholder="you@example.com"
              />
              <p>
                {errors.firstName && (
                  <p className="text-xs text-orange-700">
                    {errors.firstName.message}
                  </p>
                )}
              </p>
            </div>
          </div>
          <div className="w-full">
            <label className="block text-[14px]  text-darkText">Last Name</label>
            <div className="relative mt-[7px]  rounded-md shadow-sm">
              <input
                defaultValue={user?.lastName}
                type="text"
                {...register("lastName", {

                })}
                className="py-2  w-full bg-[#ffffff15] rounded-2xl border-0 pl-4 text-[16px] font-light  text-darkText"
                placeholder="you@example.com"
              />
              <p>
                {errors.lastName && (
                  <p className="text-xs text-orange-700">
                    {errors.lastName.message}
                  </p>
                )}
              </p>
            </div>
          </div>

        </div>
        <div>
          <button disabled={isLoading || profileImageUploadLoading} onClick={() => onSubmit()} className="flex flex-row  items-center gap-1 nav-btn bg-mainBg  hover:bg-opacity-80 duration-300 transition-all">
            <span className="text-md font-medium">
              {isLoading || profileImageUploadLoading ? (<>
                <BeatLoader size={8} />
              </>) : "Update"}
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default UserProfileData;
