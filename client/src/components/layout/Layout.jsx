import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-100 py-[25px]">
      <div className="w-[95%] sm:w-[95%] md:w-[80%] lg:w-[75%] xl:w-[90%]">
        {children}
      </div>
    </div>
  );
};

export default Layout;
