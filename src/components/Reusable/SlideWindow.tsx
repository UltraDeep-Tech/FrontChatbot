"use client";
import React, { useState, useRef, useEffect } from "react";


const SlideWindow = ({
  children,
  menuAddOpen,
  setMenuAddOpen,
}: {
  children: any;
  menuAddOpen: any;
  setMenuAddOpen: any;
}) => {
  
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleAddMenu = () => setMenuAddOpen(!menuAddOpen);

  const handleOutsideClick = (event: any) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuAddOpen(false);
    }
  };

  useEffect(() => {
    if (menuAddOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [menuAddOpen]);

  return (
    <div
      ref={menuRef}
      className={
        menuAddOpen
          ? "fixed top-0 sm:py-2 z-50 flex flex-col sm:right-[35px] right-[2px] sm:w-[30%] w-full h-screen   ease-in-out duration-500"
          : "fixed left-[-550%] top-[12vh]  ease-in-out duration-500"
      }
    >
      <div className="h-full">{children}</div>
    </div>
  );
};

export default SlideWindow;
