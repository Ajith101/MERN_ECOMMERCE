import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import Search from "../components/search/Search";
import { useAppStore } from "../utils/store/AppStore";
import ProductCard from "./../components/ProductCard";
import ProductLoader from "../components/loader/ProductLoader";
import CategoryLoader from "../components/loader/CategoryLoader";

const CategoryCards = ({ item }) => {
  return (
    <>
      <div className="flex h-[120px] w-full flex-col bg-gray-200 p-2 md:h-[150px]">
        <img
          src={item?.image?.url}
          className="h-full w-full object-contain"
          alt=""
        />
      </div>
    </>
  );
};

const Hero = () => {
  const [currentCategory, setCurrentCategory] = useState(null);
  const [byCategory, setByCategory] = useState(null);
  const { loading, categorys, isFetching, getAllProducts, allProducts } =
    useAppStore();
  useEffect(() => {
    getAllProducts();
  }, []);

  const displayProducts =
    byCategory === null
      ? allProducts?.map((item, id) => {
          return <ProductCard item={item} key={id} />;
        })
      : byCategory?.map((item, id) => {
          return <ProductCard item={item} key={id} />;
        });

  const cateNames = categorys?.map((item, id) => {
    return <CategoryCards item={item} key={id} />;
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
          <div className="grid w-full grid-cols-2 gap-[15px] scroll-smooth sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6">
            {loading
              ? Array.from({ length: 4 }, (ele, index) => {
                  return <CategoryLoader key={index} />;
                })
              : cateNames}
          </div>
          <h2 className="text-[24px] font-[600]">
            {currentCategory === null
              ? "Trending Item"
              : currentCategory.toUpperCase()}
          </h2>
          <div className="grid grid-cols-2 gap-[10px] sm:grid-cols-3 md:grid-cols-4 md:gap-[25px] lg:grid-cols-5">
            {loading
              ? Array.from({ length: 8 }, (ele, ind) => {
                  return <ProductLoader key={ind} />;
                })
              : displayProducts}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Hero;
