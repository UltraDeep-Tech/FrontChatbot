"use client";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import cogoToast from "cogo-toast";
import {
  BeatLoader,
  BounceLoader,
  DotLoader,
  RingLoader,
} from "react-spinners";
import useAuthStore from "@/store/authStore";
import DragAndDropImage from "./DragAndDropImage";
import axios from "axios";
import { toast } from "react-toastify";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import UploadingProgress from "./UploadingProgress";
type FormValue = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profilePicture: File[];
  country?: string;
  city: string;
  state: string;
};
const UserProfile = () => {
  const user = useAuthStore((state) => state.user);

  const [countryList, setCountryList] = useState<any>([]);
  const [countryIsoCode, setCountryIsoCode] = useState<any>("");
  const [stateList, setStateList] = useState<any>([]);
  const [stateIsoCode, setstateIsoCode] = useState<any>("");
  const [city, setCity] = useState<any>([]);


  useEffect(() => {
    if (countryIsoCode) {
      let data = countryList?.filter(
        (ele: any) => ele?.isoCode === countryIsoCode
      );
    }
  }, [countryIsoCode, stateIsoCode]);



  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<FormValue>();
  const [isEdit, setIsEdit] = useState(false);
  const signIn = useAuthStore((state) => state.signIn);

  useEffect(() => {
    if (user) {
      setValue("firstName", user?.firstName);
      setValue("lastName", user?.lastName);
      setValue("email", user?.email);
    }
  }, [user]);
  const reset = () => {
    if (user) {
      setValue("firstName", user?.firstName);
      setValue("lastName", user?.lastName);
    }
  };

  const toastId: any = useRef(null);

  const { mutate: uploadProfileImage, isLoading: profileImageUploadLoading } =
    useMutation(
      (d: any) =>
        axios.put(d.get("path"), d.get("file"), {
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
          toast.success("Image Uploaded");
          return;
        },
        onError: ({ response }) => {
          toast.dismiss();
          toast.error("erro", response.data);
          console.log(response.data);
        },
      }
    );
  const uploadtoBuket = async (
    email: string,
    foldername: string,
    filename: string,
    file: File
  ) => {
    console.log("uploading", email, foldername, filename, file);
    let name = file.name;
    let ext = name.split(".").pop();
    const path = email + "/" + foldername + "/" + filename + "." + ext;
    await api
      .get("storage/uploading?path=" + path)
      .then((res) => {
        console.log(res.data);
        const formdata = new FormData();
        formdata.append("path", res.data);
        formdata.append("file", file);
        uploadProfileImage(formdata);
      })
      .catch((err) => {
        console.log(err, "err");
      });
    return path;
  };
  const onSubmit = async (formData: FormValue) => {
    let data = { ...formData };
    const newData: any = { ...data };
    if (data && data.profilePicture && data.profilePicture.length > 0) {
      await Promise.all(
        data.profilePicture.map(async (images: any) => {
          const path = await uploadtoBuket(
            data.email,
            "personal_details",
            "profile_picture",
            images
          );
          newData.profilePicture = path;
        })
      );
    }
    if (!isLoading) {
      mutate(newData);
    }
  };
  const {
    data: userDetailsData,
    isLoading: gettinguserDetails,
    refetch,
    isRefetching,
  } = useQuery(["userDetailsData"], () => api.get("user_details"), {
    keepPreviousData: true,
    onSuccess: (res: any) => {
      setValue("phone", res?.data?.phone);
      setValue("state", res?.data?.state);
      setValue("city", res?.data?.city);
      let stateName = stateList?.find(
        (ele: any) => ele?.name === res?.data?.state
      );
    },
    onError: ({ response }: any) => {
      console.log(response.data);
    },
  });

  const { mutate, isLoading } = useMutation(
    (data) => api.put("user/details/" + user?._id, data),
    {
      onSuccess: (res: any) => {
        console.log(res);
        reset();
        signIn(res.data);
        refetch();
        cogoToast.success("Profile updated successfully");
        setIsEdit(!isEdit);
      },
      onError: ({ response }: any) => {
        console.log(response.data);
        cogoToast.error(response?.data?.message);
      },
    }
  );

  const { mutate: resendEmail, isLoading: loadingResendEmail } = useMutation(
    (data) => api.post("auth/resendemail/" + user?.email),
    {
      onSuccess: (res: any) => {
        cogoToast.success(
          "Successfully sent email verification email to " + user?.email
        );
      },
      onError: ({ response }: any) => {
        console.log(response.data);
        cogoToast.error(response?.data?.message);
      },
    }
  );

  useEffect(() => {
    setValue("city", userDetailsData?.data?.city);
    return () => { };
  }, [userDetailsData]);

  return (
    <div className="w-[100%] relative h-auto px-10 py-10 bg-slate-800 rounded-2xl">
      {isRefetching || gettinguserDetails || isLoading ? (
        <div className=" w-[100%] h-[100%] absolute -ml-10 -mt-10 flex justify-center items-center">
          <BounceLoader color="white" size={100} />
        </div>
      ) : (
        ""
      )}
      <div className=" flex justify-center items-center mb-10">
        <div className="">
          <Controller
            control={control}
            name="profilePicture"
            render={({ field: { onChange, value, ref } }) => (
              <>
                <DragAndDropImage
                  size={50}
                  images={value}
                  setimages={onChange}
                />
                {!value && (
                  <>
                    {/* @ts-ignore */}
                    <ProfilePicture user={user} path={user?.profilePicture} />
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
      </div>
      {!user?.isEmailVerified && (
        <>
          <div className="flex justify-center items-center my-3">
            <div className="w-4/5 flex justify-center items-center gap-2 flex-col border-[1px] border-red-500 rounded-lg bg-slate-900 py-2">
              <p className="py-2 font-thin text-lg text-center text-red-300">
                Please verify your account by clicking on the link sent to your
                email.
                <br /> Kindly check your Inbox and Spam folder for it
              </p>
              <button
                onClick={() => resendEmail()}
                disabled={loadingResendEmail}
                className=" min-w-[30%] flex flex-row justify-center items-center gap-2 mr-3 rounded-xl btn-contact-us btn-contact-us-secondary cursor-pointer "
              >
                {!loadingResendEmail ? (
                  <>Resend Email</>
                ) : (
                  <>
                    <DotLoader size={15} />
                  </>
                )}
              </button>
            </div>
          </div>
        </>
      )}
      <form className="w-[100%]" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-4/5 flex flex-wrap justify-center items-start mx-auto mb-2">
          <div className="space-y-8 w-full md:w-2/4 py-2 px-6">
            <div className="relative">
              <h6 className="mb-2">First name</h6>
              <input
                placeholder="Enter first name"
                className="w-[100%] border border-1 border-white bg-transparent py-2 px-2 rounded"
                readOnly={!isEdit}
                {...register("firstName", {
                  required: "First Name is required",
                  minLength: {
                    value: 3,
                    message: "Minimum length of last name must be 3",
                  },
                })}
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
          <div className="space-y-8 w-full md:w-2/4 py-2 px-6">
            <div className="relative">
              <h6 className="mb-2">Last name</h6>
              <input
                placeholder="Enter last name"
                className="w-[100%] border border-1 border-white bg-transparent py-2 px-2 rounded"
                readOnly={!isEdit}
                type="text"
                {...register("lastName", {
                  required: "Last Name is required",
                  minLength: {
                    value: 1,
                    message: "Minimum length of last name must be 3",
                  },
                })}
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
          <div className="space-y-8 w-full md:w-2/4 py-2 px-6">
            <div className="relative">
              <h6 className="mb-2">Email</h6>
              <input
                placeholder="Enter Your Email"
                className="w-[100%]  border-2 border-gray-600 text-gray-300 bg-transparent py-2 px-2 rounded"
                readOnly
                type="email"
                {...register("email", {
                  required: "email is required",
                })}
              />
            </div>
          </div>
          <div className="space-y-8 w-full md:w-2/4 py-2 px-6">
            <div className="mb-6 relative">
              <label className="left-3 px-1  ">State</label>
              <select
                disabled={!isEdit}
                style={{ appearance: "none" }}
                className={` mt-2 px-3 py-2 border border-1 border-white bg-gray-800 rounded text-sm  focus:outline-none focus:ring w-full ease-linear transition-all duration-150`}
                {...register(`state`, {
                  required: "state is required.",
                })}
                defaultChecked={userDetailsData?.data?.state}
                onChange={(e) => {
                  let data = stateList?.filter(
                    (ele: any) => ele?.name === e?.target?.value
                  );
                  setValue("state", e?.target?.value);
                  setstateIsoCode(data?.[0]?.isoCode);
                }}
              // disabled={(index > selectedForModify.length - 1)}
              // @ts-ignore
              >
                <option value="" selected disabled hidden>
                  Select State
                </option>
                {Array.isArray(stateList) &&
                  stateList.length > 0 &&
                  stateList.map((statePart, i) => {
                    return (
                      <>
                        <option key={i} value={statePart?.name}>
                          {statePart?.name}
                        </option>
                      </>
                    );
                  })}
              </select>
              <div className="absolute right-3 top-10 cursor-pointer">
                <MdOutlineKeyboardArrowDown />
              </div>
              {errors.state && (
                <p className="text-xs text-red-500">{errors.state.message}</p>
              )}
            </div>
          </div>
          <div className="space-y-8 w-full md:w-2/4 py-2 px-6">
            {isEdit ? (
              <div className="mb-6 relative">
                <label
                  className=" left-3 px-1 "
                  onClick={() => {
                    setValue("city", userDetailsData?.data?.city);
                  }}
                >
                  City
                </label>
                <select
                  disabled={!isEdit}
                  defaultChecked={userDetailsData?.data?.city}
                  defaultValue={userDetailsData?.data?.city}
                  style={{ appearance: "none" }}
                  className={`mt-2 px-3 py-2 border border-1 border-white bg-gray-800 rounded text-sm  focus:outline-none focus:ring w-full ease-linear transition-all duration-150`}
                  {...register(`city`, {
                    required: "city is required.",
                  })}
                  onChange={(e) => {
                    setValue("city", e.target.value);
                  }}
                // disabled={(index > selectedForModify.length - 1)}
                // @ts-ignore
                >
                  <option value="" selected disabled hidden>
                    Select city
                  </option>
                  {Array.isArray(city) &&
                    city.length > 0 &&
                    city.map((cityPart, i) => {
                      return (
                        <>
                          <option key={i} value={cityPart?.name}>
                            {cityPart?.name}
                          </option>
                        </>
                      );
                    })}
                </select>
                <div className="absolute right-3 top-10 cursor-pointer">
                  <MdOutlineKeyboardArrowDown />
                </div>
                {errors.city && (
                  <p className="text-xs text-red-500">{errors.city.message}</p>
                )}
              </div>
            ) : (
              <div className="mb-6 relative">
                <label
                  className=" left-3 px-1 "
                  onClick={() => {
                    setValue("city", userDetailsData?.data?.city);
                  }}
                >
                  City
                </label>
                <select
                  disabled={!isEdit}
                  defaultChecked={userDetailsData?.data?.city}
                  value={userDetailsData?.data?.city}
                  style={{ appearance: "none" }}
                  className={`mt-2 px-3 py-2 border border-1 border-white bg-gray-800 rounded text-sm  focus:outline-none focus:ring w-full ease-linear transition-all duration-150`}
                  {...register(`city`, {
                    required: "city is required.",
                  })}
                  onChange={(e) => {
                    setValue("city", e.target.value);
                  }}
                // disabled={(index > selectedForModify.length - 1)}
                // @ts-ignore
                >
                  <option value="" selected disabled hidden>
                    Select city
                  </option>
                  {Array.isArray(city) &&
                    city.length > 0 &&
                    city.map((cityPart, i) => {
                      return (
                        <>
                          <option key={i} value={cityPart?.name}>
                            {cityPart?.name}
                          </option>
                        </>
                      );
                    })}
                </select>
                <div className="absolute right-3 top-10 cursor-pointer">
                  <MdOutlineKeyboardArrowDown />
                </div>
                {errors.city && (
                  <p className="text-xs text-red-500">{errors.city.message}</p>
                )}
              </div>
            )}
          </div>
          <div className="w-full flex justify-start items-start">
            <div className="space-y-8 w-full md:w-2/4 py-2 px-6">
              <div className="relative">
                <h6 className="mb-2">Mobile Number</h6>
                <input
                  placeholder="Enter Mobile Number"
                  className="w-[100%] border border-1 border-white bg-transparent py-2 px-2 rounded"
                  readOnly={!isEdit}
                  defaultValue={userDetailsData?.data?.phone}
                  type="tel"
                  {...register("phone", {
                    required: "Mobile number is required",
                    maxLength: 13,
                    minLength: 10,
                    min: "Mobile Number must at least 10 numbers",
                    max: "Mobile Number must be max 13 numbers",
                  })}
                />
                {errors.phone && (
                  <p className="text-xs text-orange-700">
                    Enter a valid mobile number
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="w-full lg:w-2/4 py-4 px-6 flex justify-center items-center h-auto mt-5">
            {!isEdit ? (
              <div className="w-full">
                <p
                  className="flex flex-row gap-2 mr-3 rounded-xl justify-center items-center btn-contact-us btn-contact-us-secondary cursor-pointer w-full"
                  onClick={() => setIsEdit(!isEdit)}
                >
                  <span className="">Edit profile</span>
                </p>
              </div>
            ) : (
              ""
            )}
            {isEdit ? (
              <>
                <div className="flex flex-col lg:flex-row w-full justify-between gap-2">
                  {isLoading ? (
                    <button
                      className="flex flex-row justify-center items-center rounded-xl btn-contact-us btn-contact-us-secondary cursor-pointer w-full"
                      disabled
                    >
                      <span className="">
                        <BeatLoader color="white" size={10} />
                      </span>
                    </button>
                  ) : (
                    <button
                      className="flex flex-row justify-center items-center gap-2 mr-3 rounded-xl btn-contact-us btn-contact-us-secondary cursor-pointer w-full"
                      onClick={() => handleSubmit(onSubmit)}
                    >
                      <span className="">Update</span>
                    </button>
                  )}
                  <p
                    className="flex flex-row justify-center items-center gap-2 mr-3 rounded-xl btn-cancel-us btn-cancel-us-secondary cursor-pointer w-full"
                    onClick={() => setIsEdit(!isEdit)}
                  >
                    <span className="">Cancel</span>
                  </p>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
