import React from "react";

const Feedback = () => {
  return (
    <>
      <div className="px-5 w-full overflow-y-auto h-[88vh]">
        <div className="pt-10">
          <h1 className="text-xl text-redText">Feedback</h1>
          <div className="rounded-lg bg-whiteBg border-[2px]  mt-5 p-5">
            <textarea
              placeholder="Write your feedback here"
              rows={10}
              className=" text-darkText bg-whiteBg border-none bg-transparent focus:outline-none resize-none w-full"
            />
          </div>
          <div className="mt-5 flex justify-end">
            <button className="nav-btn bg-mainBg  hover:bg-opacity-80 transition-all duration-300 rounded-xl">
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Feedback;
