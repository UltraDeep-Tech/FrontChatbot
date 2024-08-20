import React from 'react';
import Image from "next/image";
import Link from "next/link";

const generatePlaceholder = () => "data:image/svg+xml;base64," + Buffer.from(`<svg width="300" height="600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 600" preserveAspectRatio="none"><rect width="300" height="600" fill="#E0E0E0"/></svg>`).toString('base64');

export default function Cards({ data }: { data: any }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-6">
      {data?.map((item: any, index: any) => (
        <Link
          key={index}
          href={`/chatPage/${item._id}`}
          className="group relative overflow-hidden rounded-3xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-2"
        >
          <div className="aspect-[1/2] w-full min-h-[400px] max-h-[550px] min-w-[200px] max-w-[400px]">
            <div className="relative h-full w-full overflow-hidden">
              <Image
                src={item.profilePicture[0]}
                alt={item.name}
                layout="fill"
                objectFit="cover"
                objectPosition="top"
                className="transition-transform duration-500 group-hover:scale-110"
                blurDataURL={generatePlaceholder()}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
            </div>
          </div>
          
          <div className="absolute inset-0 flex flex-col justify-center items-center p-6 transition-all duration-300">
            <div className="text-center transition-transform duration-500 group-hover:-translate-y-2">
              <h2 className="text-3xl font-bold text-white mb-3">
                {item.name}
              </h2>
              <p className="text-sm text-white opacity-0 max-h-0 transition-all duration-500 group-hover:opacity-100 group-hover:max-h-[300px] ">
                {item.description}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}