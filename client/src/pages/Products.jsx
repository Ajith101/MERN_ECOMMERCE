import React, { useEffect, useState } from "react";
import ProductCard from "../components/dashboard/ProductCard";
import { useNavigate } from "react-router-dom";
import { AiFillFileAdd } from "react-icons/ai";
import { BiSortDown } from "react-icons/bi";
import DeletePopup from "../components/DeletePopup";
import { useAppStore } from "../utils/store/AppStore";
import { BsFilter } from "react-icons/bs";

const Products = () => {
  const navigate = useNavigate();
  const { getAllProducts, allProducts, deleteProduct } = useAppStore();
  const [ShowpopUp, setShowpopUp] = useState(false);
  const [id, setId] = useState(null);

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="mx-auto xl:w-[85%]">
      <div className="mx-auto my-1 flex items-center justify-end gap-1 px-5">
        <button
          onClick={() => navigate("/admin/add-product")}
          className="flex cursor-pointer items-center gap-1 rounded-[8px] bg-blue-950 px-3 py-3 text-white transition-all duration-100 ease-out hover:scale-110 sm:gap-2 md:px-8"
        >
          <AiFillFileAdd />
          Add Product
        </button>
      </div>
      <div className="flex flex-col gap-3 p-5">
        <div className="grid grid-cols-5 p-3 font-semibold">
          <h2 className="col-span-2">Product Name</h2>
          <h2>Price</h2>
          <h2>stock</h2>
          <h2>sold</h2>
        </div>
        {allProducts.map((item, id) => {
          return (
            <ProductCard
              setId={setId}
              setShowpopUp={setShowpopUp}
              item={item}
              key={id}
            />
          );
        })}
      </div>
      {ShowpopUp ? (
        <DeletePopup
          handleDelete={deleteProduct}
          id={id}
          setShowpopUp={setShowpopUp}
        />
      ) : null}
    </div>
  );
};

export default Products;
