import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

function ProfilePicture({
  size = 10,
  user,
  path,
  border
}: {
  size: number;
  user: any;
  path: string | undefined;
  border?: string
}) {


  return (
    <div>
      {path ? (
        <>

          <img
            style={{ height: size * 3.2, width: size * 3.2 }}
            src={`${path}`}
            alt={`Profile Picture`}
            className={` w-${size} h-${size} ${border ? `${border}` : `border-2`} object-top object-cover rounded-full mx-auto  bg-white`}
          />
        </>
      ) : (
        <>
          <h1
            className="flex gap-2 justify-center items-center mb-1">
            <span
              style={{ height: size * 3.2, width: size * 3.2 }}
              className=" overflow-hidden font-black focus:font-black w-10 h-10 text-black flex justify-center items-center text-lg rounded-full bg-gray-300">
              {user?.firstName?.toUpperCase().charAt(0) || user?.fullName?.toUpperCase().charAt(0)}
            </span>
          </h1>
        </>
      )}
    </div>
  );
}

export default ProfilePicture;
