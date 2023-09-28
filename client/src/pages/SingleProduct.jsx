import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useParams } from "react-router-dom";
import { useAppStore } from "../utils/store/AppStore";
import StarRating from "../components/StarRating";
import PageNotFound from "./PageNotFound";
import Swipper from "../components/Swipper";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineAssignment } from "react-icons/md";
import SingleProductLoader from "../components/loader/SingleProductLoader";

const SingleProduct = () => {
  const [quantity, setQuantity] = useState(1);
  const [imagePreview, setImagePreview] = useState(null);
  const {
    addToCart,
    getSingleProduct,
    singleItem,
    increaseQty,
    decreaseQtys,
    loading,
    errors,
    isFetching,
  } = useAppStore();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleProduct(id);
    }
  }, [id]);

  return (
    <Layout>
      {isFetching?.singleProduct ? (
        <SingleProductLoader />
      ) : singleItem ? (
        <>
          <div className="flex w-full flex-col gap-[25px] sm:flex-row">
            <div className="flex w-full flex-col sm:w-[50%]">
              <div className="flex flex-col items-center justify-center">
                <Swipper image={singleItem?.images} />
              </div>
            </div>
            <div className="flex w-full flex-col gap-[10px] sm:w-[50%]">
              {/* <span className="uppercase text-blue-950">
            {singleItem?.category?.name}
          </span> */}
              <h1 className="text-[26px] font-[600]">
                {singleItem?.name.charAt(0).toUpperCase() +
                  singleItem?.name.slice(1)}
              </h1>
              <p className="text-slate-400">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Ratione, excepturi accusantium rerum facere natus vero inventore
                libero sit praesentium quo, id ad illum sequi saepe quisquam
                recusandae veritatis deleniti culpa.
              </p>
              <p className="text-slate-400">{singleItem?.description}</p>
              <StarRating rating={singleItem?.totalRatings} />
              <div className="flex items-center gap-[20px]">
                <h1 className="text-[22px] font-[700]">
                  {"$"}
                  {singleItem?.price}
                </h1>
                <s className="text-[18px] text-slate-600">
                  {"$"}
                  {Math.ceil(
                    (singleItem?.price * 100) /
                      (100 - singleItem?.discountPrice)
                  )}
                </s>
                <span className="flex items-center justify-center rounded-xl bg-[red] bg-opacity-90 px-[10px] py-[3px] text-center text-[12px] text-white">
                  {singleItem?.discountPrice}
                  {"%"}
                </span>
              </div>
              <div className="flex items-center pt-[10px]">
                <div className="shadows flex items-center rounded-[5px] bg-[#f7f8fd]">
                  <button
                    disabled={quantity === 1}
                    onClick={() => setQuantity((pre) => pre - 1)}
                    className="px-[14px] py-[8px] text-center text-[16px] sm:px-[20px] sm:text-[28px]"
                  >
                    -
                  </button>
                  {/* <p>{checkCartExist ? checkCartExist?.qty : singleItem?.qty}</p> */}
                  <p>{quantity}</p>
                  <button
                    onClick={() => setQuantity((pre) => pre + 1)}
                    className="px-[14px] py-[8px] text-center text-[16px] sm:px-[20px] sm:text-[28px]"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-[25px] py-[25px]">
                <button
                  onClick={() => addToCart(singleItem, quantity)}
                  className="rounded-[5px] bg-blue-950 px-[15px] py-[8px] text-center text-[16px] text-white"
                >
                  Add to cart
                </button>
                <button className="rounded-[5px] bg-blue-600 px-4 py-2 text-white">
                  By now
                </button>
              </div>
            </div>
          </div>
          <div className="max-w-[820px]">
            <div className="rounded-sm border-[1px] border-blue-600 bg-blue-50 p-3 text-blue-600">
              <h2 className="flex items-center gap-2 font-semibold">
                <TbTruckDelivery color="indigo" /> Free Delivery
              </h2>
              <p className="pt-1 text-[14px] tracking-wider text-gray-500 underline">
                Enter your postal code to check available or not.
              </p>
            </div>
            <div className="rounded-sm border-[1px] border-t-0 border-blue-600 bg-blue-50 p-3 text-blue-600">
              <h2 className="flex items-center gap-2 font-semibold">
                <MdOutlineAssignment color="indigo" /> Return Policy
              </h2>
              <p className="pt-1 text-[14px] tracking-wider text-gray-500 underline">
                check here if the product return available or not.
              </p>
            </div>
            <h2 className="my-3 pt-4 text-[26px] font-[600]">
              {singleItem?.name} Full specifications
            </h2>
            <div className="rounded-md bg-gray-200 p-3">
              <h2 className="font-semibold">General</h2>
              <div className="mt-2 flex items-center gap-3 rounded-md bg-white p-3">
                <p className="w-1/2">Brand</p>
                <span className="w-1/2 text-gray-500">
                  {singleItem?.brand?.name}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-3 rounded-md bg-white p-3">
                <p className="w-1/2">Category</p>
                <span className="w-1/2 text-gray-500">
                  {singleItem?.category?.name}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-3 rounded-md bg-white p-3">
                <p className="w-1/2">Product Name</p>
                <span className="w-1/2 text-gray-500">{singleItem?.name}</span>
              </div>
              <div className="mt-2 flex items-center gap-3 rounded-md bg-white p-3">
                <p className="w-1/2">Price</p>
                <span className="w-1/2 text-gray-500">{singleItem?.price}</span>
              </div>
              <div className="mt-2 flex items-center gap-3 rounded-md bg-white p-3">
                <p className="w-1/2">Stock</p>
                <span className="w-1/2 text-gray-500">{singleItem?.stock}</span>
              </div>
            </div>
          </div>
          <div className="mt-8 max-w-[820px] rounded-md bg-gray-200 p-3">
            <h2 className="font-semibold">Product Details</h2>
            {singleItem?.specifications?.map((item, id) => (
              <div
                key={id}
                className="mt-2 flex items-center gap-3 rounded-md bg-white p-3"
              >
                <p className="w-1/2">{item?.name}</p>
                <span className="w-1/2 text-gray-500">{item?.detail}</span>
              </div>
            ))}
          </div>
        </>
      ) : errors ? (
        <PageNotFound />
      ) : null}
    </Layout>
  );
};

export default SingleProduct;
