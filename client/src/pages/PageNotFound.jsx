import React from "react";
import { useNavigate } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-[90vh] w-full flex-col items-center justify-center text-center">
      <div className="flex w-[90%] max-w-[650px] flex-col gap-[15px] rounded-[30px] bg-[#E7E9ED] p-[15px] shadow-lg">
        <h1 className="font-font-1 text-[45px] font-extrabold text-blue-950">
          404
        </h1>
        <h2 className="text-[25px] font-[700] text-[#274C5B]">
          Page not found
        </h2>
        <h2 className="text-[16px] font-[500] text-[#525C60]">
          The page you are looking for doesn't exist or has been moved
        </h2>

        <div className="flex items-center justify-center">
          <div
            onClick={() => navigate("/")}
            className="mt-[20px] flex w-fit items-center justify-center gap-[20px] rounded-[16px] bg-blue-950 px-[25px] py-[15px] text-center text-[18px] font-[500] text-white"
          >
            Go to Homepage{" "}
            <div className="relative h-[30px] w-[30px] rounded-full bg-[#455076] p-[2px]">
              <HiArrowRight className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
