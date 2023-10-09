import React from "react";
import { useNavigate } from "react-router-dom";
import { BsCart2 } from "react-icons/bs";
import { useAppStore } from "../utils/store/AppStore";
import StarRating from "./StarRating";

const ProductCard = ({ item }) => {
  const productName = (str) => {
    let maxCount = 32;
    if (str.length <= maxCount) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    } else {
      let name = str.slice(0, maxCount) + "...";
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
  };

  const navigate = useNavigate();
  const { addToCart } = useAppStore();
  return (
    <div className="flex h-[320px] flex-col justify-between gap-[5px] rounded-[5px] bg-[#F9F8F8] p-[15px] shadow-md sm:h-[390px]">
      <div className="relative h-[200px] w-full bg-white sm:h-[250px]">
        <img
          src={item?.images[0]?.url}
          alt=""
          onClick={() => navigate(`/product/${item._id}`)}
          className="h-full w-full cursor-pointer rounded-tl-[10px] rounded-tr-[10px] object-contain"
        />
        {item?.category?.name ? (
          <span className="absolute left-[6px] top-[6px] rounded-[4px] bg-[#274C5B] px-[5px] py-[4px] font-font-1 text-[12px] font-[500] text-white">
            {item?.category?.name?.charAt(0)?.toUpperCase() +
              item?.category?.name?.slice(1)}
          </span>
        ) : null}
      </div>
      <div className="flex flex-col gap-[10px]">
        <h1
          onClick={() => navigate(`/product/${item._id}`)}
          className="cursor-pointer font-font-1 text-[16px] font-semibold text-[#274C5B]"
        >
          {productName(item?.name)}
        </h1>
        <div className="w-full border-b-[1px] border-[#DEDDDD]"></div>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-font-1 text-[16px] font-bold text-[#274C5B]">
              {"$"} {item?.price}
            </h2>
            <StarRating rating={item?.totalRatings} />
          </div>
          <div
            onClick={() => addToCart(item)}
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
