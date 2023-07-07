import React, { useEffect, useState } from "react";
import { CgSearch } from "react-icons/cg";
import axios from "axios";
import { BASE_URL } from "./../store/AppStore";
import SearchCards from "./SearchCards";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [result, setResults] = useState([]);
  const handlechange = (event) => {
    setSearchInput(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(searchInput);
  };
  const getProduct = async () => {
    try {
      const response = await axios(`${BASE_URL}/api/products/search`, {
        method: "POST",
        params: {
          values: searchInput.toLowerCase(),
        },
      });
      setResults(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchInput) {
        getProduct();
      }
    }, 300);
    return () => {
      clearTimeout(timeout);
    };
  }, [searchInput]);

  const displayResults = result?.map((item) => {
    return <SearchCards key={item.id} item={item} />;
  });

  return (
    <>
      <div className="flex h-full w-full items-center justify-center">
        <div className="relative w-[90%] max-w-[650px]">
          <form
            onSubmit={handleSubmit}
            className="relative flex w-full items-center justify-between border-[1px] bg-[#F5F5F5] py-[10px] pl-[15px] pr-[15px] shadow-lg sm:pl-[45px]"
          >
            <input
              onChange={handlechange}
              type="text"
              value={searchInput}
              placeholder="Search"
              className="w-full bg-[#F5F5F5] px-[25px] text-[16px] outline-none sm:text-[20px]"
            />
            <CgSearch
              size={"25px"}
              className="absolute left-[15px] top-[50%] translate-x-[-50%] translate-y-[-50%] text-[#A8A8A8] sm:left-[45px]"
            />
            <button
              type="submit"
              className="bg-blue-950 px-[8px] py-[4px] text-center text-[16px] font-medium text-white sm:px-[20px] sm:py-[10px] sm:text-[18px]"
            >
              Search
            </button>
          </form>
          <div className="shadows flex max-h-[450px] w-full flex-col overflow-y-scroll">
            {searchInput ? displayResults : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
