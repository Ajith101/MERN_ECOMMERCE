import React, { useEffect, useState } from "react";
import { useAppStore } from "../utils/store/AppStore";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ProductLoader from "../components/loader/ProductLoader";
import axios from "../utils/store/axios";
import ProductCard from "../components/ProductCard";
import { useScreenSize } from "../../hooks/screenSize";
import { BsEmojiFrown } from "react-icons/bs";
import Pagination from "../components/Pagination";

const Store = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [details, setDetails] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const { width } = useScreenSize();
  const { getAllBrands, brands, categorys, isFetching } = useAppStore();
  const navigate = useNavigate();
  const rating = searchParams.get("rating") ? searchParams.get("rating") : "";
  const sort = searchParams.get("sort") ? searchParams.get("sort") : "";
  const brand = searchParams.get("brand") ? searchParams.get("brand") : "";
  const page = searchParams.get("page") ? searchParams.get("page") : 1;
  const categoryId = searchParams.get("categoryId")
    ? searchParams.get("categoryId")
    : "";
  const [allProducts, setAllProducts] = useState([]);
  const [formData, setFormData] = useState({
    rating,
    categoryId,
    brand,
    sort,
    page,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((pre) => ({ ...pre, [name]: value }));
    setFormData((pre) => ({ ...pre, [name]: value }));
  };

  const handlePagination = (page) => {
    setFormData((pre) => ({ ...pre, page }));
    setDetails((pre) => ({ ...pre, page }));
    setCurrentPage(page);
  };

  const getAllProducts = async () => {
    try {
      useAppStore.setState((state) => ({
        isFetching: { ...state.isFetching, products: true, loading: true },
      }));
      const { data, status } = await axios(`/api/products/by`, {
        params: { ...formData },
      });
      if (status === 200) {
        useAppStore.setState((state) => ({
          isFetching: { ...state.isFetching, products: false, loading: false },
        }));
        setAllProducts(data);
        setCurrentPage(data.page);
        setTotalPages(data.numberOfPages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
    if (details) {
      setSearchParams(details);
    }
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [details, currentPage]);

  useEffect(() => {
    getAllBrands();
  }, []);

  const displayProducts = allProducts?.products?.map((item, id) => (
    <ProductCard item={item} key={id} />
  ));

  return (
    <div className="mx-auto min-h-[60vh] w-[95%]">
      <div className="item-center flex gap-2 py-4 font-bold">
        <h2 className="cursor-pointer" onClick={() => navigate("/")}>
          Home
        </h2>
        {"/"}
        <h2 className="font-thin text-gray-400">store</h2>
      </div>{" "}
      <div className="mt-2 flex h-full flex-col gap-10 sm:w-[90%] sm:flex-row">
        {width > 640 && (
          <div className="h-fit w-[320px] rounded-md border-[1px] bg-gray-100 p-2 shadow-md sm:p-6">
            <h2 className="text-[20px] font-bold">Filtered By</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="flex flex-col">
                <label
                  htmlFor="category"
                  className="pb-3 pt-6 text-[16px] font-bold"
                >
                  Category
                </label>
                <select
                  name="categoryId"
                  id="categoryId"
                  value={formData.categoryId}
                  className="rounded-md border-[1px] p-2 outline-none"
                  onChange={handleChange}
                >
                  <option value="">Choose a category</option>
                  {categorys?.map((item, id) => (
                    <option key={id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="brand"
                  className="pb-3 pt-6 text-[16px] font-bold"
                >
                  Brand
                </label>
                <select
                  name="brand"
                  id="brand"
                  value={formData.brand}
                  className="rounded-md border-[1px] p-2 outline-none"
                  onChange={handleChange}
                >
                  <option value="">Choose a brands</option>
                  {brands?.map((item, id) => (
                    <option key={id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </form>
          </div>
        )}

        <div className="flex h-full w-full flex-col gap-3">
          <div className="h-fit w-full rounded-md border-[1px] bg-gray-100 p-2 shadow-md sm:p-6">
            <form
              className="flex flex-wrap items-center gap-2 sm:gap-5"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <select
                name="sort"
                id="sort"
                value={formData.sort}
                className="rounded-md border-[1px] py-2 outline-none sm:px-6 sm:py-3"
                onChange={handleChange}
              >
                <option value="">Sort</option>
                <option value="high">High</option>
                <option value="low">Low</option>
                <option value="a-z">A-Z</option>
                <option value="z-a">Z-A</option>
              </select>

              <select
                name="rating"
                id="rating"
                value={formData.rating}
                className="rounded-md border-[1px] px-2 py-2 outline-none sm:px-6 sm:py-3"
                onChange={handleChange}
              >
                <option value="">Rating</option>
                {Array.from({ length: 5 }, (ele, index) => (
                  <option value={index + 1} key={index}>
                    {index + 1}
                  </option>
                ))}
              </select>
              {width < 640 && (
                <>
                  <div className="flex items-center gap-2">
                    <select
                      name="categoryId"
                      id="categoryId"
                      value={formData.categoryId}
                      className="rounded-md border-[1px] py-2 outline-none"
                      onChange={handleChange}
                    >
                      <option value="">Choose a category</option>
                      {categorys?.map((item, id) => (
                        <option key={id} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    <select
                      name="brand"
                      id="brand"
                      value={formData.brand}
                      className="rounded-md border-[1px] py-2 outline-none"
                      onChange={handleChange}
                    >
                      <option value="">Choose a brands</option>
                      {brands?.map((item, id) => (
                        <option key={id} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}
            </form>
          </div>
          {!allProducts?.products?.length && !isFetching?.products && (
            <div className="flex min-h-[60vh] w-full items-center justify-center gap-5">
              <BsEmojiFrown size={38} />{" "}
              <h2 className="text-[20px] font-bold tracking-wider text-gray-500">
                No Products Found
              </h2>
            </div>
          )}
          <div className="grid h-full grid-cols-2 gap-[10px] overflow-y-auto pb-6 sm:grid-cols-2 md:grid-cols-3 md:gap-[20px] lg:grid-cols-4 xl:grid-cols-5">
            {isFetching?.products
              ? Array.from({ length: 20 }, (ele, ind) => (
                  <ProductLoader key={ind} />
                ))
              : displayProducts}
          </div>
          <Pagination
            handlePagination={handlePagination}
            setFormData={setFormData}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPage={totalPages}
          />
        </div>
      </div>
    </div>
  );
};

export default Store;
