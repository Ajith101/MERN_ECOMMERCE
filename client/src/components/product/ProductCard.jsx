import React from "react";
import StarRating from "../star/StarRating";
import { useNavigate } from "react-router-dom";
import { BsCart2 } from "react-icons/bs";
import { useAppStore } from "../store/AppStore";

const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  const [addCart] = useAppStore((state) => {
    return [state.addCart];
  });
  return (
    <div className="flex flex-col justify-between gap-[5px] rounded-[15px] bg-[#F9F8F8] p-[15px] shadow-md">
      <div className="relative h-[200px] w-full bg-white sm:h-[250px]">
        <img
          src={item.thumbnail}
          alt=""
          onClick={() => navigate(`/product/${item.id}`)}
          className="h-full w-full rounded-tl-[10px] rounded-tr-[10px] object-contain"
        />
        <span className="absolute left-[6px] top-[6px] rounded-[4px] bg-[#274C5B] px-[5px] py-[4px] font-font-1 text-[12px] font-[500] text-white">
          {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
        </span>
      </div>
      <div className="flex flex-col gap-[10px]">
        <h1
          onClick={() => navigate(`/product/${item.id}`)}
          className="font-font-1 text-[16px] font-semibold text-[#274C5B]"
        >
          {item.title}
        </h1>
        <div className="w-full border-b-[1px] border-[#DEDDDD]"></div>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-font-1 text-[16px] font-bold text-[#274C5B]">
              {"$"} {item.price}
            </h2>
            <StarRating rating={item.rating} />
          </div>
          <div
            onClick={() => addCart(item)}
            className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-blue-950 text-white sm:h-[45px] sm:w-[45px]"
          >
            <BsCart2 size={"20px"} className="hidden text-white sm:block" />
            <BsCart2 size={"20px"} className="sm:hidden" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
