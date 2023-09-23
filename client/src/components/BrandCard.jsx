import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const BrandCard = ({ item }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        onClick={() => navigate(`/brand-product/${item?.name}`)}
        className="relative flex h-[140px] w-full flex-col rounded-md border-[1px] bg-black md:h-[150px]"
      >
        <img
          src={item?.image?.url}
          className="h-full w-full object-contain"
          alt=""
        />
        <div className="absolute bottom-2 right-2 flex items-center gap-2 text-white">
          <h2>Explore</h2>
          <AiOutlineArrowRight size={"22px"} />
        </div>
      </div>
    </>
  );
};

export default BrandCard;
