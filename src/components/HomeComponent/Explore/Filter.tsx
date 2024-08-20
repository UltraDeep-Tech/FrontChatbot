import React, { useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
const Filters = ({ setMenuAddOpen, setAge, age }: any) => {
  const handleAgeChange = (event: any) => {
    setAge(parseInt(event.target.value, 10));
  };
  return (
    <>
      <div className="md:mt-20 backdrop-blur-2xl bg-[#0000002c] p-4 rounded-2xl flex flex-col gap-4 md:h-[88%] h-screen relative">
        <div className="flex justify-start gap-6 items-center">
          <button
            title="Back"
            onClick={() => {
              setMenuAddOpen(false);
            }}
            className="z-10 rounded-full flex justify-center items-center p-2 bg-[#00000011]"
          >
            <MdOutlineKeyboardArrowRight className="text-white text-3xl" />
          </button>
          <p className="text-white text-3xl">Filters</p>
        </div>
        <div>
          <label
            htmlFor="age"
            className="block text-sm font-medium text-[#ffffffbd]"
          >
            Age{" "}
            <span className="text-white ml-1">{age > 0 ? age : "All"}</span>
          </label>
          <div className="flex  mt-2 justify-between gap-4 items-center">
            <button
              onClick={() => {
                setAge(0);
              }}
              className="bg-[#ffffff46] rounded-xl px-2 py-1 text-white"
            >
              All
            </button>
            <div className="flex w-full items-center gap-2 justify-end text-[#ffffffbd]">
              <span>18</span>
              <input
                type="range"
                id="age"
                name="age"
                min="18"
                max="60"
                step="1"
                value={age}
                onChange={handleAgeChange}
                className="w-full appearance-none bg-[#fffbfb61] h-[1.3rem] rounded-full focus:outline-none focus:shadow-outline-indigo focus:border-indigo-300"
              />
              <span>60</span>
            </div>
          </div>
        </div>
        <div>
          <label
            htmlFor="age"
            className="block text-sm font-medium text-[#ffffffbd]"
          >
            Age{" "}
            <span className="text-white ml-1">{age > 0 ? age : "All"}</span>
          </label>
          <div className="flex  mt-2 justify-between gap-4 items-center">
            <button
              onClick={() => {
                setAge(0);
              }}
              className="bg-[#ffffff46] rounded-xl px-2 py-1 text-white"
            >
              All
            </button>
            <div className="flex w-full items-center gap-2 justify-end text-[#ffffffbd]">
              <span>18</span>
              <input
                type="range"
                id="age"
                name="age"
                min="18"
                max="60"
                step="1"
                value={age}
                onChange={handleAgeChange}
                className="w-full appearance-none bg-[#fffbfb61] h-[1.3rem] rounded-full focus:outline-none focus:shadow-outline-indigo focus:border-indigo-300"
              />
              <span>60</span>
            </div>
          </div>
        </div>
        <div>
          <label
            htmlFor="age"
            className="block text-sm font-medium text-[#ffffffbd]"
          >
            Age{" "}
            <span className="text-white ml-1">{age > 0 ? age : "All"}</span>
          </label>
          <div className="flex  mt-2 justify-between gap-4 items-center">
            <button
              onClick={() => {
                setAge(0);
              }}
              className="bg-[#ffffff46] rounded-xl px-2 py-1 text-white"
            >
              All
            </button>
            <div className="flex w-full items-center gap-2 justify-end text-[#ffffffbd]">
              <span>18</span>
              <input
                type="range"
                id="age"
                name="age"
                min="18"
                max="60"
                step="1"
                value={age}
                onChange={handleAgeChange}
                className="w-full appearance-none bg-[#fffbfb61] h-[1.3rem] rounded-full focus:outline-none focus:shadow-outline-indigo focus:border-indigo-300"
              />
              <span>60</span>
            </div>
          </div>
        </div>
        <div>
          <label
            htmlFor="age"
            className="block text-sm font-medium text-[#ffffffbd]"
          >
            Age{" "}
            <span className="text-white ml-1">{age > 0 ? age : "All"}</span>
          </label>
          <div className="flex  mt-2 justify-between gap-4 items-center">
            <button
              onClick={() => {
                setAge(0);
              }}
              className="bg-[#ffffff46] rounded-xl px-2 py-1 text-white"
            >
              All
            </button>
            <div className="flex w-full items-center gap-2 justify-end text-[#ffffffbd]">
              <span>18</span>
              <input
                type="range"
                id="age"
                name="age"
                min="18"
                max="60"
                step="1"
                value={age}
                onChange={handleAgeChange}
                className="w-full appearance-none bg-[#fffbfb61] h-[1.3rem] rounded-full focus:outline-none focus:shadow-outline-indigo focus:border-indigo-300"
              />
              <span>60</span>
            </div>
          </div>
        </div>
        <div>
          <label
            htmlFor="age"
            className="block text-sm font-medium text-[#ffffffbd]"
          >
            Age{" "}
            <span className="text-white ml-1">{age > 0 ? age : "All"}</span>
          </label>
          <div className="flex  mt-2 justify-between gap-4 items-center">
            <button
              onClick={() => {
                setAge(0);
              }}
              className="bg-[#ffffff46] rounded-xl px-2 py-1 text-white"
            >
              All
            </button>
            <div className="flex w-full items-center gap-2 justify-end text-[#ffffffbd]">
              <span>18</span>
              <input
                type="range"
                id="age"
                name="age"
                min="18"
                max="60"
                step="1"
                value={age}
                onChange={handleAgeChange}
                className="w-full appearance-none bg-[#fffbfb61] h-[1.3rem] rounded-full focus:outline-none focus:shadow-outline-indigo focus:border-indigo-300"
              />
              <span>60</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filters;
