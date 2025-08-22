import React from "react";
import { useSelector } from "react-redux";
import Loading from "../../../Layout/Loading";

export default function PersionalInfo() {
  const userState = useSelector((state) => state.userStore);
  const user = userState?.user?.payLoad;

  if (userState.loading) {
    return <Loading />;
  }
  return (
    <div className=" overflow-hidden">
      <div className=" p-3">
        <div className="text-center">
          <span className=" ">
            Persional Info <br />
            <span className="text-ptext text-sm">Info about you and your preferences across Easy Shop services</span>
          </span>
        </div>

        <div>
          <div className=" text- border p-3 rounded">
            <div className="flex gap-3 items-center">
              <span>Profile picture</span>
              <div className="flex justify-between items-center">
                <span> A profile picture helps personalize your account</span>
                <div className="rounded-full w-8 h-8 bg-primary flex text-center justify-center items-center uppercase cursor-pointer">s</div>
              </div>
            </div>
            <hr />
            <div className="flex gap-3">
              <span>Name</span>
              <span className="flex justify-between">{user?.name}</span>
            </div>
            <div className="flex gap-3">
              <span>E-mail</span>
              <span className="flex justify-between">{user?.email}</span>
            </div>
            <div className="flex gap-3">
              <span>Role</span>
              <span className="flex justify-between">{user?.isAdmin ? user?.isAdmin : "User"}</span>
            </div>
            <div className="flex gap-3">
              <span>Name</span>
              <span className="flex justify-between">{user?.name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
