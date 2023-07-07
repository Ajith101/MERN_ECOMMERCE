import React from "react";
import productLogo from "../../assets/productLogo.jpg";
import { BsCart2 } from "react-icons/bs";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { useAppStore } from "../store/AppStore";
import { useNavigate } from "react-router-dom";

const ProductCardOne = ({ item }) => {
  const [addCart] = useAppStore((state) => {
    return [state.addCart];
  });
  const navigate = useNavigate();
  return (
    <>
      <div className="shadows relative flex w-full flex-col justify-center bg-white p-[10px]">
        <div className="relative flex h-[210px] w-full flex-col items-center justify-center overflow-hidden rounded-[5px] sm:h-[280px]">
          <img
            onClick={() => navigate(`/product/${item.id}`)}
            src={item.thumbnail}
            className="w-full cursor-pointer object-contain"
            alt=""
          />

          <span className="absolute bottom-1 right-1 rounded-[4px] bg-blue-950 px-[10px] py-[2px] text-center text-[14px] font-[500] text-white">
            {item.category}
          </span>
        </div>
        <div className="px-[10px]">
          <div className="flex justify-start gap-[15px]">
            <h1
              onClick={() => navigate(`/product/${item.id}`)}
              className="cursor-pointer text-[16px] text-[#505050] sm:text-[20px]"
            >
              {item.title}
            </h1>
          </div>
          <div className="flex items-center gap-[15px]">
            <h2 className="text-[16px] font-medium text-[#121212] sm:text-[18px]">
              $ {item.price}
            </h2>
            <AiOutlineHeart size={"20px"} className="text-blue-950" />
          </div>
          <div
            onClick={() => addCart(item)}
            className="absolute bottom-5 right-5 flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full bg-blue-950 text-white sm:h-[45px] sm:w-[45px]"
          >
            <BsCart2 size={"20px"} className="hidden text-white sm:block" />
            <BsCart2 size={"18px"} className="sm:hidden" />
          </div>
          <div className="absolute left-5 top-5 flex items-center justify-center rounded-[4px] bg-green-500 bg-opacity-90 px-[10px] py-[4px] text-center text-[12px] text-white">
            {item.discountPercentage} {"%"}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCardOne;
