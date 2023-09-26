import React, { useRef } from "react";
import useOuterClick from "./../../../hooks/outSideClick";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../utils/store/AppStore";

const LogOutMenu = ({ setUserMenu, userMenu }) => {
  const { logOut, user } = useAppStore();
  const navigate = useNavigate();
  const userMenuRef = useRef(null);
  useOuterClick(userMenuRef, setUserMenu);
  return (
    <div
      ref={userMenuRef}
      className={`absolute ${
        userMenu ? "opacity-100" : "opacity-0"
      } bottom-[-120px] left-[-40px] rounded-lg bg-blue-950 p-3 text-[16px] text-white transition-all duration-300 ease-in-out`}
    >
      {user ? (
        <>
          <h2 className="py-2">Profile</h2>
          <h2
            className="cursor-pointer"
            onClick={() => logOut(setUserMenu, navigate)}
          >
            Logout
          </h2>
        </>
      ) : (
        <>
          <h2
            className="cursor-pointer py-2"
            onClick={() => {
              navigate("/login");
              setUserMenu(false);
            }}
          >
            Login
          </h2>
          <h2
            className="cursor-pointer"
            onClick={() => {
              navigate("/register");
              setUserMenu(false);
            }}
          >
            Register
          </h2>
        </>
      )}
    </div>
  );
};

export default LogOutMenu;
