"use client";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getAllSessions } from "@/services/AllMutation/getAllSessions";
import useChatSideBarStore from "@/store/chatSidebarStore";
import useChatSideBarHoverStore from "@/store/chatSidebarHoverStore";
import { CgLoadbar } from "react-icons/cg";
import { PiCaretLeftBold } from "react-icons/pi";
import { IoMenu } from "react-icons/io5";
import ChatBoxComponent from "@/components/ChatBox/ChatBoxComponent";
import { IoCloseCircle } from "react-icons/io5";


const ChatBox = () => {

  const pathname = usePathname()
  const { showSideBar, setShowSideBar } = useChatSideBarStore();
  const [isHoveredIcon, setisHoveredIcon] = useState(false);
  const { isHovered } = useChatSideBarHoverStore();
  const onSuccess = (res: any) => {
    console.log("res", res);
  };

  const onError = (res: any) => {
    // cogoToast.error("No");
  };
  const {
    data: GetAllSessions,
    isLoading: gettingSessions,
    isRefetching,
  } = getAllSessions(onSuccess, onError);


  return (
    <>

      {!(!GetAllSessions || GetAllSessions?.data?.length === 0) && ((pathname.includes("/chatPage") || pathname == "/")) && (
        // <ChannelsSideBar>
        <>
          <div className={`relative hidden md:block z-10 h-full ${!showSideBar ? "w-0" : "md:w-[320px]"}`}>
            {showSideBar === false ? (
              <div
                className={`${isHovered
                  ? "hidden"
                  : `top-0 left-0 ${showSideBar === false
                    ? "ml-[4px]"
                    : "ml-[55px] sm:ml-0 sm:hidden"
                  } fixed text-3xl text-white h-full flex justify-center items-center dark:text-black p-2 rounded`
                  }`}
              >
                <button
                  style={{ zIndex: 50 }}
                  onMouseEnter={() => setisHoveredIcon(true)}
                  onMouseLeave={() => setisHoveredIcon(false)}
                  onClick={() => setShowSideBar(true)}
                >
                  <CgLoadbar
                    className={`${!isHoveredIcon ? "rotate-90" : "hidden"} text-white`}
                  />
                  <PiCaretLeftBold
                    className={`rotate-180 ${isHoveredIcon ? "" : "hidden"}  text-white`}
                  />
                </button>
              </div>
            ) : (
              <div
                style={{ zIndex: 50 }}
                className={`${isHovered
                  ? "hidden"
                  : `top-0 absolute ${showSideBar
                    ? "right-0"
                    : "ml-[180px] "
                  } h-full flex justify-center items-center fixed text-3xl text-white dark:text-black p-2 rounded`
                  }`}
              >
                <button
                  style={{ zIndex: 50 }}
                  onMouseEnter={() => setisHoveredIcon(true)}
                  onMouseLeave={() => setisHoveredIcon(false)}
                  onClick={() => setShowSideBar(false)}
                >
                  <CgLoadbar
                    className={`${!isHoveredIcon ? "rotate-90" : "hidden"} text-white`}
                  />
                  <PiCaretLeftBold className={`${isHoveredIcon ? "" : "hidden"} text-white`} />
                </button>
              </div>
            )}
            {
              showSideBar && <ChatBoxComponent />
            }
          </div>
        </>

      )}

    </>
  );
};

export default ChatBox;
