import React, { useState } from "react";
import AiCharImageSlider from "./AiCharImageSlider";
import { MdClose, MdDone, MdOutlineKeyboardArrowRight } from "react-icons/md";



const AiCharProfile = ({ GetSingleModelData, setIsOpen }: { GetSingleModelData: any, setIsOpen: any }) => {




  return (
    <>
      <div className="backdrop-blur-lg bg-[#ffffff2c] p-4 mt-5 rounded-2xl h-[80%] sm:h-[88%] relative">
        <button title="Back" type="button" onClick={() => setIsOpen(false) } className="z-10 absolute cursor-pointer rounded-full flex justify-center items-center p-2 bg-[#00000011]">
          <MdOutlineKeyboardArrowRight className=" text-darkText text-3xl cursor-pointer" />
        </button>
        <AiCharImageSlider images={GetSingleModelData?.data.profilePicture} GetSingleModelData={GetSingleModelData} />
       
      </div>
    </>
  );
};

export default AiCharProfile;
