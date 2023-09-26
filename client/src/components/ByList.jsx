import React from "react";
import Layout from "./layout/Layout";
import ProductCard from "./ProductCard";
import ProductLoader from "./loader/ProductLoader";
import { useNavigate } from "react-router-dom";

const ByList = ({ products, title, isFetching }) => {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="item-center flex gap-2 py-4 font-bold">
        <h2 className="cursor-pointer" onClick={() => navigate("/")}>
          Home
        </h2>
        {"/"}
        <h2>{products?.length > 0 && title}</h2>
      </div>{" "}
      <h2 className="text-[18px] font-bold">
        {products?.length > 0 && (
          <>
            {title} {`(${products?.length} Products)`}
          </>
        )}
      </h2>
      <div className="my-4 grid min-h-[60vh] grid-cols-2 gap-[10px] sm:grid-cols-3 md:grid-cols-4 md:gap-[25px] lg:grid-cols-5">
        {isFetching
          ? Array.from({ length: 8 }, (value, index) => (
              <ProductLoader key={index} />
            ))
          : products?.map((item, id) => <ProductCard item={item} key={id} />)}
      </div>
    </Layout>
  );
};

export default ByList;
