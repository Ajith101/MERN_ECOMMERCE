import React, { useEffect, useRef, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsArrowUpLeft } from "react-icons/bs";
import { MdOutlineAccessTime } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../utils/store/AppStore";

const Search = () => {
  const { searchProducts, searchResults } = useAppStore();
  const [value, setValue] = useState("");
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (value) {
      searchProducts(value);
    }
  }, [value]);

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="flex h-screen w-full flex-col items-start justify-start bg-gray-200">
      <div className="w-full border-b-[1px] bg-white p-2">
        <form onSubmit={handleSubmit} className="flex items-center gap-3 p-1">
          <AiOutlineArrowLeft onClick={() => navigate("/")} size={"18px"} />
          <input
            autoFocus
            value={value}
            type="text"
            onChange={handleChange}
            className="w-full outline-none"
            placeholder="search for products"
          />
        </form>
      </div>
      {searchResults?.length ? (
        searchResults?.map((item, id) => (
          <div
            onClick={() => navigate(`/product/${item._id}`)}
            key={id}
            className="flex w-full items-center justify-between border-b-[1px] bg-white p-3"
          >
            <div className="flex items-center gap-3">
              <div className="h-[20px] w-[20px] overflow-hidden">
                <img
                  src={item?.images[0]?.url}
                  className="h-full w-full object-contain"
                />
              </div>{" "}
              <p>{item?.name}</p>
            </div>
            <BsArrowUpLeft />
          </div>
        ))
      ) : (
        <div className="flex w-full items-center justify-between border-b-[1px] bg-white p-3">
          <div className="flex items-center gap-3">
            <MdOutlineAccessTime size={"22px"} /> <p>Hellooiii</p>
          </div>
          <BsArrowUpLeft />
        </div>
      )}
    </div>
  );
};

export default Search;
