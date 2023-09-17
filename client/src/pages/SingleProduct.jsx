import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useParams } from "react-router-dom";
import { useAppStore } from "../utils/store/AppStore";
import StarRating from "../components/StarRating";
import PageNotFound from "./PageNotFound";
import Swipper from "../components/Swipper";

const SingleProduct = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const {
    addToCart,
    getSingleProduct,
    singleItem,
    increaseQty,
    decreaseQtys,
    loading,
    errors,
  } = useAppStore();
  const { id } = useParams();
  useEffect(() => {
    getSingleProduct(id);
  }, [id]);

  return (
    <Layout>
      {loading ? (
        <span className="loader"></span>
      ) : singleItem ? (
        <div className="flex w-full flex-col gap-[25px] sm:flex-row">
          <div className="flex w-full flex-col sm:w-[50%]">
            <div className="flex flex-col items-center justify-center">
              <Swipper image={singleItem?.images} />
            </div>
          </div>
          <div className="flex w-full flex-col gap-[10px] sm:w-[50%]">
            <span className="uppercase text-blue-950">
              {singleItem?.category?.name}
            </span>
            <h1 className="text-[26px] font-[600]">{singleItem?.name}</h1>
            <StarRating rating={singleItem?.totalRatings} />
            <p className="py-[15px] text-slate-600">
              {singleItem?.description}
            </p>
            <div className="flex items-center gap-[20px]">
              <h1 className="text-[22px] font-[700]">
                {"$"}
                {singleItem?.price}
              </h1>
              <s className="text-[18px] text-slate-600">
                {"$"}
                {Math.ceil(
                  (singleItem?.price * 100) / (100 - singleItem?.discountPrice)
                )}
              </s>
              <span className="flex items-center justify-center rounded-[4px] bg-green-500 bg-opacity-90 px-[10px] py-[4px] text-center text-[12px] text-white">
                {singleItem?.discountPrice}
                {"%"}
              </span>
            </div>
            <div className="flex items-center pt-[10px]">
              <div className="shadows flex items-center rounded-[5px] bg-[#f7f8fd]">
                <button
                  onClick={() => decreaseQtys()}
                  className="px-[14px] py-[8px] text-center text-[16px] sm:px-[20px] sm:text-[28px]"
                >
                  -
                </button>
                {/* <p>{checkCartExist ? checkCartExist?.qty : singleItem?.qty}</p> */}
                <p>{singleItem?.stock}</p>
                <button
                  onClick={() => increaseQty()}
                  className="px-[14px] py-[8px] text-center text-[16px] sm:px-[20px] sm:text-[28px]"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex items-center gap-[25px] py-[25px]">
              <button
                onClick={() => addToCart(singleItem)}
                className="rounded-[5px] bg-blue-950 px-[15px] py-[8px] text-center text-[16px] text-white sm:px-[25px] sm:py-[12px] sm:text-[18px]"
              >
                Add to cart
              </button>
              <button className="rounded-[5px] bg-[#339552] px-[15px] py-[8px] text-center text-[16px] text-white sm:px-[25px] sm:py-[12px] sm:text-[18px]">
                By now
              </button>
            </div>
          </div>
        </div>
      ) : errors ? (
        <PageNotFound />
      ) : null}
    </Layout>
  );
};

export default SingleProduct;
