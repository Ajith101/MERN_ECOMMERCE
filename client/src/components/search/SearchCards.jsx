import React from "react";
import { useNavigate } from "react-router-dom";

const SearchCards = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div className="flex h-[60px] w-full gap-[5px] border-b-[1px]">
      <div className="h-[60px] w-[60px] p-[10px]">
        <img
          onClick={() => navigate(`/product/${item.id}`)}
          src={item.thumbnail}
          className="h-full w-full cursor-pointer object-cover"
          alt=""
        />
      </div>
      <div className="flex flex-col items-start py-[10px]">
        <h1
          className="cursor-pointer text-[16px]"
          onClick={() => navigate(`/product/${item.id}`)}
        >
          {item.title}
        </h1>
        <p className="text-blue-500">in {item.category}</p>
      </div>
    </div>
  );
};

export default SearchCards;
