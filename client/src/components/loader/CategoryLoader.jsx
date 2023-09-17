import React from "react";

const CategoryLoader = () => {
  return (
    <div className="flex h-[120px] w-full flex-col overflow-hidden bg-indigo-50 p-2 md:h-[150px]">
      <div className="h-full w-full animate-ping bg-gray-300" />
    </div>
  );
};

export default CategoryLoader;
