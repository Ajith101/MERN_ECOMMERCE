import React, { useRef, useState } from "react";
import { BiCollection } from "react-icons/bi";
import { BsArrowRightCircle } from "react-icons/bs";
import { RiDashboardFill } from "react-icons/ri";
import { TbBrandCodesandbox, TbCategory } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import useOuterClick from "../../hooks/outSideClick";

const Sidebar = () => {
  const [showNav, setShowNav] = useState(true);
  const sideBarRef = useRef(null);
  useOuterClick(sideBarRef, setShowNav);
  const sideNav = [
    { name: "Dashboard", to: "/admin/dashboard", icon: <RiDashboardFill /> },
    {
      name: "Products",
      to: "/admin/products",
      icon: <BiCollection />,
    },
    {
      name: "Category",
      to: "/admin/category",
      icon: <TbCategory />,
    },
    {
      name: "Brand",
      to: "/admin/brand",
      icon: <TbBrandCodesandbox />,
    },
  ];
  return (
    <div
      ref={sideBarRef}
      className={`relative mr-5 hidden flex-col items-center justify-center bg-blue-950 text-white transition-all duration-300 ease-linear md:flex ${
        showNav ? "w-[290px] translate-x-0" : "w-10 translate-x-[-50%]"
      }`}
    >
      <div
        className={`flex flex-col gap-2 transition-all duration-300 ease-linear ${
          showNav ? "translate-x-0" : "translate-x-[-100%]"
        }`}
      >
        {sideNav.map((item, id) => {
          return (
            <NavLink
              onClick={() => setShowNav(false)}
              key={id}
              to={item.to}
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2 bg-gray-600 px-2 py-4 transition-all ease-in-out hover:scale-110"
                  : "flex items-center gap-2 px-2 py-4 transition-all ease-in-out hover:scale-110"
              }
            >
              {item.icon}
              <h2 className="font-[500]">{item.name}</h2>
            </NavLink>
          );
        })}
      </div>
      <div
        onClick={() => setShowNav((pre) => !pre)}
        className={`absolute ${
          showNav ? "right-[-8px] rotate-180" : "right-[-15px]"
        } top-5 flex h-8 w-8 items-center justify-center rounded-full bg-blue-950`}
      >
        <BsArrowRightCircle size={"20px"} />
      </div>
    </div>
  );
};

export default Sidebar;
