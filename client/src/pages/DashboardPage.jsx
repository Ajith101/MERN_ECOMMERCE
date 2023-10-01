import React, { useEffect, useState } from "react";
import axios from "../utils/store/axios";
import UserList from "../components/dashboard/UserList";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div className="my-5 flex w-full flex-col items-center px-2">
      <UserList />
    </div>
  );
};

export default DashboardPage;
