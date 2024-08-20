import Link from "next/link";
import { TbBoxModel, TbLayoutSidebarLeftCollapseFilled, TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { RiAdminFill, RiLogoutBoxLine } from "react-icons/ri";
import useAuthStore from "@/store/authStore";
import { useState, useEffect, useRef, Fragment } from "react";
import useChatSideBarStore from "@/store/chatSidebarStore";
import useChatSideBarHoverStore from "@/store/chatSidebarHoverStore";


function Sidebar() {
    const user = useAuthStore((state) => state.user);
    const [activeButton, setActiveButton] = useState("");
    const { isHovered, setIsHovered } = useChatSideBarHoverStore();
    const { showSideBar, setShowSideBar } = useChatSideBarStore();
    const [smallScreen, setSmallScreen] = useState(false)
    
    useEffect(() => {
        // Function to update showSideBar based on screen size
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            // Define your screen size range
            const isSmallScreen = screenWidth >= 0 && screenWidth <= 767;
            setSmallScreen(isSmallScreen)
            // Set showSideBar based on the screen size condition
            setShowSideBar(!isSmallScreen);
        };
        // Add event listener for window resize
        window.addEventListener("resize", handleResize);
        // Initial call to handleResize to set the initial showSideBar value
        handleResize();
        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [setShowSideBar]);

    const handleButtonClick = (button: any) => {
        setActiveButton(button);
    };

    return (
        <>
            <div
                className={`${showSideBar
                    ? "hidden"
                    : "fixed top-0 left-0 text-[24px] z-[1995] w-16 p-4 py-5 flex justify-center items-center"
                    }`}
            >
                <button
                    onClick={() => {
                        setShowSideBar(true);
                    }}
                    style={{ zIndex: 9999 }}
                    className="text-[24px] rounded-lg bg-HoverLight dark:bg-HoverDark p-1  text-white  dark:text-black flex justify-center items-center"
                >
                    <TbLayoutSidebarLeftExpandFilled />
                </button>
            </div>
            <nav
                className={`${!showSideBar
                    ? "hidden"
                    : `h-screen fixed top-0 left-0 ${isHovered || smallScreen ? "w-[250px]" : "w-16"
                    } z-[99999] text-black bg-[#000000] dark:bg-[#202123] px-4 pt-5`
                    }`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {" "}
                <button
                    onClick={() => {
                        setShowSideBar(false);
                    }}
                    className={`${isHovered || smallScreen
                        ? "flex justify-start items-center gap-4 text-[24px] mb-[20px] rounded-lg bg-HoverLight dark:bg-HoverLight  text-white w-full"
                        : "text-[24px] mb-[20px] rounded-lg bg-HoverLight dark:bg-HoverLight p-1  text-white w-full flex justify-center items-center"
                        }`}
                >
                    <div
                        className={`${isHovered || smallScreen ? "flex justify-center items-center w-[20%]" : "hidden"
                            }`}
                    >
                        <TbLayoutSidebarLeftCollapseFilled />
                    </div>
                    <TbLayoutSidebarLeftCollapseFilled
                        className={`${(isHovered || smallScreen) && "hidden"}`}
                    />
                    <button
                        className={`${isHovered || smallScreen
                            ? "text-primaryLight text-left py-2 font-semibold text-sm"
                            : "hidden"
                            }`}
                    >
                        Hide Sidebar
                    </button>
                </button>
                <div className="flex flex-col justify-between h-[90vh]">
                    <div
                        className={`${isHovered || smallScreen
                            ? "flex flex-col w-full gap-2 md:gap-4 justify-start items-center"
                            : "mt-4"
                            }`}
                    >
   

                        {/* ... other buttons ... */}

                        {/* <Link href="/botManagement">
              <button
                className={`sidebar-button p-1 rounded-full text-[#d6d9dd] dark:text-white ${activeButton === "botmanagement" ? "active" : ""
                  }`}
                onClick={() => handleButtonClick("botmanagement")}
              >
                <AiFillRobot />
              </button>
            </Link>
            <Link href="/popUp">
              <button
                className={`sidebar-button p-1 rounded-full text-[#d6d9dd] dark:text-white ${activeButton === "pop-up" ? "active" : ""
                  }`}
                onClick={() => handleButtonClick("pop-up")}
              >
                <TbBoxModel />
              </button>
            </Link> */}
                    </div>
                    <div
                        className={`${isHovered || smallScreen
                            ? "flex flex-col justify-center items-center gap-2 md:gap-4 mb-[20px]"
                            : "flex flex-col justify-center items-center"
                            }`}
                    >


                        {user ? (
                            <>
                              
                                <div
                                    className={`${isHovered || smallScreen
                                        ? "flex justify-center gap-4 items-center w-full"
                                        : ""
                                        }`}
                                   
                                >
                                    <button
                                        className={`${isHovered || smallScreen
                                            ? "flex items-center justify-center h-full sidebar-button-expand"
                                            : "sidebar-button"
                                            } p-1 rounded-full text-[#d6d9dd] dark:text-white ${activeButton === "profile" ? "active" : ""
                                            }`}

                                        title="Logout"
                                    >
                                        <RiLogoutBoxLine />
                                    </button>
                                    <button
                                        className={`${isHovered || smallScreen
                                            ? "bg-[#efefef0e]   hover:bg-HoverLight dark:hover:bg-HoverDark  rounded-2xl text-primaryLight text-left pl-4 w-full p-2 font-semibold text-sm"
                                            : "hidden"
                                            }`}
                                    >
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <Link href="/login">
                                <button
                                    className={`border-none mb-1 text-2xl cursor-pointer bg-transparent text-[#d6d9dd] dark:text-white`}
                                >
                                    <h1 className="text-2xl">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6 font-bold text-xl"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                                            />
                                        </svg>
                                    </h1>
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Sidebar;