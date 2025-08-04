import React, { useEffect } from "react";
import { IoBagHandleOutline } from "react-icons/io5";
import { CiHeart, CiMenuKebab, CiSun, CiUser } from "react-icons/ci";
import { FaBackward, FaFacebook, FaInstagram, FaLinkedin, FaSearch, FaTwitter } from "react-icons/fa";
import { NavLink, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../Layout/Loading";
const NavBar = () => {
  const userState = useSelector((state) => state.userStore);
  const path = useLocation();

  // useEffect(() => {
  //   document.querySelector(".MenuVisible").classList.add("hidden");
  // }, [path]);

  const themeToggle = () => {
    document.documentElement.classList.toggle("dark");
  };

  const searchButton = () => {
    if (window.innerWidth > 768) return;
    document.querySelector(".searchINput").classList.toggle("!w-full");
    document.querySelector(".searchINput").classList.toggle("z-50");
    document.querySelector(".inputBox").classList.toggle("w-full");
    document.querySelector(".fnd").classList.toggle("hidden");
    document.querySelector(".lnd").classList.toggle("hidden");
    document.querySelector(".bkw").classList.toggle("hidden");
  };

  window.addEventListener("resize", () => {
    if (window.innerWidth > 640) {
      document.querySelector(".MenuVisible").classList.add("hidden");
    }
  });

  if (userState.loading) return <Loading />;

  const menuList = (
    <>
      <NavLink to={"/"}>Home</NavLink>
      <NavLink to={"/private"}>Private</NavLink>
      <NavLink to={"/ment"} className="">
        {" "}
        man
      </NavLink>
      <NavLink to={"/women"}>Women's</NavLink>
      <NavLink to={"/jewelry"}>Jewelry</NavLink>
      <NavLink to={"/Perfume"}>Perfume</NavLink>
      <NavLink to={"/Blog"}>Blog</NavLink>
      <NavLink to={"/offers"}>Hot Offers</NavLink>
    </>
  );
  return (
    <div className="sticky top-0 z-50">
      <div className="bg-bg text-text border-border">
        {/* topbar */}
        <div className=" bg-bg container lg:flex hidden justify-between items-center py-2  focus:text-ptext ">
          <div className="socialIcons flex gap-1">
            <FaFacebook className=" p-[6px] flex items-center justify-center text-4xl bg-pbox rounded-[7px] " />
            <FaTwitter className=" p-[6px] flex items-center justify-center text-4xl bg-pbox rounded-[7px] " />
            <FaInstagram className=" p-[6px] flex items-center justify-center text-4xl bg-pbox rounded-[7px] " />
            <FaLinkedin className=" p-[6px] flex items-center justify-center text-4xl bg-pbox rounded-[7px] " />
          </div>
          <span className="noticeTitle text-ptext uppercase font-bold">Free shipping this week order over - $55</span>
          <div className="flex gap-1 items-center justify-end">
            <select name="option" className="rounded transition-all bg-pbox duration-300 ease-in-out flex items-center text-center p-2 outline-none focus:outline-none focus:rounded focus:bg-ptext focus:border-none" id="option">
              <option value="usd">USD $</option>
              <option className="" value="TK">
                BDT ৳
              </option>
            </select>
            <select name="option" className="rounded transition-all bg-pbox duration-300 ease-in-out flex items-center text-center p-2 outline-none focus:outline-none focus:rounded focus:bg-ptext focus:border-none" id="option">
              <option value="English">English</option>
              <option className="" value="Bangla">
                Bangla
              </option>
            </select>
          </div>
        </div>
        <div className="border-b border-border"></div>
        {/* navbar */}
        <div className="container relative py-3 flex justify-between items-center">
          <div className="fnd">
            <NavLink to={"/"}>
              <h1 className="font-bold text-4xl text-text font-">ESP</h1>
            </NavLink>
          </div>
          <div className="inputBox z-50 flex gap-1  group p-2 px-5 items-center md:w-[60%]  border  border-border rounded-[14px] justify-between">
            <FaBackward className="hidden mr-2 bkw" onClick={searchButton} />
            <FaSearch className="text-text hidden md:block group-hover:w-[15px] origin-top-right transition-all duration-300 ease-in-out w-0  mr-2" />
            <input type="text" className="searchINput md:w-full placeholder:text-ptext w-0 not-focus:w-0 md:not-focus:w-full  group-hover:w-full transition-all duration-300 ease-in-out group outline-none focus:outline-none border-none bg-transparent text-text" placeholder="Enter your product name..." />
            <FaSearch onClick={searchButton} className="text-ptext  md:block" />
          </div>
          <div className="md:flex flex lnd  gap-3 font-bold items-center text-4xl justify-center">
            <div className={`navITEMForUser gap-4 items-center justify-center ${userState.user ? "flex" : "hidden"} `}>
              <div
                className="relative group"
                onContextMenu={(e) => {
                  e.preventDefault();
                  document.querySelector(".profileMenu").classList.toggle("hidden");
                }}>
                <div className="p-2 absolute bg-ptext backdrop-blur-2xl flex-col gap-2 profileMenu flex rounded-2xl top-8 hidden  items-center justify-center">
                  <NavLink to={"/user/profile"} className="btn btn-small bg-primary cursor-pointer w-20">
                    Profile
                  </NavLink>
                  <span className="btn btn-small bg-primary cursor-pointer w-20">Log Out</span>
                </div>
                <NavLink to={"/user/profile"}>
                  <CiUser />
                </NavLink>
              </div>
              <div className="relative">
                <span className="absolute w-4 h-4 right-0 -top-1 text-[0.8rem] flex items-center justify-center text-white rounded-full bg-primary">5</span>

                <CiHeart />
              </div>
              <div className="relative">
                <span className="absolute w-4 h-4 right-0 -top-1 text-[0.8rem] flex items-center justify-center text-white rounded-full bg-primary">50</span>
                <IoBagHandleOutline />
              </div>
              <button className="hidden md:block">
                <CiSun className="" onClick={themeToggle} />
              </button>
            </div>
            <div className={`flex items-center ${userState.user ? "hidden" : ""}  justify-center gap-2`}>
              <NavLink to={"/auth/login"} className="btn ">
                Sign Up
              </NavLink>
            </div>
            <button onClick={() => document.querySelector(".MenuVisible").classList.toggle("hidden")} className="md:hidden block">
              <CiMenuKebab className="" />
            </button>
            <div className="absolute container hidden border MenuVisible top-12 text-sm bg-bg p-2 border-border rounded-[8px] ">
              <ul className="flex menuListLargeDevice md:text-sm flex-col  justify-center gap-2  font-bold uppercase">{menuList}</ul>
            </div>
          </div>
        </div>

        <div className="border-b border-border"></div>

        {/* last navbar menu */}
        <div className="md:flex hidden container justify-center bg-bg text-text gap-2 py-3  items-center">
          <ul className="flex z-50 menuListLargeDevice justify-center items-center lg:gap-18 md:gap-5 font-bold uppercase">{menuList}</ul>
        </div>
        <div className="border-b border-border"></div>
      </div>
    </div>
  );
};

export default NavBar;
