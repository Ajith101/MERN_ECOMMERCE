import React from "react";

const SwipperLoader = () => {
  return (
    <>
      <div className="h-[250px] w-[250px] overflow-hidden bg-indigo-50 sm:h-[350px] sm:w-[350px]">
        <div className="h-full w-full animate-ping rounded-[35px] bg-gray-300" />
      </div>

      <div className="mt-5 flex w-full items-center justify-center gap-5">
        {Array.from({ length: 4 }, (value, index) => (
          <div
            className="h-[60px] w-[60px] overflow-hidden bg-indigo-50"
            key={index}
          >
            <div className="h-full w-full animate-ping bg-gray-300" />
          </div>
        ))}
      </div>
    </>
  );
};

export default SwipperLoader;
