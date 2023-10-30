import React, { useEffect, useRef } from "react";
import useOuterClick from "../../hooks/outSideClick";
import { RiShoppingCartFill } from "react-icons/ri";
import CartCardNew from "./CartCardNew";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useAppStore } from "../utils/store/AppStore";
import { useNavigate } from "react-router-dom";
import { priceFormat } from "../../utils/PriceFormat";

const CartList = ({ setShowCart, showCart }) => {
  const { cart, cartOne, user, getUserCart } = useAppStore();
  useEffect(() => {
    if (user) {
      getUserCart();
    }
  }, [user]);
  const cartRef = useRef(null);
  useOuterClick(cartRef, setShowCart);

  const { total, qty } = cart?.products?.reduce(
    (acc, item) => {
      const itemTotal = item.productId.price * item.quantity;
      acc.total += itemTotal;
      acc.qty += item.quantity;
      return acc;
    },
    { total: 0, qty: 0 }
  );

  return (
    <div
      className={`fixed top-0 z-[100] flex h-screen w-full items-center justify-center backdrop-blur-sm transition-opacity duration-200 ${
        showCart ? "opacity-100" : "opacity-0 delay-150"
      }`}
    >
      <div
        ref={cartRef}
        className={`relative ${
          cart?.products?.length ? "max-h-[90%]" : ""
        } flex w-[90%] max-w-[450px] flex-col justify-between overflow-hidden rounded-2xl bg-white p-4 shadow-md`}
      >
        <h2 className="mb-6 flex items-center gap-2 text-[18px] font-bold text-blue-950">
          <RiShoppingCartFill
            className="transition-all ease-in-out hover:scale-110"
            size={"20px"}
          />
          Your Cart
        </h2>
        <AiOutlineCloseCircle
          onClick={() => setShowCart(false)}
          className="absolute right-4 top-4 cursor-pointer"
          size={"25px"}
          color="red"
        />
        <div className="flex w-full flex-col gap-2 overflow-y-auto">
          {cart?.products?.length ? (
            cart?.products?.map((item, id) => (
              <CartCardNew key={id} item={item} />
            ))
          ) : (
            <h2 className="py-2 font-semibold">Your Cart is Empty</h2>
          )}
        </div>
        {cart?.products?.length ? (
          <div className="mt-4 h-full">
            <div className="flex items-baseline justify-between">
              <h2 className="font-bold text-slate-500">
                Total Cost{" "}
                <span className="text-red-500">
                  {priceFormat(Math.ceil(total))}
                </span>
              </h2>
              <h2 className="font-bold text-slate-500">
                Total Qty <span className="text-red-500">{qty}</span>
              </h2>
            </div>
            <p className="text-[14px]">
              *Shipping and taxes calculated at checkout
            </p>{" "}
            <div className="w-full border-b-[1px] py-1"></div>
            <p className="text-[14px]">
              By proceeding to checkout, you agree to our Terms of service and
              privacy. <br />
              You are also agree that your order will be handled by our third
              party payment processor.
            </p>{" "}
            <button className="mt-2 rounded-xl bg-blue-600 px-4 py-2 text-white">
              Checkout
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CartList;
