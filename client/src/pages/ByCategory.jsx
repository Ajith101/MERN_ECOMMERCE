import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useAppStore } from "../utils/store/AppStore";
import Layout from "../components/layout/Layout";
import ProductLoader from "../components/loader/ProductLoader";

const ByCategory = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const currentPath = pathname.split("/")[1];
  const { getByCategory, categoryProducts, isFetching } = useAppStore();
  const { name } = useParams();
  useEffect(() => {
    if (name) {
      getByCategory(name, currentPath);
    }
  }, [name]);
  return (
    <Layout>
      <div className="item-center flex gap-2 py-4 font-bold">
        <h2 className="cursor-pointer" onClick={() => navigate("/")}>
          Home
        </h2>
        {"/"}
        <h2>{categoryProducts?.length > 0 && name}</h2>
      </div>{" "}
      {name.slice(1)}
      <h2 className="text-[18px] font-bold">
        {categoryProducts?.length > 0 && (
          <>
            {name} {`(${categoryProducts?.length} Products)`}
          </>
        )}
      </h2>
      <div className="my-4 grid min-h-[60vh] grid-cols-2 gap-[10px] sm:grid-cols-3 md:grid-cols-4 md:gap-[25px] lg:grid-cols-5">
        {isFetching?.products
          ? Array.from({ length: 8 }, (value, index) => (
              <ProductLoader key={index} />
            ))
          : categoryProducts?.map((item, id) => (
              <ProductCard item={item} key={id} />
            ))}
      </div>
    </Layout>
  );
};

export default ByCategory;
