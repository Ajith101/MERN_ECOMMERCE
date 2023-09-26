import React, { useEffect, useRef, useState } from "react";
import { BsArrowUpLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../utils/store/AppStore";
import { CgSearch } from "react-icons/cg";

const SearchBar = () => {
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

  useEffect(() => {
    if (value) {
      searchProducts(value);
    }
  }, [value]);

  return (
    <div className="relative w-full max-w-[640px]">
      <form
        className={`${
          searchResults.length ? "rounded-t-[5px]" : "rounded-[15px]"
        } relative flex w-full max-w-[640px] items-center justify-between overflow-hidden bg-white px-3 py-2 text-black`}
      >
        <input
          type="text"
          value={value}
          onChange={handleChange}
          className="px-2 outline-none"
          placeholder="search for products"
        />
        <CgSearch color="red" className="" size={"25px"} />
      </form>
      {searchResults?.length && value.length ? (
        <>
          <div className="absolute top-[40px] max-h-[450px] w-full overflow-auto bg-white p-2 text-black shadow-md">
            {searchResults?.map((item, id) => (
              <div
                onClick={() => {
                  navigate(`/product/${item._id}`);
                  useAppStore.setState({ searchResults: [] });
                }}
                key={id}
                className="flex w-full cursor-pointer items-center justify-between border-b-[1px] bg-white p-3"
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
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default SearchBar;
