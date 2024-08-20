"use client";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import ProfilePicture from "./ProfilePicture";
// import TextToSpeech from "./TextToSpeech";


export default function ChatBotBoxLoader({ model }:
  { model: any }) {
  const getDate = (d: any) => {
    const newDate = new Date(d)
    const dd = newDate.toLocaleDateString("en-IN", { minute: "2-digit", hour: "2-digit", })
    return String(dd)
  }
  return (
    <>

      <div className="flex items-start gap-2.5">
        <div className="w-10 h-10 relative rounded-full overflow-hidden">

          <ProfilePicture size={12} user={model} path={model?.profilePicture[0] || model?.profilePicture} />
        </div>
        <div className="flex flex-col gap-1 w-full max-w-[320px]">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="text-sm font-semibold text-darkText  ">
              {model?.name}
            </span>
            <span className="text-sm font-normal text-gray-500  ">{getDate(new Date())}</span>
          </div>
          <div className="flex flex-col leading-1.5 p-1 rounded-e-xl rounded-es-xl  ">
            <p className="text-sm font-normal text-white  ">
              <BeatLoader size={10} />
            </p>
          </div>
          {/* <span className="text-sm font-normal text-gray-300  ">Delivered</span> */}
        </div>
      </div>

    </>
  );
}
