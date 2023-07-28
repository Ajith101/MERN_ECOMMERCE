import { Outlet, createBrowserRouter } from "react-router-dom";
import Hero from "../pages/Hero";
import Header from "../components/nav/Header";
import Footer from "../components/nav/Footer";
import Cart from "../pages/Cart";
import About from "../pages/About";
import Contact from "../pages/Contact";
import SingleProduct from "../pages/SingleProduct";
import PageNotFound from "../pages/PageNotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swipper from "../components/Swipper";

const AppLayout = () => {
  return (
    <>
      <Header />
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
    ],
  },
]);
