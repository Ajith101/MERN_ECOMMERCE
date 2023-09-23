import React from "react";
import { useAppStore } from "../../utils/store/AppStore";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineAssignment } from "react-icons/md";
import Layout from "../layout/Layout";
import SwipperLoader from "./SwipperLoader";

const SingleProductLoader = () => {
  return (
    <>
      <Layout>
        <div className="flex w-full flex-col gap-[25px] sm:flex-row">
          <div className="flex w-full flex-col sm:w-[50%]">
            <div className="flex flex-col items-center justify-center">
              <SwipperLoader />
            </div>
          </div>
          <div className="flex w-full flex-col gap-[10px] sm:w-[50%]">
            <h1 className="h-8 w-full overflow-hidden bg-indigo-50">
              <div className="h-full w-full animate-ping bg-gray-300"></div>
            </h1>
            <div className="h-32 w-full overflow-hidden bg-indigo-50">
              <div className="h-full w-full animate-ping bg-gray-300"></div>
            </div>
            <div className="h-[450px] overflow-hidden bg-indigo-50">
              <div className="h-full animate-ping bg-gray-300"></div>
            </div>
          </div>
        </div>
        <div className="mt-5 max-w-[820px]">
          <div className="overflow-hidden bg-indigo-50">
            <div className="h-[180px] animate-ping rounded-sm bg-gray-300"></div>
          </div>
          <div className="mt-5 overflow-hidden rounded-md bg-indigo-50">
            <div className="h-[480px] animate-ping rounded-sm bg-gray-300"></div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default SingleProductLoader;
