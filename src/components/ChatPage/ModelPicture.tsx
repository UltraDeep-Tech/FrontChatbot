import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

function ModelPicture({
  size,
  user,
  path,
}: {
  size: number;
  user: any;
  path: string;
}) {


  return (
    <div>
      {path ? (
        <>

          <Image
            src={`${path}?t=${Date.now()}`}
            alt={`Slide ${path}`}
            layout="fill"
            objectFit="cover"
            objectPosition="top"
            className="rounded-2xl brightness-90"
          // objectPosition="center center"
          />
          {/* <img
            src={data?.data}
            alt={`Profile Picture`}
            className={` sm:min-w-[162px] min-w-full h-[300px] object-cover rounded-lg mx-auto  bg-white`}
          /> */}
        </>
      ) : (
        <>
          <h1 className="flex gap-2 justify-center items-center mb-1">
            <span className="font-black focus:font-black w-10 h-10 text-black flex justify-center items-center text-lg rounded-full bg-gray-300">
              {/* {user?.fullName?.toUpperCase().charAt(0)} */}
            </span>
          </h1>
        </>
      )}
    </div>
  );
}

export default ModelPicture;
