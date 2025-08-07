import React from "react";
import { CiLock, CiUser } from "react-icons/ci";
import { FaForumbee, FaUser, FaUserAlt, FaUserCircle } from "react-icons/fa";
import { IoDocument, IoDocumentAttachOutline, IoDocumentTextOutline } from "react-icons/io5";
import { Link, NavLink, Outlet } from "react-router";

const ProfileLayout = () => {
  return (
    <div className="">
      <div className="sidebar float-left text-text h-screen w-[280px] px-2">
        <div className="flex flex-col justify-center">
          <NavLink className={`p-2  rounded-br-2xl text-black flex items-center gap-2  rounded-tr-2xl bg-secondary`} to={"/user/profile"} end>
            <FaUserCircle className="text-[20px]" /> Home
          </NavLink>
          <NavLink className={`p-2 rounded-br-2xl  flex items-center gap-2 rounded-tr-2xl `} to={"/user/profile/info"}>
            <IoDocumentTextOutline className="text-[20px]" /> Personal Info{" "}
          </NavLink>
          <NavLink className={`p-2 rounded-br-2xl  flex items-center gap-2 rounded-tr-2xl `} to={"/user/profile/security"}>
            <CiLock className="text-[22px]"  /> Security
          </NavLink>
        </div>
      </div>
      <div className="mainBox px-4">
        <div>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
