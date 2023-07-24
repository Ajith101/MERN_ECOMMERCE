import React, { useState } from "react";
import { BsCart2 } from "react-icons/bs";
import { BiSolidUser } from "react-icons/bi";
import { CiMenuFries } from "react-icons/ci";
import MobileNav from "./MobileNav";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppStore } from "../../utils/store/AppStore";
import { RiShoppingCartFill } from "react-icons/ri";

export const CartNumber = ({ cart }) => {
  return (
    <>
      {cart?.length ? (
        <div className="relative h-[20px] w-[20px] rounded-full border-[2px] border-white bg-red-600 p-[2px]">
          <span className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-[10px]">
            {cart?.length}
          </span>
        </div>
      ) : null}
    </>
  );
};

const Header = () => {
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();
  const [cart] = useAppStore((state) => {
    return [state.cart];
  });

  return (
    <>
      <div className="sticky top-0 z-[100] flex w-full items-center justify-between border-b-[1px] bg-blue-950 px-[20px] py-[18px] text-white sm:py-[20px] md:px-[50px] lg:px-[110px]">
        <h1
          className="cursor-pointer text-[20px] font-[700] sm:text-[28px]"
          onClick={() => navigate("/")}
        >
          Shopping App
        </h1>
        <div className="hidden items-center justify-center gap-[15px] text-[20px] sm:flex">
          <div className="relative" onClick={() => navigate("/cart")}>
            <RiShoppingCartFill size={"20px"} />
            <div className="absolute right-[-14px] top-[-10px]">
              <CartNumber cart={cart} />
            </div>
          </div>
          <BiSolidUser size={"24px"} />
        </div>

        <div className="flex items-center gap-[25px]">
          <div className="relative sm:hidden" onClick={() => navigate("/cart")}>
            <RiShoppingCartFill size={"20px"} />
            <div className="absolute right-[-14px] top-[-10px]">
              <CartNumber cart={cart} />
            </div>
          </div>
          <CiMenuFries
            onClick={() => setNav(true)}
            className="text-white sm:hidden"
            size={"20px"}
          />
        </div>
      </div>
      <MobileNav setNav={setNav} nav={nav} />
    </>
  );
};

export default Header;
