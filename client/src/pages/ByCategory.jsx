import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../utils/store/axios";
import ProductCard from "../components/ProductCard";
import { toast } from "react-toastify";
import { useAppStore } from "../utils/store/AppStore";
import Layout from "../components/layout/Layout";

const ByCategory = () => {
  const { getByCategory, categoryProducts } = useAppStore();
  const { name } = useParams();
  useEffect(() => {
    if (name) {
      getByCategory(name);
    }
  }, [name]);
  return (
    <Layout>
      <div className="item-center flex gap-2 py-4 font-bold">
        <h2>Home</h2>
        <h2>{categoryProducts?.length > 0 && name}</h2>
      </div>
      <h2 className="text-[18px] font-semibold">
        {categoryProducts?.length > 0 && name}
      </h2>
      <div className="my-4 grid min-h-[60vh] grid-cols-2 gap-[10px] sm:grid-cols-3 md:grid-cols-4 md:gap-[25px] lg:grid-cols-5">
        {categoryProducts?.map((item, id) => (
          <ProductCard item={item} key={id} />
        ))}
      </div>
    </Layout>
  );
};

export default ByCategory;
