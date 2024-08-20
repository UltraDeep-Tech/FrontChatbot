"use client";
import React, { useEffect, useState } from "react";
import ChatUi from "./ChatUi";
import { FaAngleDoubleLeft } from "react-icons/fa";
import SlideWindow from "../Reusable/SlideWindow";
import AiCharProfile from "./AiCharProfile";
import Image from "next/image";
import cogoToast from "cogo-toast";
import { getSingleModel } from "@/services/AllMutation/getSingleModel";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import ProfilePicture from "./ProfilePicture";
import useAuthStore from "@/store/authStore";
import { usePathname, useRouter } from "next/navigation";
import CharacterPopUp from "../Character/CharacterPopUp";

const ChatPage = ({ getAns, getAudio, id }: { getAns: any; getAudio: any; id: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const route = useRouter();
  const [showPopUpVoice, setShowPopupVoice] = useState(false);
  const pathname = usePathname();
  const { user } = useAuthStore();
  const router = useRouter();

  const onSuccess = (res: any) => {
    console.log("res", res);
  };

  const onError = (res: any) => {
    cogoToast.error(res.data.message);
  };

  const { data: GetSingleModelData, isLoading: gettingModel, isRefetching } = getSingleModel(id, onSuccess, onError);

  useEffect(() => {
    if (!user) {
      console.log(user);
      route.push("/login?redirect=" + pathname);
    }
  }, [user, route, pathname]);

  return (
    <div className="sm:ml-4 ml-0 w-full h-full rounded-2xl">
      <div
        className="flex flex-col h-full bg-black rounded-2xl border-4 border-mainSecond transition-all duration-300 hover:shadow-2xl hover:shadow-mainSecond/20"
        style={{
          backgroundImage: `url('images/pattern.png')`,
        }}
      >
        <div className="h-[70px] border-lineColor px-4 rounded-t-2xl">
          <div className="flex h-full flex-row justify-between items-center">
            <div className="py-2 flex flex-row items-center gap-2 group cursor-pointer transition-transform duration-300 hover:scale-105">
              <div className="w-10 h-10 relative rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-110">
                <div onClick={() => setShowPopupVoice(true)}>
                  <ProfilePicture size={15} user={GetSingleModelData?.data} path={GetSingleModelData?.data?.profilePicture[0]} />
                </div>
              </div>
              <div>
                <h1 className="text-xl text-redText font-bold transition-colors duration-300 group-hover:text-white">
                  {GetSingleModelData?.data?.name}
                </h1>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(true)}
              className="px-5 py-2 flex items-center justify-center transition-transform duration-300 hover:scale-110"
            >
              <MdOutlineKeyboardArrowRight className="w-10 h-10 text-white transform rotate-180" />
            </button>
          </div>
        </div>
        <div className="flex-grow flex flex-col border-white rounded-b-2xl">
          <ChatUi
            showPopUpVoice={showPopUpVoice}
            setShowPopupVoice={setShowPopupVoice}
            getAns={getAns}
            getAudio={getAudio}
            GetSingleModelData={GetSingleModelData?.data}
          />
        </div>
      </div>
      <CharacterPopUp isOpen={isOpen} setIsOpen={setIsOpen} GetSingleModelData={GetSingleModelData} />
    </div>
  );
};

export default ChatPage;