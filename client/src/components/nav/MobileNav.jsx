import React, { useEffect, useRef } from "react";
import { AiFillHome } from "react-icons/ai";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { TfiClose } from "react-icons/tfi";
import { RiShoppingCartFill } from "react-icons/ri";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaThList, FaTwitter, FaYoutube } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { BiLogoFacebookSquare, BiSolidConversation } from "react-icons/bi";
import { useAppStore } from "../../utils/store/AppStore";
import { TbBoxModel, TbCategory, TbLayoutDashboard } from "react-icons/tb";
import { IoMdLogOut } from "react-icons/io";
import useOuterClick from "../../../hooks/outSideClick";

export const navLinks = [
  { name: "Home", to: "/", icon: <AiFillHome size={"18px"} /> },
  { name: "Cart", to: "/cart", icon: <RiShoppingCartFill size={"18px"} /> },
  { name: "About", to: "/about", icon: <AiOutlineInfoCircle size={"18px"} /> },
  {
    name: "Contact",
    to: "/contact",
    icon: <BiSolidConversation size={"18px"} />,
  },
  {
    name: "Products",
    to: "/admin/products",
    icon: <FaThList size={"18px"} />,
  },
  {
    name: "Category",
    to: "/admin/category",
    icon: <TbCategory size={"18px"} />,
  },
  {
    name: "Brand",
    to: "/admin/brand",
    icon: <TbBoxModel size={"18px"} />,
  },
  { name: "Home", to: "/", icon: <AiFillHome size={"18px"} /> },
];

const MobileNav = ({ setNav, nav }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const currentPath = pathname.split("/")[1];
  const { cart, logOut, user } = useAppStore();
  const navRef = useRef();
  useOuterClick(navRef, setNav);
  const socialIcons = [
    {
      link: "https://www.facebook.com",
      icon: <BiLogoFacebookSquare size={"25px"} />,
    },
    { link: "https://www.twitter.com", icon: <FaTwitter size={"25px"} /> },
    { link: "https://www.instagram.com", icon: <BsInstagram size={"25px"} /> },
    { link: "https://www.youtube.com", icon: <FaYoutube size={"25px"} /> },
  ];

  return (
    <div
      ref={navRef}
      className={`shadows fixed right-0 top-0 z-[110] flex h-screen w-2/3 flex-col items-center justify-center bg-blue-950 text-white transition-all duration-500 ease-out sm:hidden ${
        nav ? "translate-x-0" : "translate-x-[100%]"
      }`}
    >
      <ul className="flex flex-col gap-[25px] font-font-1  font-[400] uppercase">
        {navLinks.map((item, id) => {
          if (currentPath === "admin" ? id >= 4 && id <= id : id <= 3)
            return (
              <li
                key={id}
                className="relative flex items-center gap-[40px] text-left"
              >
                {item.icon}
                <NavLink
                  to={item.to}
                  onClick={() => setNav(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "relative border-b-[2px] text-[18px] font-[900] text-slate-500"
                      : "relative"
                  }
                >
                  {item.name}
                  {item?.name === "Cart" && cart?.length ? (
                    <div className="absolute right-[-20px] top-[-10px]">
                      <div className="relative h-[20px] w-[20px] rounded-full border-[2px] border-white bg-red-600 p-[2px]">
                        <span className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] font-font-1 text-[10px] text-white">
                          {cart?.length}
                        </span>
                      </div>
                    </div>
                  ) : null}
                </NavLink>
              </li>
            );
        })}
        {user?.role === "admin" ? (
          <li className="relative flex items-center gap-[40px] text-left">
            <TbLayoutDashboard size={"25px"} />
            <NavLink
              to={`/admin/dashboard`}
              onClick={() => setNav(false)}
              className={({ isActive }) =>
                isActive
                  ? "relative border-b-[2px] text-[18px] font-[900] text-slate-500"
                  : "relative"
              }
            >
              Dashboard
            </NavLink>
          </li>
        ) : null}
        {user ? (
          <li
            onClick={() => logOut(setNav, navigate)}
            className="flex items-center gap-[40px] py-5 text-[18px]"
          >
            <IoMdLogOut size={"18px"} />
            Logout
          </li>
        ) : (
          <li
            onClick={() => {
              navigate("/login");
              setNav(false);
            }}
            className="flex items-center gap-[40px] py-5 text-[18px]"
          >
            <AiOutlineInfoCircle size={"18px"} />
            Login
          </li>
        )}
      </ul>
      <TfiClose
        onClick={() => setNav(false)}
        className="fixed right-10 top-10"
        size={"25px"}
      />
      <h2>{user?.name}</h2>
      <div className="flex items-center gap-[15px] pt-[60px]">
        {socialIcons.map((item, id) => {
          return (
            <a href={item.link} key={id}>
              {item.icon}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNav;
