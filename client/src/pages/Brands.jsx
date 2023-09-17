import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../utils/store/AppStore";
import { AiFillFolderAdd } from "react-icons/ai";
import DeletePopup from "../components/DeletePopup";
import CategoryCard from "../components/CategoryCard";

const Brands = () => {
  const navigate = useNavigate();
  const [ShowpopUp, setShowpopUp] = useState(false);
  const [id, setId] = useState(null);
  const { deleteBrand, getBrands, brands } = useAppStore();

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <div className="mx-auto lg:w-[85%]">
      <div className="mx-auto my-8 flex items-center justify-between px-5">
        <div className="flex items-center gap-3">
          <h2>Filtered By</h2>
          <button className="hidden rounded-[8px] bg-white px-8 py-3 text-blue-700 shadow-md sm:block">
            All category
          </button>
        </div>
        <button
          onClick={() => navigate("/admin/brand/add")}
          className="flex cursor-pointer items-center gap-2 rounded-[8px] bg-blue-950 px-8 py-3 text-white transition-all duration-100 ease-out hover:scale-110 sm:flex"
        >
          <AiFillFolderAdd />
          New Brand
        </button>
      </div>
      <div className="mx-auto my-5 grid grid-cols-2 gap-x-4 gap-y-6 px-4 sm:grid-cols-3 md:px-0">
        {brands?.map((item, id) => {
          return (
            <CategoryCard
              setId={setId}
              setShowpopUp={setShowpopUp}
              path={"/admin/brand/edit/"}
              key={id}
              item={item}
            />
          );
        })}
      </div>
      {ShowpopUp ? (
        <DeletePopup
          handleDelete={deleteBrand}
          id={id}
          setShowpopUp={setShowpopUp}
        />
      ) : null}
    </div>
  );
};

export default Brands;
