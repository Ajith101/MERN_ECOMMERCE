import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Layout>
      <div className="mx-auto my-0 max-w-[650px] bg-blue-200 p-[20px]">
        <h1 className="py-[25px] font-font-1 text-[16px] font-extrabold">
          About Us
        </h1>
        <p className="font-font-1 font-medium text-slate-800">
          we are passionate about creating an exceptional online shopping
          experience for our valued customers. Our platform is designed to bring
          you a diverse range of high-quality products, seamless navigation, and
          unmatched customer service. Our Mission: Our mission is simple yet
          ambitious: to revolutionize the way you shop online. We believe that
          shopping should be a delightful journey, not just a transaction. To
          achieve this, we work tirelessly to curate an extensive collection of
          products, sourced from reputable and innovative brands worldwide. We
          are committed to offering you a one-stop-shop where you can find
          everything you need, from the latest fashion trends to cutting-edge
          tech gadgets.
        </p>
      </div>
    </Layout>
  );
};

export default About;
