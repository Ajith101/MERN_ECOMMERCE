import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { useParams } from "react-router-dom";
import { useAppStore } from "../store/AppStore";
import StarRating from "../star/StarRating";
import PageNotFound from "./PageNotFound";

const SingleProduct = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [
    addToCart,
    getSingleProduct,
    singleItem,
    increaseQty,
    decreaseQtys,
    loading,
  ] = useAppStore((state) => {
    return [
      state.addToCart,
      state.getSingleProduct,
      state.singleItem,
      state.increaseQty,
      state.decreaseQtys,
      state.loading,
    ];
  });
  const { id } = useParams();
  useEffect(() => {
    getSingleProduct(id);
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <Layout>
      {loading ? (
        <span className="loader"></span>
      ) : singleItem ? (
        <div className="flex w-full flex-col gap-[25px] sm:flex-row">
          <div className="flex w-full flex-col sm:w-[50%]">
            <div className="flex flex-col items-center justify-center">
              <div className="h-[250px] w-[250px] rounded-[35px] sm:h-[450px] sm:w-[520px] sm:bg-[#F9F8F8] sm:p-[15px]">
                <img
                  src={
                    imagePreview
                      ? imagePreview
                        ? imagePreview
                        : "https://upload.wikimedia.org/wikipedia/commons/2/24/Circle-icons-image.svg"
                      : singleItem?.thumbnail
                  }
                  className="h-full w-full overflow-hidden rounded-[35px] object-contain"
                  alt=""
                />
              </div>
              <div className="grid grid-cols-5 gap-[15px] py-[20px] sm:gap-[40px]">
                {singleItem?.images?.map((item, id) => {
                  return (
                    <div
                      key={id}
                      className={`h-[80px] cursor-pointer border-[2px] ${
                        item === imagePreview
                          ? "overflow-hidden rounded-[10px] border-blue-950"
                          : null
                      }`}
                      onClick={() => setImagePreview(item)}
                    >
                      <img
                        src={item}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col gap-[10px] sm:w-[50%]">
            <span className="uppercase text-blue-950">
              {singleItem?.category}
            </span>
            <h1 className="text-[26px] font-[600]">{singleItem?.title}</h1>
            <StarRating rating={singleItem?.rating} />
            <p className="py-[15px] text-slate-600">
              {singleItem?.description}
            </p>
            <div className="flex items-center gap-[20px]">
              <h1 className="text-[22px] font-[700]">
                {"$"}
                {singleItem?.price}
              </h1>
              <span className="flex items-center justify-center rounded-[4px] bg-green-500 bg-opacity-90 px-[10px] py-[4px] text-center text-[12px] text-white">
                {singleItem?.discountPercentage}
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
                <p>{singleItem?.qty}</p>
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
      ) : (
        <PageNotFound />
      )}
    </Layout>
  );
};

export default SingleProduct;
