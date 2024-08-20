"use client";
import { BeatLoader, BounceLoader } from "react-spinners";
import { Controller, useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import cogoToast from "cogo-toast";
import React, { Fragment, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { Dialog, Transition } from "@headlessui/react";
import { createModel } from "@/services/AllMutation/createModel";
// import 'react-date-range/dist/styles.css'; // main style file
// import 'react-date-range/dist/theme/default.css';

type FormValue = {
  name: string;
  username: string;
  description: string;
  age: number;
  gender: string;
  profilePicture: string;
  address: string;
};

const CreateModelPopUp = () => {
  const queryClient = useQueryClient();
  const [menuAddOpen, setMenuAddOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValue>({
    defaultValues: {
      name: "",
      username: "",
      description: "",
      age: 21,
      gender: "", // Add default value or leave it empty based on your requirements
      profilePicture: "",
      address: "",
    },
  });

  const onSubmit = (data: FormValue) => {
    let datas = JSON.parse(JSON.stringify(data));
    mutate(datas)
  };

  const onSuccess = async () => {
    cogoToast.success("Model added successfully");
    setMenuAddOpen(!menuAddOpen);
    reset();
  };
  const onError = (res: any) => {
    cogoToast.error(res?.data?.message);
  };

  const { mutate, isLoading } = createModel(onSuccess, onError);

  return (
    <>
      <button
        onClick={() => setMenuAddOpen(!menuAddOpen)}
        className="nav-btn bg-mainBtn hover:bg-opacity-80 duration-300 transition-all  "
      >
        Create A Model
      </button>
      <Transition appear show={menuAddOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[99999]"
          onClose={() => {
            setMenuAddOpen(false);
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center mobile:items-end justify-center p-4 text-center backdrop-blur-sm">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="bg-[#fffffff5] backdrop-blur-xl  z-100 w-full max-w-md transform overflow-hidden rounded-2xl  p-2 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    <div className="rounded-2xl flex justify-between items-center text-left  py-4 pr-4">
                      <div className="text-left w-full flex justify-between items-center">
                        <h2 className="flex w-full justify-start items-center text-lg font-semibold  text-black dark:text-slate-900 ">
                          Add A Model
                        </h2>
                        <IoMdClose
                          onClick={() => {
                            setMenuAddOpen(false);
                          }}
                          className="bg-HoverLight dark:bg-HoverDark  text-black dark:text-black rounded-2xl p-1 text-xl"
                        />
                      </div>
                    </div>
                  </Dialog.Title>
                  <div className="overflow-hidden    h-[80%] w-[100%] text-left rounded-2xl relative">
                    {isLoading ? (
                      <div className="absolute w-full h-full flex justify-center items-center">
                        <BounceLoader size={50} />
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="z-[998] px-1 h-full ">
                      <div className="flex flex-col justify-start h-full ">
                        <div className="">
                          <form
                            className=" h-full flex flex-col justify-between"
                            onSubmit={handleSubmit(onSubmit)}
                          >
                            <div>
                              <div className="">
                                <div className="mb-2">
                                  <label className="block mb-2 text-[12px] font-[500px]  text-black dark:text-slate-900">
                                    Full Name
                                  </label>
                                  <input
                                    type="text"
                                    className="bg-[#0000001c]  rounded-2xl text-black placeholder:text-black  border-none outline-none placeholder:text-[12px] placeholder:font-[400px]  text-sm block w-full p-2.5"
                                    placeholder="Enter Full Name"
                                    {...register("name", {
                                      required: "First name is required",
                                      pattern: {
                                        value: /^[A-Z][a-z]/i,
                                        message:
                                          "Enter first name (alphabetic characters only)",
                                      },
                                      minLength: {
                                        value: 3,
                                        message:
                                          "Minimum length of first name should be 3 ",
                                      },
                                    })}
                                  />
                                  {errors.name ? (
                                    <p className="text-xs text-orange-700">
                                      {errors.name.message}
                                    </p>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                              <div className="">
                                <div className="mb-2">
                                  <label className="block mb-2 text-[12px] font-[500px]  text-black dark:text-slate-900">
                                    Username
                                  </label>
                                  <input
                                    type="text"
                                    className="bg-[#0000001c]  rounded-2xl text-black placeholder:text-black  border-none outline-none placeholder:text-[12px] placeholder:font-[400px]  text-sm block w-full p-2.5"
                                    placeholder="Enter the Username"
                                    {...register("username", {
                                      required: "Last name is required",
                                      pattern: {
                                        value: /^[A-Z][a-z]/i,
                                        message:
                                          "Enter last name (alphabetic characters only)",
                                      },
                                      minLength: {
                                        value: 3,
                                        message:
                                          "Minimum length of last name should be 3 ",
                                      },
                                    })}
                                  />
                                  {errors.username ? (
                                    <p className="text-xs text-orange-700">
                                      {errors.username.message}
                                    </p>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                              <div className="">
                                <div className="mb-2">
                                  <label className="block mb-2 text-[12px] font-[500px]  text-black dark:text-slate-900">
                                    Gender
                                  </label>
                                  <select
                                    className="bg-[#0000001c]  rounded-2xl text-black placeholder:text-black  border-none outline-none  placeholder:text-[12px] placeholder:font-[400px]  text-sm block w-full p-2.5"
                                    {...register("gender", {
                                      required: "Gender is required",
                                    })}
                                  >
                                    <option className="text-sm" value="">Select Gender</option>
                                    <option className="text-sm" value="Male">Male</option>
                                    <option className="text-sm" value="Female">Female</option>
                                    <option className="text-sm" value="Anime">Anime</option>
                                  </select>
                                  {errors.gender && (
                                    <p className="text-xs text-orange-700">
                                      {errors.gender.message}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="">
                                <div className="mb-2">
                                  <label className="block mb-2 text-[12px] font-[500px]  text-black dark:text-slate-900">
                                    Description
                                  </label>
                                  <input
                                    type="tel"
                                    className="bg-[#0000001c]  rounded-2xl text-black placeholder:text-black  border-none outline-none placeholder:text-[12px] placeholder:font-[400px]  text-sm block w-full p-2.5"
                                    placeholder="Enter the Description"
                                    {...register("description")}
                                  />
                                  {errors.description ? (
                                    <p className="text-xs text-orange-700">
                                      {errors.description.message}
                                    </p>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                              <div className="">
                                <div className="mb-2">
                                  <label className="block mb-2 text-[12px] font-[500px]  text-black dark:text-slate-900">
                                    Age
                                  </label>
                                  <input
                                    type="text"
                                    className="bg-[#0000001c]  rounded-2xl text-black placeholder:text-black  border-none outline-none placeholder:text-[12px] placeholder:font-[400px]  text-sm block w-full p-2.5"
                                    placeholder="Enter Age"
                                    {...register("age", {
                                    })}
                                  />
                                  {errors.age ? (
                                    <p className="text-xs text-orange-700">
                                      {errors.age.message}
                                    </p>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                              <div className="">
                                <div className="mb-2">
                                  <label className="block mb-2 text-[12px] font-[500px]  text-black dark:text-slate-900">
                                    Profile Picture
                                  </label>
                                  <input
                                    type="tel"
                                    className="bg-[#0000001c]  rounded-2xl text-black placeholder:text-black  border-none outline-none placeholder:text-[12px] placeholder:font-[400px]  text-sm block w-full p-2.5"
                                    placeholder="Profile Picture"
                                    {...register("profilePicture",)}
                                  />
                                  {errors.profilePicture ? (
                                    <p className="text-xs text-orange-700">
                                      {errors.profilePicture.message}
                                    </p>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                              <div className="">
                                <div className="mb-2">
                                  <label className="block mb-2 text-[12px] font-[500px]  text-black dark:text-slate-900">
                                    Address
                                  </label>
                                  <textarea
                                    className="bg-[#0000001c]  rounded-2xl text-black placeholder:text-black  border-none outline-none placeholder:text-[12px] placeholder:font-[400px]  text-sm block w-full p-2.5"
                                    placeholder="Enter the Address"
                                    {...register("address", {
                                      required: "Address is required",
                                      minLength: {
                                        value: 3,
                                        message:
                                          "Minimum length of Address should be 3 ",
                                      },
                                    })}
                                  />
                                  {errors.address ? (
                                    <p className="text-xs text-orange-700">
                                      {errors.address.message}
                                    </p>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                              <div className="flex justify-end items-center ">
                                {isLoading ? (
                                  <button
                                    className=" nav-btn bg-mainBtn dark: text-black font-semibold  py-2 px-5 rounded-2xl w-full mt-4"
                                    type="submit"
                                    disabled
                                  >
                                    <BeatLoader color="white" size={13} />
                                  </button>
                                ) : (
                                  <button
                                    className="nav-btn bg-mainBtn dark: text-black font-semibold  py-2 px-5 rounded-full w-36 mt-4"
                                    type="submit"
                                  >
                                    Submit
                                  </button>
                                )}
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CreateModelPopUp;
