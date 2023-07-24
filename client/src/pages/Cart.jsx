import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useAppStore } from "../utils/store/AppStore";
import CartCard from "../components/CartCard";
import { BiCartDownload } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";

const Cart = () => {
  const [cart] = useAppStore((state) => {
    return [state.cart];
  });

  const navigate = useNavigate();
  const displayCartItems = cart?.map((item, id) => {
    return <CartCard item={item} key={id} />;
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Layout>
        {cart.length ? (
          <div className="flex flex-col justify-between sm:flex-row">
            <div className="flex w-full flex-col justify-start gap-[10px] sm:w-[70%] sm:gap-[20px]">
              {displayCartItems}
            </div>
            <div className="top-[80px] flex h-[450px] flex-col justify-between gap-[15px] bg-blue-950 text-white sm:sticky">
              <h1 className="p-[15px] text-[22px] font-[500]">
                Payment details
              </h1>
              <h2 className="p-[15px]">Discount = 50%</h2>
              <h1 className="p-[15px] text-[22px] font-[500]">
                Total amount = $ 50000
              </h1>
              <div className="w-full bg-slate-500 py-[15px] text-center text-[18px]">
                Confirm to checkout
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-[90vh] w-[90%] flex-col items-center justify-center gap-[20px]">
            <div>
              <BiCartDownload size={"150px"} />
              <h1>There is no item here</h1>
              <div className="flex items-center justify-center">
                <div
                  onClick={() => navigate("/")}
                  className="mt-[20px] flex w-fit items-center justify-center gap-[20px] rounded-[16px] bg-blue-950 px-[25px] py-[15px] text-center text-[18px] font-[500] text-white"
                >
                  Shop Now
                  <div className="relative h-[30px] w-[30px] rounded-full bg-[#455076] p-[2px]">
                    <HiArrowRight className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </>
  );
};

export default Cart;
