import React from "react";

const AiChatBubble = ({message}: any) => {
  return (
    <>
      <div>
        <div className="flex items-start gap-2.5">
          {/* <img
            className="w-8 h-8 rounded-full"
            src="https://ik.imagekit.io/b0pi84uq2/GentleMan.AI/dp.webp?updatedAt=1702653040487"
            alt="Jese image"
          /> */}
          <div className="flex flex-col w-[50%] sm:w-fit max-w-[320px] leading-1.5 p-2 border-btnBorder bg-cardBg rounded-e-xl rounded-es-xl ">
            {/* <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="text-sm font-semibold text-white">Alina</span>
              <span className="text-sm font-normal text-gray-400">11:46</span>
            </div> */}
            <p className="text-sm font-normal py-2.5 text-white">
              {message}
            </p>
            {/* <span className="text-sm font-normal text-gray-500 ">
              Delivered
            </span> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default AiChatBubble;
