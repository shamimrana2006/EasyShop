import React from "react";
import { Outlet } from "react-router";
import banner from "../../../public/image_361.png";

import "./home.css";
import { FaAccessibleIcon, FaAd, FaAddressBook, FaClinicMedical, FaDAndD, FaEarlybirds, FaFileWord, FaPlus, FaShower } from "react-icons/fa";
export default function Homepage() {
  const category = [{ icon: <FaAd />, name: "Dress & frog" }, { name: "Winder Wear" }, { name: "Glasses and Lens" }, { name: "Short & jeans" }];
  const Poducts = [
    { icon: <FaShower />, name: "Relaxer short full", category: "Clothes", price: "40", discount: "49" },
    { icon: <FaFileWord />, name: "Relaxer short full", category: "Clothes", price: "40", discount: "49" },
    { icon: <FaDAndD />, name: "Relaxer short full", category: "Clothes", price: "40", discount: "49" },
    { icon: <FaShower />, name: "Relaxer short full", category: "Clothes", price: "40", discount: "49" },
    { icon: <FaClinicMedical />, name: "Relaxer short full", category: "Clothes", price: "40", discount: "49" },
    { name: "Relaxer  full", category: "Clothes", price: "40", discount: "49" },
    { icon: <FaShower />, name: "Relaxer short full", category: "Clothes", price: "40", discount: "49" },
    { icon: <FaShower />, name: "Relaxer short full", category: "Clothes", price: "40", discount: "49" },
    { icon: <FaShower />, name: "Relaxer short full", category: "Clothes", price: "40", discount: "49" },
    { icon: <FaShower />, name: "Relaxer short full", category: "Clothes", price: "40", discount: "49" },
    { icon: <FaShower />, name: "Relaxer short full", category: "Clothes", price: "40", discount: "49" },
    { icon: <FaShower />, name: "Relaxer short full", category: "Clothes", price: "40", discount: "49" },
  ];
  const categorys = [{ icon: <FaAccessibleIcon />, name: "Dress & frog" }, { icon: <FaAddressBook />, name: "Winder Wear" }, { icon: <FaDAndD />, name: "Glasses and Lens" }, { name: "Short & jeans" }, { name: "Winder Wear" }, { name: "Glasses and Lens" }, { name: "Short & jeans" }];
  return (
    <div className="container">
      {/* main banner */}
      <div className={`rounded relative h-[300px]  bg-banner w-full flex items-center `}>
        <div className="absolute md:left-24 text-center md:text-left text-white">
          <h1 className="text-2xl">Trending Accessors</h1>
          <p className="uppercase text-4xl font-bold">Modern Sunglasses</p>
          <h1 className="text-2xl">Starting at $50</h1>
          <button className="btn btn-sm mt-5">Shop now</button>
        </div>
      </div>
      {/* Category selection */}
      <div className="flex  justify-between">
        {category.map((item, index) => {
          return (
            <div key={index} className="p-2 rounded-2xl border-border border  max-w-[900px] min-w-[250px] mt-5 flex justify-center  items-center gap-3 ">
              <div className="p-4 rounded-[10px] text-2xl bg-pbox">{item?.icon}</div>
              <div className="flex justify-center flex-col gap-3 ">
                <span>{item?.name}</span>
                <span className={`text-primary`}>Show all</span>
              </div>
              <div className="text-ptext h-full">(25)</div>
            </div>
          );
        })}
      </div>
      {/* section devite */}
      <div className="flex mt-4 gap-3">
        <div className="w-[450px] border border-border p-2 rounded-[8px]">
          <span className="uppercase text-[18px] ">Category</span>
          <div className="gap-3 flex flex-col mt-4">
            {categorys.map((item, index) => {
              return (
                <div className="flex justify-between ">
                  <div className="flex gap-2 items-center">
                    <div className="text-2xl"> {item?.icon}</div> <span>Cloth</span>
                  </div>
                  <div>
                    <FaPlus />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* products */}
        <div className="w-full  rounded-[8px] p-3">
          <div className="flex items-center justify-between">
            <span>New Arrivals</span>
            <span>Trending</span>
            <span>Top Rated</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Poducts.map((item, index) => {
              return (
                <div className="border border-border gap-4 items-center justify-between flex rounded p-2">
                  <div className="text-5xl">
                    <FaEarlybirds />
                  </div>
                  <div className="w-full">
                    <h1 className="text-2xl">{item?.name}</h1>
                    <span>{item?.category}</span>
                    <span className=" flex flex-col">{item?.discount}</span>
                  </div>
                </div>
              );
            })}
          </div>
          {/* deal of the day */}
          <div>
            <h1 className="text-2xl border-b border-border mt-1">Deal Of The Day</h1>

            <div className="border border-border mt-3 flex items-center p-2 gap-3 justify-between rounded-2xl">
              <div className="w-[800px]">
                <img src={banner} alt="" />
              </div>
              <div className="w-full">
                <h1>Sampo wash cleaner</h1>
                <p className="text-ptext">Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus est placeat dolorum nobis error pariatur officia repellat! Facilis fugit numquam quibusdam commodi, aut similique vitae asperiores officiis tempora eaque, fuga facere doloremque, ratione laboriosam molestias corrupti qui impedit omnis dicta!</p>
                <span className="font-bold text-primary">${Poducts[1].discount}</span>
              </div>
            </div>
          </div>
          {/* new products */}

          <div className="mt-3">
            <h1 className="border-border border-b mt-4">New Products</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
              <div className="border border-border overflow-hidden relative">
                <div className="absolute -rotate-45 top-[40px] -left-50 bg-primary py-3 text-center w-[500px]">new products</div>
                dshamim Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis consectetur voluptas dignissimos deleniti libero architecto corporis repellendus, quos illo amet, voluptates sit soluta unde beatae eveniet repudiandae optio perferendis! Repudiandae.
              </div>
              <div className="border border-border overflow-hidden relative">
                <div className="absolute -rotate-45 top-[40px] -left-50 bg-primary py-3 text-center w-[500px]">new products</div>
                dshamim Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis consectetur voluptas dignissimos deleniti libero architecto corporis repellendus, quos illo amet, voluptates sit soluta unde beatae eveniet repudiandae optio perferendis! Repudiandae.
              </div>
              <div className="border border-border overflow-hidden relative">
                <div className="absolute -rotate-45 top-[40px] -left-50 bg-primary py-3 text-center w-[500px]">new products</div>
                dshamim Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis consectetur voluptas dignissimos deleniti libero architecto corporis repellendus, quos illo amet, voluptates sit soluta unde beatae eveniet repudiandae optio perferendis! Repudiandae.
              </div>
              <div className="border border-border overflow-hidden relative">
                <div className="absolute -rotate-45 top-[40px] -left-50 bg-primary py-3 text-center w-[500px]">new products</div>
                dshamim Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis consectetur voluptas dignissimos deleniti libero architecto corporis repellendus, quos illo amet, voluptates sit soluta unde beatae eveniet repudiandae optio perferendis! Repudiandae.
              </div>
              <div className="border border-border overflow-hidden relative">
                <div className="absolute -rotate-45 top-[40px] -left-50 bg-primary py-3 text-center w-[500px]">new products</div>
                dshamim Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis consectetur voluptas dignissimos deleniti libero architecto corporis repellendus, quos illo amet, voluptates sit soluta unde beatae eveniet repudiandae optio perferendis! Repudiandae.
              </div>
              <div className="border border-border overflow-hidden relative">
                <div className="absolute -rotate-45 top-[40px] -left-50 bg-primary py-3 text-center w-[500px]">new products</div>
                dshamim Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis consectetur voluptas dignissimos deleniti libero architecto corporis repellendus, quos illo amet, voluptates sit soluta unde beatae eveniet repudiandae optio perferendis! Repudiandae.
              </div>
              <div className="border border-border overflow-hidden relative">
                <div className="absolute -rotate-45 top-[40px] -left-50 bg-primary py-3 text-center w-[500px]">new products</div>
                dshamim Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis consectetur voluptas dignissimos deleniti libero architecto corporis repellendus, quos illo amet, voluptates sit soluta unde beatae eveniet repudiandae optio perferendis! Repudiandae.
              </div>
              <div className="border border-border overflow-hidden relative">
                <div className="absolute -rotate-45 top-[40px] -left-50 bg-primary py-3 text-center w-[500px]">new products</div>
                dshamim Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis consectetur voluptas dignissimos deleniti libero architecto corporis repellendus, quos illo amet, voluptates sit soluta unde beatae eveniet repudiandae optio perferendis! Repudiandae.
              </div>
              <div className="border border-border overflow-hidden relative">
                <div className="absolute -rotate-45 top-[40px] -left-50 bg-primary py-3 text-center w-[500px]">new products</div>
                dshamim Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis consectetur voluptas dignissimos deleniti libero architecto corporis repellendus, quos illo amet, voluptates sit soluta unde beatae eveniet repudiandae optio perferendis! Repudiandae.
              </div>
              <div className="border border-border overflow-hidden relative">
                <div className="absolute -rotate-45 top-[40px] -left-50 bg-primary py-3 text-center w-[500px]">new products</div>
                dshamim Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis consectetur voluptas dignissimos deleniti libero architecto corporis repellendus, quos illo amet, voluptates sit soluta unde beatae eveniet repudiandae optio perferendis! Repudiandae.
              </div>
              <div className="border border-border overflow-hidden relative">
                <div className="absolute -rotate-45 top-[40px] -left-50 bg-primary py-3 text-center w-[500px]">new products</div>
                dshamim Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis consectetur voluptas dignissimos deleniti libero architecto corporis repellendus, quos illo amet, voluptates sit soluta unde beatae eveniet repudiandae optio perferendis! Repudiandae.
              </div>
              <div className="border border-border overflow-hidden relative">
                <div className="absolute -rotate-45 top-[40px] -left-50 bg-primary py-3 text-center w-[500px]">new products</div>
                dshamim Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis consectetur voluptas dignissimos deleniti libero architecto corporis repellendus, quos illo amet, voluptates sit soluta unde beatae eveniet repudiandae optio perferendis! Repudiandae.
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />
      <Outlet />
    </div>
  );
}
