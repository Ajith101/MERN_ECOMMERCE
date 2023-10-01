import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useAppStore } from "../utils/store/AppStore";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "../utils/store/axios";

const DashBoardWrapper = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useAppStore();
  const [Navbar, setNavbar] = useState(false);
  const [details, setDetails] = useState(null);
  const navLinks = [
    { name: `All users (${details?.allUser})`, to: "/admin/dashboard" },
    { name: `Products (${details?.allProducts})`, to: "/admin/products" },
    { name: `Category's (${details?.allCategory})`, to: "/admin/category" },
    { name: `Brands (${details?.allBrands})`, to: "/admin/brand" },
  ];
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
  useEffect(() => {
    if (user?.role !== "admin") {
      navigate("/");
    }
  }, []);
  return (
    <div className="flex min-h-screen w-full bg-gray-100">
      <Sidebar setNavbar={setNavbar} Navbar={Navbar} />
      <div className="h-full w-full">
        <div className="flex flex-col items-center justify-center">
          <div className="my-4 flex items-center gap-3 overflow-x-scroll rounded-md bg-blue-950/40 p-3">
            {navLinks.map((item, id) => (
              <NavLink
                key={id}
                to={item.to}
                className={({ isActive }) =>
                  isActive
                    ? "shrink-0 rounded-xl bg-white px-2 py-2 font-semibold text-blue-950 sm:px-4"
                    : "shrink-0 px-2 py-2 text-gray-950 sm:px-4"
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default DashBoardWrapper;
