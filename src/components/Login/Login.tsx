/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import cogoToast from "cogo-toast";
import api from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import jwtDecode from "jwt-decode";
import { BeatLoader } from "react-spinners";
import useAuthStore from "@/store/authStore";
import FacebookLogin from "react-facebook-login";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Head from "next/head";
import Script from "next/script";
type FormValue = {
  email: string;
  password: string;
  department: string;
};

const Login = () => {
  const signIn = useAuthStore((state: any) => state.signIn);
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENTID;
  let [gReg, setgReg] = useState(false);
  let [isPopOpen, setIsPopOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect')
  const user = useAuthStore((state: any) => state.user);
  const signOut = useAuthStore((state: any) => state.signOut);
  const [alreadyLogin, setalreadyLogin] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (formData: FormValue) => {
    // Copia y manipula los datos del formulario
    let data = JSON.parse(JSON.stringify(formData));
    console.log("formData", formData);
    console.log("data", data);
    
    // Convierte el email a minúsculas
    data.email = data.email.toLowerCase();
  
    // Guarda el departamento seleccionado en localStorage
    localStorage.setItem('department', data.department);
  
    // Ejecuta la mutación si no hay carga en curso
    if (!isLoading && !lodingGoogleAuth) {
      mutate(data);
    }
  };
  

  const { mutate, isLoading } = useMutation(
    (data: any) => api.post("/auth/login/", data),
    {
      onSuccess: (res: any) => {
        console.log("login details ===>", res);
        router.push("/");
        cogoToast.success("Login successfully");
        signIn(res.data);
        setalreadyLogin(true);
        if (redirect) {
          router.push(redirect)
        } else {
          router.push("/");
        }

      },
      onError: ({ response }: any) => {
        console.log("er", response);
        cogoToast.error(response?.data?.message);
      },
    }
  );

  const { mutate: gLogin, isLoading: lodingGoogleAuth } = useMutation(
    (data: any) => api.post("auth/google", data),
    {
      onSuccess: (res: any) => {
        console.log(res.data);
        signIn(res.data.user);
        setalreadyLogin(true);

        if (res?.data?.message === "register") {
          cogoToast.success("Register and Login successfully");
          setgReg(true);
          if (redirect) {
            router.push(redirect)
          } else {
            router.push("/");
          }
        }

        if (res?.data?.message === "login") {
          cogoToast.success("Login successfully");
          if (redirect) {
            router.push(redirect)
          } else {
            router.push("/");
          }
        }
      },
      onError: ({ response }: any) => {
        console.log(response.data);
        cogoToast.error(response?.data?.message);
      },
    }
  );

  const { mutate: fLogin, isLoading: lodingFacebookAuth } = useMutation(
    (data: any) => api.post("auth/facebook", data),
    {
      onSuccess: (res: any) => {
        console.log(res.data);
        signIn(res.data.user);
        setalreadyLogin(true);

        if (res?.data?.message === "register") {
          cogoToast.success("Register and Login successfully");
          setgReg(true);
          if (redirect) {
            router.push(redirect)
          } else {
            router.push("/");
          }
        }

        if (res?.data?.message === "login") {
          cogoToast.success("Login successfully");
          if (redirect) {
            router.push(redirect)
          } else {
            router.push("/");
          }
        }
      },
      onError: ({ response }: any) => {
        console.log(response.data);
        cogoToast.error(response?.data?.message);
      },
    }
  );
  const handleGoogleSignIn = () => {
    console.log("google sign in")
    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENTID,
      callback: handleCallbackResponse,
      auto_select: true,
      login_hint: true,
      allowed_parent_origin: true,
      use_fedcm_for_prompt: true,
      ux_mode: true,
    });
    // https://developers.google.com/identity/gsi/web/reference/html-reference#data-use_fedcm_for_prompt

    window.google.accounts.id.prompt((notification: any) => {
      console.log(notification, "notification", notification.isNotDisplayed(), notification.isSkippedMoment())
      if (notification.isSkippedMoment()) {
        // Handle sign-in errors
        console.error('Sign in was not successful');
      }
    });
  };
  const handleCallbackResponse = (response: any) => {
    console.log("response", response)
    const userDetails: any = jwtDecode(response.credential);
    console.log(userDetails);
    const data = {
      ...userDetails,
      email: userDetails?.email,
      firstName: userDetails?.given_name,
      lastName: userDetails?.family_name,
      // profilePicture: userDetails?.picture,
    };
    console.log(data);
    gLogin(data);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://accounts.google.com/gsi/client`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  const { mutate: logout } = useMutation(() => api.post("/auth/sign-out/"), {
    onSuccess: (res: any) => {
      cogoToast.success("Logout successfully");
      signOut();
    },
    onError: ({ response }: any) => {
      cogoToast.error(response?.data?.message);
    },
  });

  const responseFacebook = (e: any) => {
    console.log('responseFacebook', e);
    const userDetails: any = e
    console.log(userDetails);
    let firstName = userDetails?.name?.split(" ")[0]
    let lastName = userDetails?.name?.split(" ").pop()
    const data = {
      ...userDetails,
      email: userDetails?.email,
      firstName: firstName,
      lastName: lastName && firstName != lastName ? lastName : " ",
      // profilePicture: userDetails?.picture,
    };
    console.log(data);
    fLogin(data);
  }

  useEffect(() => {
    if (user && !alreadyLogin && !isPopOpen && !gReg) {
      if (redirect) {
        router.push(redirect)
      } else {
        router.push("/")
      }
    }

    return () => {
    }
  }, [user, alreadyLogin, isPopOpen, gReg])

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://accounts.google.com/gsi/client`;
    script.async = true;
    script.onload = () => {
      const resizeButton: any = () => {
        let buttonWidth;

        if (window.innerWidth - 50 < 400) {
          buttonWidth = 100;
        } else {
          buttonWidth = 200;
        }

        // let google;
        /* global google */
        // @ts-ignore
        google.accounts.id.initialize({
          // @ts-ignore
          client_id: clientId,
          callback: handleCallbackResponse,
          data_theme: "filled_blue"
        });
        // @ts-ignore
        google.accounts.id.renderButton(document.getElementById("signIndiv"), {
          size: "large",
          width: buttonWidth,
          data_theme: "filled_blue"

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

  return (
    <>

      <div className="flex w-full  items-center justify-center ">
        <div className=" bg-[#ffffff23] overflow-y-auto max-h-[650px] h-full  rounded-[10px] pb-10 bg-BtnBg space-y-4 w-[80%] sm:w-[45%] md:w-[35%] lg:w-[27%]">
          {user && !alreadyLogin && !isPopOpen && !gReg ? (
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


              <div className=" ">
                <h1 className=" text-2xl font-semibold"></h1>
                <div className=" mt-4 px-5 ">
                  <div className=" flex justify-between w-full items-center">
                    <h1 className="text-2xl font-semibold pb-3">Login</h1>

                    <Link href="/" className="mr-4 flex justify-end">
                      <img src="/images/close.svg" width={20} height={20} />{" "}
                    </Link>
                  </div>

                  {/* <button
                    className=" mt-3 h-12 px-4 bg-white flex flex-row items-center w-full justify-center rounded-lg transition-all"

                    // className="flex mt-3 justify-center bg-white items-center text-center gap-2 py-3 text-black w-[100%] font-bold nav-btn bg-mainBtn "
                    type="button"
                  > */}
                    {/* <img
                    alt="..."
                    className="w-3 mr-1"
                    src="/image/fb.svg"
                  /> */}
                    {/* <p className="w-full text-center my-0 px-0">
                      <FacebookLogin
                        appId={String(process.env.NEXT_PUBLIC_Fb_APPID)}
                        autoLoad={false}
                        fields="name,email"
                        // cssClass={BtnFacebook}
                        cssClass="my-facebook-button"
                        icon={(<>  <span className=" py-1 px-2 max-md:px-2">
                          <FaFacebook color="#385898" size={20} />
                        </span>
                        </>)}

                        callback={responseFacebook}

                        textButton=" Login with Facebook"

                      />
                    </p>
                  </button> */}
                  {/* <button
                  className=" mt-3 h-12 px-4 bg-white flex flex-row items-center w-full justify-center rounded-lg transition-all"
                  onClick={handleGoogleSignIn}

                  type="button"
                >


                  <p className="my-facebook-button  text-black  text-center my-0 px-0 -ml-4">
                    <span className=" py-1 px-2 max-md:px-2">
                      <FcGoogle color="#385898" size={20} />
                    </span>
                    Login with Google
                  </p>
                </button> */}
                  {/* <button
                    className="flex g_id_signin mt-3 justify-center items-center text-center gap-2 py-3 text-black w-[100%] font-bold nav-btn bg-mainBtn "
                    id="signIndiv"
                    data-size="medium"
                    data-theme="outline"
                    // data-type="icon"
                    onClick={handleGoogleSignIn}

                  >
                    {" "}
                    // <img src="image/google.png" alt="" /> 
                    Continue With Google
                  </button> */}


                </div>
              </div>


              <form onSubmit={handleSubmit(onSubmit)} className="px-5 space-y-4">
  {/* Campo para el email */}
  <div>
    <label className="block text-[14px] text-gray-400">E-mail</label>
    <div className="relative mt-[7px] rounded-md shadow-sm">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-[14px]">
        <img src="/images/mail.svg" className="text-gray" aria-hidden="true" alt="mail-icon" />
      </div>
      <input
        type="email"
        {...register("email", { required: "Email is required" })}
        autoComplete="current-email"
        className="block h-[44px] w-full rounded-lg border-0 pl-10 text-[16px] font-light text-gray-400"
        placeholder="you@example.com"
      />
      {errors.email && (
        <p className="text-xs text-orange-700">{errors.email.message}</p>
      )}
    </div>
  </div>

  {/* Campo para la contraseña */}
  <div>
    <label className="block text-[14px] text-gray-400">Password</label>
    <div className="relative mt-[7px] rounded-md shadow-sm">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-[14px]">
        <img src="/images/lock.svg" className="text-gray" aria-hidden="true" alt="mail-icon" />
      </div>
      <input
        type="password"
        {...register("password", { required: "Password is required" })}
        autoComplete="current-password"
        className="block h-[44px] w-full rounded-lg border-0 pl-10 text-[16px] font-light text-gray-400"
        placeholder="Your password"
      />
      {errors.password && (
        <p className="text-xs text-orange-700">{errors.password.message}</p>
      )}
    </div>
  </div>

  {/* Campo para seleccionar el departamento */}
  <div>
    <label className="block text-[14px] text-gray-400">Department</label>
    <div className="relative mt-[7px] rounded-md shadow-sm">
      <select
        {...register("department", { required: "Department is required" })}
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
        <p className="text-xs text-orange-700">{errors.department.message}</p>
      )}
    </div>
  </div>

  {/* Botón de envío */}
  <div>
    {isLoading || lodingGoogleAuth ? (
      <button
        type="submit"
        className="flex flex-row items-center w-full justify-center nav-btn bg-mainBtn hover:bg-opacity-80 duration-300 transition-all"
        disabled
      >
        <span>
          <BeatLoader color="white" />
        </span>
      </button>
    ) : (
      <button className="flex h-12 bg-sideBarBg flex-row items-center w-full justify-center nav-btn bg-mainBtn hover:bg-opacity-80 duration-300 transition-all">
        <span>Login</span>
      </button>
    )}
  </div>
</form>


              <hr className=" w-[100%]" />
              <div className="text-center">
                <h3 className="text-sm font-semibold">
                  Don’t have an account yet ?{" "}
                  <span>
                    <Link
                      href="/register"
                      className="mr-1 text-navBtnText hover:text-afterBtnText duration-300 transition-all text-sm font-semibold"
                    >
                      Register
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

export default Login;
