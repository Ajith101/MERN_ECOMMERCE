import React from "react";
import { BiCollection } from "react-icons/bi";
import { RiDashboardFill } from "react-icons/ri";
import { TbBrandCodesandbox, TbCategory } from "react-icons/tb";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
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
    <div className="hidden w-[290px] flex-col items-center justify-center bg-blue-950 text-white md:flex">
      <div className="flex flex-col gap-2">
        {sideNav.map((item, id) => {
          return (
            <NavLink
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
    </div>
  );
};

export default Sidebar;
