import React, { useState } from "react";
import { BiSolidWalletAlt } from "react-icons/bi";
import { BiSolidUserCircle } from "react-icons/bi";
import { AiTwotoneHeart } from "react-icons/ai";
import { BsCartFill, BsFillSunFill } from "react-icons/bs";

const SideNav = () => {
  const [showNav, setShowNav] = useState(false);
  const routes = [
    {
      title: "Wishlist",
      path: "/",
      icon: <AiTwotoneHeart size={"28px"} className="text-pink-300" />,
    },
    {
      title: "Wallet",
      path: "/wallet",
      icon: <BiSolidWalletAlt size={"28px"} className="text-amber-800" />,
    },
    {
      title: "Cart",
      path: "/cart",
      icon: <BsCartFill size={"28px"} className="" />,
    },
    {
      title: "User",
      path: "/user",
      icon: <BiSolidUserCircle size={"28px"} className="text-blue-800" />,
    },
    {
      title: "Day",
      path: "/user",
      icon: <BsFillSunFill size={"28px"} className="" />,
    },
  ];

  const displayRoutes = routes.map((item, id) => {
    return (
      <div key={id} className="flex w-full items-center gap-[15px]">
        <div className="w-[90px]" onClick={() => setShowNav((pre) => !pre)}>
          {" "}
          {item.icon}
        </div>
        <div className="ml-[40px] w-[118px]">
          <h3 className="">{item.title}</h3>
        </div>
      </div>
    );
  });

  return (
    <div
      className={`fixed top-[50%] flex translate-x-[-50%] translate-y-[-50%] flex-col gap-[60px] overflow-hidden rounded-[20px] border-[1px] bg-white px-[15px] py-[40px] shadow transition-all ease-out ${
        showNav ? "w-[210px]" : "w-[90px]"
      }`}
    >
      {displayRoutes}
      {/* <div className="flex items-center gap-[15px]">
        <div className="flex h-[35px] w-[35px] items-center justify-center rounded-full border-[1px] text-center shadow">
          <IoIosArrowBack size={"20px"} className="" />
        </div>
      </div> */}
    </div>
  );
};

export default SideNav;
