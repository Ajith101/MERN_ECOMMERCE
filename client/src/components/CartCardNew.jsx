import React from "react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../utils/store/AppStore";
import { priceFormat } from "../../utils/PriceFormat";

const CartCardNew = ({ item }) => {
  const { removeCart, addQty, decreaseQty } = useAppStore();
  const navigate = useNavigate();
  const productName = (str) => {
    let maxCount = 32;
    if (str?.length <= maxCount) {
      return str?.charAt(0).toUpperCase() + str?.slice(1);
    } else {
      let name = str?.slice(0, maxCount) + "...";
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
  };
  return (
    <>
      <div className="flex w-full grid-cols-2">
        <div className="flex w-full items-center">
          <div className="h-[50px] w-[50px]">
            <img
              src={item?.productId?.images[0]?.url}
              className="h-full w-full overflow-hidden object-contain"
              alt=""
            />
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold text-slate-500">
              {productName(item?.productId?.name)}
            </h2>
            <p className="text-slate-500">
              Price: {priceFormat(item?.productId?.price)}
            </p>
            <p className="text-slate-500">
              {productName(item?.productId?.category?.name)}
            </p>
            <div className="flex items-center gap-2">
              <FaMinus
                className="cursor-pointer"
                onClick={() => {
                  item?.quantity === 1
                    ? removeCart(item?.productId?._id)
                    : decreaseQty(item?.productId?._id);
                }}
                color="red"
              />
              <span className="text-slate-500">Qty: {item?.quantity}</span>
              <FaPlus
                className="cursor-pointer"
                onClick={() => addQty(item?.productId?._id)}
                color="green"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => removeCart(item?.productId?._id)}
            className="h-8 w-8 cursor-pointer rounded-full bg-[red] p-2"
          >
            <FaTrash color="white" />
          </button>
          <div>
            <h2 className="text-slate-500">Total:</h2>
            <p className="text-slate-500">
              {priceFormat(Math.ceil(item?.quantity * item?.productId?.price))}
            </p>
          </div>
        </div>
      </div>
      <div className="border-t-[1px] border-blue-300"></div>
    </>
  );
};

export default CartCardNew;
