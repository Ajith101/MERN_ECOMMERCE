import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useAppStore } from "../utils/store/AppStore";
import ProductCard from "./../components/ProductCard";
import ProductLoader from "../components/loader/ProductLoader";
import CategoryLoader from "../components/loader/CategoryLoader";
import { useNavigate } from "react-router-dom";
import BrandCard from "../components/BrandCard";
import { BsGiftFill, BsHeadset } from "react-icons/bs";
import { FaShippingFast } from "react-icons/fa";
import { BiSolidOffer } from "react-icons/bi";
import { AiFillCreditCard } from "react-icons/ai";
import HomeSlider from "../components/HomeSlider";
import { Link } from "react-router-dom";

const CategoryCards = ({ item }) => {
  return (
    <>
      <div className="relative flex h-[120px] w-full flex-col border-[1px] md:h-[150px]">
        <img
          src={item?.image?.url}
          className="h-full w-full object-cover"
          alt=""
        />
        <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-black/60 p-4">
          <Link
            to={`/cat-product/${item?.name}`}
            className="text-lg font-medium text-white hover:underline"
          >
            {item?.name}
          </Link>
        </div>
      </div>
    </>
  );
};

const Hero = () => {
  const navigate = useNavigate();
  const {
    categorys,
    isFetching,
    getAllProducts,
    allProducts,
    getAllBrands,
    brands,
  } = useAppStore();
  useEffect(() => {
    getAllProducts();
    getAllBrands();
  }, []);
  const displayProducts = allProducts?.map((item, id) => {
    return <ProductCard item={item} key={id} />;
  });

  const cateNames = categorys?.map((item, id) => {
    return <CategoryCards item={item} key={id} />;
  });
  const displayBrands = brands?.map((item, id) => (
    <BrandCard item={item} key={id} />
  ));

  return (
    <Layout>
      <div className="flex w-full items-center justify-between">
        <div className="flex w-full flex-col gap-[30px]">
          <div className="flex w-full flex-col items-center justify-center text-center">
            <div className="w-full lg:w-[50%]">
              <h1 className="text-[22px] font-medium text-[#121212] md:text-[42px]">
                Explore the Ultimate Shopping Experience <br /> Browse Our Wide
                Selection Today!
              </h1>
              <p className="py-[25px] text-[20px] text-[#505050]">
                Shop with Confidence - Trust Our Reliable Service and Secure
                Checkout Process!
              </p>
            </div>
          </div>
          <HomeSlider />
          <h2 className="text-[18px] font-semibold text-slate-800">
            Shop by Categories
          </h2>
          <div className="grid w-full grid-cols-2 gap-[15px] scroll-smooth sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6">
            {isFetching?.category
              ? Array.from({ length: 4 }, (ele, index) => (
                  <CategoryLoader key={index} />
                ))
              : cateNames}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <h2 className="text-[18px] font-[600] text-slate-800">
              Popular Deals
            </h2>
            <button
              onClick={() => navigate("/popular-products")}
              className="rounded-full bg-blue-900 px-4 py-1 text-center text-white"
            >
              See All
            </button>
          </div>
          <div className="grid grid-cols-2 gap-[10px] sm:grid-cols-3 md:grid-cols-4 md:gap-[25px] lg:grid-cols-5">
            {isFetching?.products
              ? Array.from({ length: 8 }, (ele, ind) => (
                  <ProductLoader key={ind} />
                ))
              : displayProducts}
          </div>
          <h2 className="mt-5 text-[18px] font-[600] text-slate-800">
            Popular Brands
          </h2>
          <div className="grid w-full grid-cols-2 gap-[15px] scroll-smooth sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6">
            {isFetching?.brands
              ? Array.from({ length: 4 }, (ele, index) => (
                  <CategoryLoader key={index} />
                ))
              : displayBrands}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 rounded-md bg-white p-4 shadow-md sm:grid-cols-3 md:grid-cols-4">
            <div className="flex items-center gap-3">
              <FaShippingFast size={"40px"} />
              <div>
                <h2 className="text-[16px] font-[600] text-slate-800">
                  Free Shipping
                </h2>
                <p className="text-[14px] text-gray-400">
                  Fromm all order over 40
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <BsGiftFill size={"40px"} />
              <div>
                <h2 className="text-[16px] font-[600] text-slate-800">
                  Daily Surprise Offers
                </h2>
                <p className="text-[14px] text-gray-400">Save upto 25% off</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <BsHeadset size={"40px"} />
              <div>
                <h2 className="text-[16px] font-[600] text-slate-800">
                  Support 24/7
                </h2>
                <p className="text-[14px] text-gray-400">Shop with an expert</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <BiSolidOffer size={"40px"} />
              <div>
                <h2 className="text-[16px] font-[600] text-slate-800">
                  Affordable Prices
                </h2>
                <p className="text-[14px] text-gray-400">
                  Get Factory Default Price
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <AiFillCreditCard size={"40px"} />
              <div>
                <h2 className="text-[16px] font-[600] text-slate-800">
                  Secure Payment
                </h2>
                <p className="text-[14px] text-gray-400">
                  100% Protected Payment
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Hero;
