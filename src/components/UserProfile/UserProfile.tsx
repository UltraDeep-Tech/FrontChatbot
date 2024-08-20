import React from "react";
import UserProfileData from "./UserProfileData";
import UserPlansAndSettings from "./UserPlansAndSettings";
import Link from "next/link";

const UserProfile = () => {
  return (
    <div className="pt-10 w-screen px-8 pb-20 overflow-y-auto h-[88vh] bg-black">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold text-center text-white-200 mb-10">Profile Settings</h1>
        <div className="flex flex-col md:flex-row justify-between mt-10 gap-10">
          <div className="w-full md:w-1/2 md:border-r-2 border-blue-600 pr-2">
            <h2 className="text-2xl font-semibold text-white-300 mb-6">User Profile</h2>
            <div className="bg-blue-800 bg-opacity-20 rounded-lg p-6">
              <UserProfileData />
            </div>
          </div>
          <div className="w-full md:w-1/2 max-md:border-t-2 border-blue-600 md:pl-2 pt-6 md:pt-0">
            <h2 className="text-2xl font-semibold text-white-300 mb-6">Plans & Settings</h2>
            <div className="bg-blue-800 bg-opacity-20 rounded-lg p-6">
              <UserPlansAndSettings />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center items-center mt-8 p-2">
          <div className="flex gap-4">
            <Link href="/terms_and_services" className="text-white-300 hover:text-blue-100 transition-colors duration-300">
              Terms and Services
            </Link>
            <Link href="/privacy_policy" className="text-white-300 hover:text-blue-100 transition-colors duration-300">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;