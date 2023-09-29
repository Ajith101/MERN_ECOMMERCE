import React, { useEffect, useState } from "react";
import axios from "../utils/store/axios";
import UserList from "../components/dashboard/UserList";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);
  const getDetails = async () => {
    try {
      const { data } = await axios(`/api/user/admin/details/`);
      setDetails(data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div className="my-5 flex w-full flex-col items-center px-2">
      <div className="flex w-full items-center gap-3 overflow-x-scroll">
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="flex w-full items-center justify-center bg-green-600 px-4 py-3 text-white"
        >
          All users {`(${details?.allUser})`}
        </button>
        <div
          onClick={() => navigate("/admin/products")}
          className="w-full bg-orange-600 px-4 py-3 text-white"
        >
          Products {`(${details?.allProducts})`}
        </div>
        <div
          onClick={() => navigate("/admin/category")}
          className="w-full bg-blue-600 px-4 py-3 text-white"
        >
          Category's {`(${details?.allCategory})`}
        </div>
        <div
          onClick={() => navigate("/admin/brand")}
          className="w-full bg-pink-600 px-4 py-3 text-white"
        >
          Brands {`(${details?.allBrands})`}
        </div>
      </div>
      <UserList />
    </div>
  );
};

export default DashboardPage;
