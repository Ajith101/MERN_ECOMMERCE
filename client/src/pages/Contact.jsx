import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";

const Contact = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((pre) => ({ ...pre, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="mx-auto my-0 w-[90%] max-w-[650px] bg-blue-200">
        <h1 className="px-[15px] py-[20px] font-font-1 text-[18px] font-extrabold">
          Contact
        </h1>
        <form
          className="flex w-full flex-col gap-[10px] p-[10px]"
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="name" className="font-[600]">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formValues.name}
              onChange={handleChange}
              className="w-full rounded-[5px] px-[10px] py-[10px] text-slate-700 outline-none"
              placeholder="Name"
            />
          </div>
          <div>
            <label htmlFor="email" className="font-[600]">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formValues.email}
              onChange={handleChange}
              className="w-full rounded-[5px] px-[10px] py-[10px] outline-none"
              placeholder="Enter email address"
            />
          </div>
          <div>
            <label htmlFor="message" className="font-[600]">
              Message
            </label>
            <textarea
              name="message"
              className="w-full rounded-[5px] px-[10px] py-[5px] outline-none"
              value={formValues.message}
              onChange={handleChange}
              id="message"
              cols="30"
              rows="10"
            />
          </div>
          <button
            type="submit"
            className="w-fit cursor-pointer rounded-[6px] bg-blue-950 px-[25px] py-[8px] text-center text-[14px] font-[500] text-white sm:text-[16px]"
          >
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Contact;
