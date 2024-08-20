"use client";
import React, { Fragment, useRef } from "react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FaAngleDoubleRight, FaCrown } from "react-icons/fa";
import useAuthStore from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import cogoToast from "cogo-toast";
import { Menu, Transition } from "@headlessui/react";
import ProfilePicture from "@/components/ChatPage/ProfilePicture";
import useChatSideBarStore from "@/store/chatSidebarStore";
import { IoCloseCircle, IoMenu } from "react-icons/io5";


const Navbar = () => {
  const currentRoute = usePathname();
  const user = useAuthStore((state: any) => state.user);
  const signOut = useAuthStore((state: any) => state.signOut);
  const [isTop, setIsTop] = useState(true);
  const { showSideBar, setShowSideBar } = useChatSideBarStore();
  const pathname = usePathname()
  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const { mutate: logout } = useMutation(() => api.post("/auth/sign-out/"), {
    onSuccess: (res: any) => {
      cogoToast.success("Logout successfully");
      signOut();
    },
    onError: ({ response }: any) => {
      // console.log('er',response)
      cogoToast.error(response?.data?.message);
    },
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current?.contains(event.target as Node)
      ) {
        closeMobileMenu();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <div
        className={`navbar border-b-2 border-mainSecond from-[#1a012b] to-[#111111]   text-whiteText sm:p-2 p-2  h-[70px]  ${isTop ? "top" : ""
          }`}
      >
        <div className="sm:px-5 h-full flex items-center w-full">
          <div className="flex flex-row items-center gap-3 w-full ">
            <div className="flex justify-between items-center w-full ">
              {" "}
              <div className="flex gap-2 items-center">
                {
                  ((pathname.includes("/chatPage") || pathname == "/")) &&
                  <div className="block md:hidden">
                    {
                      showSideBar ? (
                        <>
                          <IoCloseCircle onClick={() => setShowSideBar(false)} className="cursor-pointer text-3xl mb-2" />
                        </>
                      ) : (
                        <>
                          <IoMenu onClick={() => setShowSideBar(true)} className="cursor-pointer text-3xl mb-2" />
                        </>
                      )
                    }
                  </div>
                }
                <Link href={"/"} className="font-bold text-lg">
                  <Image
                    src="/images/logo----.png"
                    width={250}
                    height={100}
                    alt="Img"
                    objectFit="cover"
                  />{" "}
                </Link>
              </div>
              <div className="hidden ">
                <div className="flex flex-row gap-5">
                  <Link href="/">
                    <button className="flex flex-row items-center gap-1 nav-btn hover:bg-gradient-radial bg-gradient-to-r from-pink-500 to-blue-500 duration-900 transition-all">
                      <Image
                        src="/images/navbar/explore.svg"
                        width={20}
                        height={20}
                        alt="Img"
                      />{" "}
                      <span className="hidden xl:block">Explore</span>
                    </button>
                  </Link>

                  <Link href="/subscription">
                    <button className="flex flex-row items-center gap-1 nav-btn hover:bg-gradient-radial bg-gradient-to-r from-pink-500 to-blue-500 duration-900 transition-all">

                      {" "}
                      <FaCrown className="text-[#fabd3a]" />{" "}
                      <span className="hidden xl:block text-[#ffffffc0]">
                        {" "}
                        Get More With{" "}
                        <span className="text-white font-bold">Premium</span>
                      </span>
                    </button>
                  </Link>
                </div>
              </div>
              <div className="">
                <div className="flex flex-row gap-5 z-100">
                  {user ? (
                    <>
                      <div className="flex justify-center items-center ">

                        <Menu
                          as="div"
                          className="flex justify-center items-center relative text-left"
                        >
                          {/* <div className="flex justify-center items-center"> */}
                          <Menu.Button className="flex justify-center items-center w-full rounded-full text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                            <ProfilePicture
                              size={12}
                              user={user}
                              path={user.profilePicture}
                            />
                          </Menu.Button>
                          {/* </div> */}
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute z-100 right-16 mt-32 translate-x-1/4 w-56 origin-top-right divide-y rounded-md backdrop-blur-lg bg-[#0000007f] bg-BtnBg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <div className="px-1 py-1 ">
                                <Menu.Item >
                                  {({ active }) => (
                                    <div>

                                      <Link
                                        className={`${active
                                          ? " bg-creamBG  text-darkText"
                                          : "text-white"
                                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        href="/user-profile"
                                        onClick={closeMobileMenu}
                                      >
                                        Profile
                                      </Link>
                                    </div>

                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <div>

                                      <Link
                                        className={`${active
                                          ? " bg-creamBG  text-darkText"
                                          : "text-white"
                                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        href="/plandetails"
                                        onClick={closeMobileMenu}
                                      >
                                        My Plan
                                      </Link>
                                    </div>

                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <div>

                                      <button
                                        className={`${active
                                          ? " bg-creamBG  text-darkText"
                                          : "text-white"
                                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        onClick={() => logout()}
                                      >
                                        Logout
                                      </button>
                                    </div>

                                  )}
                                </Menu.Item>
                              </div>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </>
                  ) : (
                    <>
                      <Link href="/login" className="hover:scale-105 duration-500 ease-in-out ">
                        <button className=" p-4 text-sm sm:text-xl font-[500] italic shadow-lg rounded-lg py-2  text-white bg-sideBarBtnBg hover:hoverBtnBg ">
                          Login
                        </button>
                      </Link>

                    </>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </>
  );
};

export default Navbar;
