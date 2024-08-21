/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import cogoToast from "cogo-toast";
import api from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import jwtDecode from "jwt-decode";
import { BeatLoader, BounceLoader } from "react-spinners";
import { useRouter, useSearchParams } from "next/navigation";
import useAuthStore from "@/store/authStore";
import FacebookLogin from "react-facebook-login";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

type FormValue = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  terms: boolean;
  department: string;
};

const Register = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPopOpen, setIsPopOpen] = useState(false);
  const [isInvite, setIsInvite] = useState(false);
  const [email, setEmail] = useState("");
  const [gReg, setgReg] = useState(false);
  const signIn = useAuthStore((state) => state.signIn);
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENTID;
  const user = useAuthStore((state) => state.user);
  const signOut = useAuthStore((state) => state.signOut);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValue>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      terms: false,
      department: "", // Aquí debería ir una cadena vacía
    },
  });

  const query = useSearchParams();
  const token = query.get("token");
  const [readOnly, setReadOnly] = useState(false);

  const {
    isLoading: loadingToken,
    isError,
    isSuccess,
    data,
    isPreviousData,
    error,
    refetch,
    isFetching,
  } = useQuery(
    ["userInvite"],
    () => api.get(`inviteNewUser/verifytoken/${token}`),
    {
      enabled: !!token,
      onSuccess: (res) => {
        console.log(res.data);
        setReadOnly(true);
        setEmail(res?.data?.email);
        setValue("email", res?.data?.email);
      },
      onError: ({ response }) => {
        console.log("error", response);
      },
    }
  );

  const { mutate, isLoading } = useMutation(
    (data) => api.post("auth/register", data),
    {
      onSuccess: (res: any) => {
        console.log(res);
        signIn(res.data);
        setIsOpen(true);
        router.push("/");
        reset();
      },
      onError: ({ response }: any) => {
        console.log(response.data);
        cogoToast.error(response?.data?.message);
      },
    }
  );

  const onSubmit = (data: FormValue) => {
    let datas = JSON.parse(JSON.stringify(data));
    datas.email = datas.email.toLowerCase();

    if (!isLoading && !lodingGoogleAuth) {
      mutate(datas);
    }
  };

  const { mutate: gLogin, isLoading: lodingGoogleAuth } = useMutation(
    (data: any) => api.post("auth/google", data),
    {
      onSuccess: (res) => {
        console.log(res.data);
        signIn(res.data.user);
        reset();
        if (res.data.message === "register") {
          cogoToast.success("Registered successfully");
          setgReg(true);
        }
        if (res.data.message === "login") {
          cogoToast.success("Login successfully");
          router.push("/");
        }
      },
      onError: ({ response }) => {
        cogoToast.error(response?.data?.data);
      },
    }
  );

  const handleCallbackResponse = (response: any) => {
    const userDetails: any = jwtDecode(response.credential);
    console.log(userDetails);
    gLogin({
      ...userDetails,
      email: userDetails?.email,
      firstName: userDetails?.given_name,
      lastName: userDetails?.family_name,
      profilePicture: userDetails?.picture,
    });
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://accounts.google.com/gsi/client`;
    script.async = true;
    script.onload = () => {
      const resizeButton = () => {
        let buttonWidth;
        if (window.innerWidth - 50 < 400) {
          buttonWidth = 100;
        } else {
          buttonWidth = 200;
        }
        console.log(buttonWidth);

        // @ts-ignore
        google.accounts.id.initialize({
          client_id: clientId,
          callback: handleCallbackResponse,
        });
        // @ts-ignore
        google.accounts.id.renderButton(document.getElementById("signIndiv"), {
          size: "large",
          width: buttonWidth,
        });
      };
      resizeButton(); // Initial sizing

      window.addEventListener("resize", resizeButton);

      return () => {
        window.removeEventListener("resize", resizeButton);
      };
    };
    document.body.appendChild(script);
  }, []);

  const { mutate: logout } = useMutation(() => api.post("/auth/sign-out/"), {
    onSuccess: (res) => {
      cogoToast.success("Logout successfully");
      signOut();
    },
    onError: ({ response }) => {
      cogoToast.error(response?.data?.message);
    },
  });

  return (
    <>
      {isFetching ? (
        <div className="fixed w-[100vw] h-[100vh] flex justify-center items-center">
          <BounceLoader size={100} color={"white"} />
        </div>
      ) : (
        ""
      )}
      <div className="flex rounded-lg w-full items-center justify-center">
        <div className="bg-mainSecond overflow-y-auto max-h-[800px] h-full rounded-[10px] pt-4 pb-6 space-y-4 w-[90%] sm:w-[60%] md:w-[50%] lg:w-[35%] xl:w-[27%]">
          {user && !isPopOpen && !gReg ? (
            <>
              <div className="px-4 gap-4 flex flex-col justify-center items-center">
                <h2>You are already logged in..</h2>
                <button
                  className="flex flex-row items-center w-full justify-center nav-btn bg-mainBtn hover:bg-opacity-80 duration-300 transition-all"
                  onClick={() => logout()}
                >
                  Log out
                </button>
              </div>
            </>
          ) : (
            <>
              <form
                className="px-5 space-y-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex justify-between items-center w-full">
                  <h1 className="text-2xl font-semibold">Register</h1>
                  <Link href="/" className="mr-4 flex justify-end">
                    <img src="/images/close.svg" width={20} height={20} />{" "}
                  </Link>
                </div>

                <div>
                  <label className="block text-[14px] text-gray-400">
                    First Name
                  </label>
                  <div className="relative mt-[2px] rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-[14px]">
                      <img
                        src="/images/firstname.svg"
                        className="text-gray"
                        aria-hidden="true"
                        alt="firstname-icon"
                      />
                    </div>
                    <input
                      type="text"
                      className="block h-[44px] w-full rounded-lg border-0 pl-10 text-[16px] font-light text-gray-400"
                      placeholder="Enter First Name"
                      {...register("firstName", {
                        required: "First name is required",
                        minLength: {
                          value: 3,
                          message: "Minimum length of first name must be 3",
                        },
                      })}
                    />
                    {errors.firstName && (
                      <p className="text-xs text-orange-700">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-[14px] text-gray-400">
                    Last Name
                  </label>
                  <div className="relative mt-[2px] rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-[14px]">
                      <img
                        src="/images/lastname.svg"
                        className="text-gray"
                        aria-hidden="true"
                        alt="lastname-icon"
                      />
                    </div>
                    <input
                      type="text"
                      className="block h-[44px] w-full rounded-lg border-0 pl-10 text-[16px] font-light text-gray-400"
                      placeholder="Enter Last Name"
                      {...register("lastName", {
                        required: "Last name is required",
                        minLength: {
                          value: 3,
                          message: "Minimum length of last name must be 3",
                        },
                      })}
                    />
                    {errors.lastName && (
                      <p className="text-xs text-orange-700">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-[14px] text-gray-400">
                    E-mail
                  </label>
                  <div className="relative mt-[2px] rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-[14px]">
                      <img
                        src="/images/mail.svg"
                        className="text-gray"
                        aria-hidden="true"
                        alt="mail-icon"
                      />
                    </div>
                    <input
                      type="email"
                      className="block h-[44px] w-full rounded-lg border-0 pl-10 text-[16px] font-light text-gray-400"
                      placeholder="you@example.com"
                      readOnly={readOnly}
                      {...register("email", {
                        required: "Email is required",
                      })}
                    />
                    {errors.email && (
                      <p className="text-xs text-orange-700">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-[14px] text-gray-400">
                    Password
                  </label>
                  <div className="relative mt-[2px] rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-[14px]">
                      <img
                        src="/images/lock.svg"
                        className="text-gray"
                        aria-hidden="true"
                        alt="password-icon"
                      />
                    </div>
                    <input
                      type="password"
                      className="block h-[44px] w-full rounded-lg border-0 pl-10 text-[16px] font-light text-gray-400"
                      placeholder="Your password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message: "Minimum length of password must be 8",
                        },
                      })}
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
                    Department
                  </label>
                  <div className="relative mt-[2px] rounded-md shadow-sm">
                    <select
                      {...register("department", {
                        required: "Department is required",
                      })}
                      className="block h-[44px] w-full rounded-lg border-0 pl-3 text-[16px] font-light text-gray-400"
                    >
                      <option value="">Select a department</option>
                      <option value="Account Manager">Account Manager</option>
                      <option value="Customer Service">Customer Service</option>
                      <option value="Sales">Sales</option>
                      <option value="Operations">Operations</option>
                      <option value="Finance">Finance</option>
                      <option value="IT Support">IT Support</option>
                      <option value="Human Resources">Human Resources</option>
                    </select>
                    {errors.department && (
                      <p className="text-xs text-orange-700">
                        {errors.department.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <p className="flex items-start">
                      <input
                        type="checkbox"
                        className="mr-2 mt-1"
                        {...register("terms", {
                          required: "Need to accept terms and conditions",
                        })}
                      />
                      <label className="text-sm ">
                        I agree with
                        <span className="text-blue-500">
                          <Link target="_blank" href={"/terms_and_services"}>
                            {" "}
                            terms of service
                          </Link>
                        </span>
                        {" "}and
                        <span className="text-blue-500">
                          <Link target="_blank" href={"/privacy_policy"}>
                            {" "}privacy policy.
                          </Link>
                        </span>
                      </label>
                    </p>
                    {errors.terms && (
                      <p className="text-xs text-orange-700 mt-0">
                        {errors.terms.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  {isLoading || lodingGoogleAuth ? (
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
                    <button
                      type="submit"
                      className="flex h-12 bg-sideBarBg flex-row items-center w-full justify-center nav-btn bg-mainBtn hover:bg-opacity-80 duration-300 transition-all"
                    >
                      <span className="">Register</span>
                    </button>
                  )}
                </div>
              </form>

              <hr className="border-lineColor w-[100%]" />
              <div className="text-center">
                <h3 className="text-sm font-semibold">
                  Already have an account?{" "}
                  <span>
                    <Link
                      href="/login"
                      className="ml-1 text-navBtnText hover:text-afterBtnText duration-300 transition-all text-sm font-semibold"
                    >
                      Login
                    </Link>
                  </span>
                </h3>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Register;
