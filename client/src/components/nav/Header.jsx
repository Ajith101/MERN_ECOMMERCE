import React, { useEffect, useState } from "react";
import { BiSolidUser } from "react-icons/bi";
import { CiMenuFries } from "react-icons/ci";
import MobileNav from "./MobileNav";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../utils/store/AppStore";
import { RiShoppingCartFill } from "react-icons/ri";
import { TbLayoutDashboard } from "react-icons/tb";
import CartList from "../CartList";
import { CgSearch } from "react-icons/cg";
import LogOutMenu from "./LogOutMenu";

export const CartNumber = () => {
  const { cartNo } = useAppStore();
  return (
    <>
      {cartNo ? (
        <div className="relative h-[20px] w-[20px] rounded-full border-[2px] border-white bg-red-600 p-[2px]">
          <span className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-[10px]">
            {cartNo}
          </span>
        </div>
      ) : null}
    </>
  );
};

const Header = () => {
  const [userMenu, setUserMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();
  const { addToCart, user, getCartNumbers, cartNo, isVisible, toggleVisible } =
    useAppStore();
  useEffect(() => {
    if (user) {
      getCartNumbers();
    }
  }, [user]);
  return (
    <>
      <div className="sticky top-0 z-[100] flex w-full items-center justify-between border-b-[1px] bg-blue-950 px-[20px] py-[18px] text-white sm:py-[20px] md:px-[50px] lg:px-[110px]">
        <h1
          className="cursor-pointer text-[20px] font-[700] transition-all ease-in-out hover:scale-110 sm:text-[28px]"
          onClick={() => navigate("/")}
        >
          Shopping App
        </h1>
        <div className="hidden items-center justify-center gap-[15px] text-[20px] sm:flex">
          <div className="relative">
            <BiSolidUser
              onClick={() => setUserMenu((pre) => !pre)}
              className="cursor-pointer transition-all ease-in-out hover:scale-110"
              size={"24px"}
            />
            <LogOutMenu userMenu={userMenu} setUserMenu={setUserMenu} />
          </div>
          {user?.role === "admin" ? (
            <TbLayoutDashboard
              className="cursor-pointer transition-all ease-in-out hover:scale-110"
              onClick={() => navigate("/admin/dashboard")}
            />
          ) : null}
        </div>

        <div className="flex items-center gap-[25px]">
          <CgSearch
            onClick={() => {
              navigate("/search");
            }}
            size={"25px"}
            color="white"
          />

          <div
            className="relative cursor-pointer"
            onClick={() => setShowCart((pre) => !pre)}
          >
            <RiShoppingCartFill size={"20px"} />
            <div className="absolute right-[-14px] top-[-10px]">
              <CartNumber />
            </div>
          </div>
          <CiMenuFries
            onClick={() => setNav(true)}
            className="text-white sm:hidden"
            size={"20px"}
          />
        </div>
        {user ? (
          <div className="hidden uppercase text-white md:block">
            {user?.name}
          </div>
        ) : null}
      </div>
      <MobileNav setNav={setNav} nav={nav} />
      {showCart ? (
        <CartList setShowCart={setShowCart} showCart={showCart} />
      ) : null}
    </>
  );
};

export default Header;
