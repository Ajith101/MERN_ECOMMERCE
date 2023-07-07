import React from "react";
import Hero from "./components/pages/Hero";
import Header from "./components/nav/Header";
import Footer from "./components/nav/Footer";
import { Route, Routes } from "react-router-dom";
import Cart from "./components/pages/Cart.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SingleProduct from "./components/pages/SingleProduct";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import PageNotFound from "./components/pages/PageNotFound";

const App = () => {
  return (
    <>
      <Header />
      <ToastContainer autoClose={500} />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
