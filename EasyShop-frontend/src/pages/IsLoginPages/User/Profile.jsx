import axios from "axios";
import { steps } from "framer-motion";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Loading from "../../../Layout/Loading";

const Profile = () => {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.userStore);
  if (userState.loading) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-red-500 text-center">{userState.user?.payLoad?.name}</h1>
    </div>
  );
};

export default Profile;
