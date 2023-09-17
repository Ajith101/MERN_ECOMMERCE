import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useAppStore } from "../utils/store/AppStore";
import { useNavigate } from "react-router-dom";

const DashBoardWrapper = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useAppStore();
  const [Navbar, setNavbar] = useState(false);
  useEffect(() => {
    if (user?.role !== "admin") {
      navigate("/");
    }
  }, []);
  return (
    <div className="flex min-h-screen w-full bg-gray-100">
      <Sidebar setNavbar={setNavbar} Navbar={Navbar} />
      <div className="h-full w-full">{children}</div>
    </div>
  );
};

export default DashBoardWrapper;
