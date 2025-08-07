import axios from "axios";
import { steps } from "framer-motion";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Loading from "../../../Layout/Loading";
import { FaUserCircle } from "react-icons/fa";
import Default_user_image from "../../../../public/user.png";
const Profile = () => {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.userStore);
  if (userState.loading) {
    return <Loading />;
  }
  const { name, UserName, email } = userState?.user?.payLoad || {}
  return (
    <div>
      <div className="flex items-center gap-4 flex-col justify-center">
        <div className={`rounded-full overflow-hidden p-1 w-24 h-24 flex items-center justify-center ${userState?.user?.payLoad?.isVerified?.value ? "border-green-500" : "border-yellow-300"} border-2 `}>
          <img className="rounded-full w-full h-full" src={"https://photosbulk.com/wp-content/uploads/instagram-profile-picture-for-girls-aesthetic_28.webp"} alt="" />
        </div>
        <span>Welcome ,{name}</span>
        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, natus.</span>
        <div className="grid w-full  gap-4 grid-cols-2">
          <div className="border border-border rounded p-3">
            <h1 className="text-2xl mb-6">Congratulation {name}</h1>
            <span>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat, ipsam! Inventore commodi reprehenderit vel. Alias impedit consectetur nisi a in! In, ullam magnam voluptatem dignissimos commodi ipsam nesciunt optio ea doloremque necessitatibus ex vero, dolor error. Recusandae consequatur unde assumenda, dolorem aliquam cumque, ducimus vero voluptatibus voluptas doloribus sit ea?</span>
          </div>
          <div className="border rounded p-3 border-border">
            <h1 className="text-2xl mb-6">Congratulation {name}</h1>
            <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum dicta minima eligendi! Perspiciatis, fugit aliquid.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
