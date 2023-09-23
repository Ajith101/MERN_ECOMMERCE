import React, { useEffect, useState } from "react";
import axios from "../utils/store/axios";
import UserList from "../components/dashboard/UserList";
import { useAppStore } from "../utils/store/AppStore";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { getAllUsers } = useAppStore();
  const [details, setDetails] = useState(null);
  const getDetails = async () => {
    try {
      const { data } = await axios(`/api/user/admin/details/`);
      setDetails(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div className="my-5 flex flex-col items-center px-2">
      <div className="flex w-full items-center justify-between gap-3 overflow-x-auto">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="w-full bg-green-600 px-4 py-3 text-white"
        >
          All users {`(${details?.allUser})`}
        </div>
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
