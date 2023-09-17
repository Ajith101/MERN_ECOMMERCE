import React from "react";

const ProductLoader = () => {
  return (
    <>
      <div className="my-4 flex flex-col gap-4 overflow-hidden rounded-lg">
        <div className="h-[240px] w-full overflow-hidden rounded-lg bg-indigo-50">
          <div className="h-full w-full animate-ping bg-gray-300"></div>
        </div>
        <div className="h-[30px] w-full overflow-hidden rounded-lg bg-indigo-50 ">
          <div className="h-full w-full animate-ping bg-gray-300"></div>
        </div>
        <div className="h-[30px] w-full overflow-hidden rounded-lg bg-indigo-50 ">
          <div className="h-full w-full animate-ping bg-gray-300"></div>
        </div>
        <div className="h-[30px] w-full overflow-hidden rounded-lg bg-indigo-50 ">
          <div className="h-full w-full animate-ping bg-gray-300"></div>
        </div>
      </div>
    </>
  );
};

export default ProductLoader;
