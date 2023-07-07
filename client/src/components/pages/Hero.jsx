import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import Search from "../search/Search";
import { BASE_URL, useAppStore } from "../store/AppStore";
import ProductCard from "../product/ProductCard";
import axios from "../store/axios";

const Hero = () => {
  const [currentCategory, setCurrentCategory] = useState(null);
  const [byCategory, setByCategory] = useState(null);
  const [loading, categorys, getTrendingItems, trendingItems] = useAppStore(
    (state) => {
      return [
        state.loading,
        state.categorys,
        state.getTrendingItems,
        state.trendingItems,
      ];
    }
  );
  useEffect(() => {
    getTrendingItems();
    window.scrollTo(0, 0);
  }, []);

  const getByCategory = async (category) => {
    const response = await axios(`/api/products/category`, {
      method: "POST",
      data: { category },
    });
    setByCategory(response.data);
    setCurrentCategory(category);
  };

  const displayProducts =
    byCategory === null
      ? trendingItems.map((item, id) => {
          return <ProductCard item={item} key={id} />;
        })
      : byCategory.map((item, id) => {
          return <ProductCard item={item} key={id} />;
        });

  const cateNames = categorys?.map((item, id) => {
    return (
      <div
        onClick={() => getByCategory(item)}
        key={id}
        className={`${
          currentCategory === item
            ? "shadows bg-white text-blue-950"
            : "bg-blue-950 text-white"
        } w-fit cursor-pointer rounded-[6px] border-[1px] px-[25px] py-[8px] text-center text-[14px] font-[500] sm:text-[16px]`}
      >
        {item.charAt(0).toUpperCase() + item.slice(1)}
      </div>
    );
  });

  return (
    <Layout>
      <div className="flex w-full items-center justify-between">
        <div className="flex w-full flex-col gap-[30px]">
          <div className="flex w-full flex-col items-center justify-center text-center">
            <div className="w-full lg:w-[50%]">
              {" "}
              <h1 className="text-[22px] font-medium text-[#121212] md:text-[42px]">
                Explore the Ultimate Shopping Experience <br /> Browse Our Wide
                Selection Today!
              </h1>
              <p className="py-[25px] text-[20px] text-[#505050]">
                Shop with Confidence - Trust Our Reliable Service and Secure
                Checkout Process!
              </p>
              <Search />
            </div>
          </div>

          {loading ? (
            <span className="loader"></span>
          ) : (
            <>
              <div className="flex w-full flex-row items-center justify-start gap-[15px] overflow-x-auto scroll-smooth">
                {/* <div className="flex flex-wrap items-center justify-center gap-[15px]"> */}
                {cateNames}
              </div>
              <h2 className="text-[24px] font-[600]">
                {currentCategory === null
                  ? "Trending Item"
                  : currentCategory.toUpperCase()}
              </h2>
              <div className="grid grid-cols-2 gap-[10px] sm:grid-cols-3 md:grid-cols-4 md:gap-[25px] lg:grid-cols-5">
                {displayProducts}
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Hero;
