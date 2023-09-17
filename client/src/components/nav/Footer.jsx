import React, { useEffect } from "react";
import { useAppStore } from "../../utils/store/AppStore";

const Footer = () => {
  const { categorys, getCategoryNames } = useAppStore();
  useEffect(() => {
    getCategoryNames();
  }, []);
  return (
    <>
      <div className="w-full bg-blue-950 px-[20px] py-[10px] text-white sm:py-[50px] md:px-[50px]">
        {" "}
        <div className="flex w-full flex-col gap-[20px] md:flex-row md:items-start md:justify-between md:px-[50px]">
          <div className="flex w-[80%] flex-col items-start md:w-auto">
            <h1 className="text-[20px] font-[700] sm:text-[24px]">
              Shopping App
            </h1>

            <p>
              Shop Smarter, Shop Better - Enjoy Convenience and Quality at Your
              Fingertips !
            </p>
          </div>
          <div className="">
            <h1 className="text-[20px] font-[700]">Category</h1>
            {categorys?.slice(0, 5).map((item, id) => {
              return (
                <h3 key={id}>
                  {item?.name?.charAt(0).toUpperCase() + item.name?.slice(1)}
                </h3>
              );
            })}
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center pt-[30px]">
          <div className="w-full border-t-[1px] py-[20px]">
            <h2 className="">© 2023 by Shopping App. All rights reserved.</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
