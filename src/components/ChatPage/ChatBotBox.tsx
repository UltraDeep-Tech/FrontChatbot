"use client";
import { useState } from "react";
import ProfilePicture from "./ProfilePicture";
// import TextToSpeech from "./TextToSpeech";

export default function Chatbotbox({ message, activeMsg,
  user,
  model,
  setactiveMsg }:
  { message: any, activeMsg?: string, user: any, model: any, setactiveMsg?: any }) {

  // Check if message is a string, if not, set it to an empty string

  const getDate = (d: any) => {
    const newDate = new Date(d)
    const dd = newDate.toLocaleDateString("en-IN", { minute: "2-digit", hour: "2-digit", })
    return String(dd)
  }

  return (
    <>
      <div className="flex items-start gap-2.5 ">
        <div className="w-10 h-10 relative rounded-full overflow-hidden">

          {message?.fromUser ? (<>
            <ProfilePicture size={10} user={user} path={user?.profilePicture} /></>) : (<>
              <ProfilePicture size={12} user={model} path={model?.profilePicture[0]} />
            </>)}

        </div>
        <div className="flex flex-col gap-1 w-full max-w-[320px]">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="text-lg font-semibold text-black/80  ">
              {message?.fromUser ? user?.firstName : model?.name}
            </span>
            <span className="text-sm font-normal text-gray-500  ">{getDate(message?.createdAt)}</span>
          </div>
          <div className="flex flex-col leading-1.5 pb-1 rounded-e-xl rounded-es-xl  ">
            <p className="text-lg font-normal text-gray-700 break-words "> {message?.text}</p>
          </div>
          {/* <span className="text-sm font-normal text-gray-300  ">Delivered</span> */}
        </div>
      </div>
    </>

  );
}
