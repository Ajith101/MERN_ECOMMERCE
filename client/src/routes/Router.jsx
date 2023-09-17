import { Outlet, createBrowserRouter, useLocation } from "react-router-dom";
import Header from "../components/nav/Header";
import Footer from "../components/nav/Footer";
import {
  About,
  Cart,
  Contact,
  PageNotFound,
  Login,
  Register,
  Hero,
  AddProduct,
  Products,
  Category,
  AddCategory,
  DashboardPage,
} from "../pages/";
import SingleProduct from "../pages/SingleProduct";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashBoardWrapper from "../components/DashBoardWrapper";
import AddBrand from "../pages/AddBrand";
import { useEffect, useMemo } from "react";
import { useAppStore } from "../utils/store/AppStore";
import Brands from "../pages/Brands";

const AppLayout = () => {
  const location = useLocation();
  const { loading } = useAppStore();

  // useEffect(() => {

  // }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location]);
  return (
    <>
      <Header />
      {loading ? <span className="loader"></span> : null}
      <ToastContainer autoClose={500} />
      <Outlet />
      <Footer />
    </>
  );
};

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: (
      <>
        <Header />
        <PageNotFound />
        <Footer />
      </>
    ),
    children: [
      {
        path: "",
        element: <Hero />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/product/:id",
        element: <SingleProduct />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "",
        element: (
          <DashBoardWrapper>
            <Outlet />
          </DashBoardWrapper>
        ),
        children: [
          { path: "/admin/dashboard", element: <DashboardPage /> },
          {
            path: "/admin/add-product",
            element: <AddProduct />,
          },
          {
            path: "/admin/edit-product/:id",
            element: <AddProduct />,
          },
          {
            path: "/admin/add-product",
            element: <AddProduct />,
          },
          {
            path: "/admin/products",
            element: <Products />,
          },
          {
            path: "/admin/category",
            element: <Category />,
          },
          {
            path: "/admin/add-category",
            element: <AddCategory />,
          },
          {
            path: "/admin/edit-category/:id",
            element: <AddCategory />,
          },
          {
            path: "/admin/brand",
            element: <Brands />,
          },
          {
            path: "/admin/brand/add",
            element: <AddBrand />,
          },
          {
            path: "/admin/brand/edit/:id",
            element: <AddBrand />,
          },
        ],
      },
    ],
  },
]);
