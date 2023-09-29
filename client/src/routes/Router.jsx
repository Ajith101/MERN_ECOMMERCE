import { Outlet, createBrowserRouter, useLocation } from "react-router-dom";
import Header from "../components/nav/Header";
import Footer from "../components/nav/Footer";
import {
  About,
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
  ByCategory,
  ForgotPassword,
  VerifyOTP,
  PasswordReset,
  VerifyRegister,
  Search,
  SingleProduct,
  PopularProducts,
  AddBrand,
  Brands,
  ByBrand,
} from "../pages/";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashBoardWrapper from "../components/DashBoardWrapper";
import { useEffect } from "react";
import { useAppStore } from "../utils/store/AppStore";
import SingleProductLoader from "../components/loader/SingleProductLoader";

const AppLayout = () => {
  const { pathname } = useLocation();
  const { loading } = useAppStore();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);
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
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "product/:id",
        element: <SingleProduct />,
      },
      {
        path: "cat-product/:name",
        element: <ByCategory />,
      },
      {
        path: "brand-product/:name",
        element: <ByBrand />,
      },
      {
        path: "popular-products",
        element: <PopularProducts />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "forgot-password/confirm-otp",
        element: <VerifyOTP />,
      },
      {
        path: "user/verify",
        element: <VerifyRegister />,
      },
      {
        path: "forgot-password/new",
        element: <PasswordReset />,
      },
      {
        path: "si",
        element: <SingleProductLoader />,
      },
      {
        path: "/admin",
        element: (
          <DashBoardWrapper>
            <Outlet />
          </DashBoardWrapper>
        ),
        children: [
          { path: "dashboard", element: <DashboardPage /> },
          {
            path: "add-product",
            element: <AddProduct />,
          },
          {
            path: "edit-product/:id",
            element: <AddProduct />,
          },
          {
            path: "add-product",
            element: <AddProduct />,
          },
          {
            path: "products",
            element: <Products />,
          },
          {
            path: "category",
            element: <Category />,
          },
          {
            path: "add-category",
            element: <AddCategory />,
          },
          {
            path: "edit-category/:id",
            element: <AddCategory />,
          },
          {
            path: "brand",
            element: <Brands />,
          },
          {
            path: "brand/add",
            element: <AddBrand />,
          },
          {
            path: "brand/edit/:id",
            element: <AddBrand />,
          },
        ],
      },
    ],
  },
  {
    path: "/search",
    element: <Search />,
  },
]);
