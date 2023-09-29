import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useFormik } from "formik";
import { contactUsSchema } from "../utils/schema";
import { InputForm } from "../components/form/InputForm";
import axios from "../utils/store/axios";
import { toast } from "react-toastify";

const initialValues = { name: "", email: "", message: "" };

const Contact = () => {
  const { values, touched, handleBlur, handleChange, handleSubmit, errors } =
    useFormik({
      validationSchema: contactUsSchema,
      initialValues,
      onSubmit: async (values, action) => {
        try {
          const { status } = await axios("/api/user/contact-us", {
            method: "POST",
            data: { ...values },
          });
          if (status === 200) {
            toast.success("Message sended");
          }
        } catch (error) {
          toast.error(error?.response?.data?.message);
        }
      },
    });
  const formDatas = [
    { name: "name", type: "text", title: "Name", value: values.name },
    { name: "email", type: "email", title: "Email", value: values.email },
  ];

  return (
    <div className="min-h-[90vh]">
      <h1 className="px-[20px] py-[20px] font-font-1 text-[20px] font-extrabold">
        Contact
      </h1>
      <div className="mx-auto my-0 w-[90%] max-w-[650px] bg-blue-100">
        <form className="flex w-full flex-col p-[10px]" onSubmit={handleSubmit}>
          {formDatas?.map((item, id) => {
            return (
              <InputForm
                key={id}
                title={item.title}
                name={item.name}
                type={item.type}
                value={item.value}
                handleChange={handleChange}
                handleBlur={handleBlur}
                errors={errors}
                touched={touched}
              />
            );
          })}
          <div className="flex flex-col pb-4">
            <label htmlFor="email" className="text-gray-500">
              Message
            </label>
            {errors.message && touched.message ? (
              <span className="text-[14px] text-red-600">{errors.message}</span>
            ) : null}
            <textarea
              id="message"
              name="message"
              className="w-full rounded-xl border-[1px] p-2 outline-none"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.message}
            />
          </div>
          <button type="submit" className="btn-blue hover:text-white">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
