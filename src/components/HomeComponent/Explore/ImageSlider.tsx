"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import api from "@/lib/api";
import ModelPicture from "@/components/ChatPage/ModelPicture";

const ImageSlider = ({ images }: any) => {
  const settings = {
    dots: false,
    fade: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <Slider className=" rounded-2xl h-[500px] w-full" {...settings}>
        {images.map((image: any, index: number) => (
          <div
            key={index}
            className="  h-[500px] rounded-2xl relative w-full"
          >
            <ModelPicture size={30} user={null} path={image} />

            {/* <Image
              src={image}
              alt={`Slide ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="rounded-2xl brightness-90"
              objectPosition="center center"
            /> */}
          </div>
        ))}
      </Slider>
    </>
  );
};

export default ImageSlider;
