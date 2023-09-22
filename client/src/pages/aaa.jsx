import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { InputForm } from "../components/form/InputForm";
import { forgotPasswordSchema } from "../utils/schema";
import axios from "../utils/store/axios";
import { toast } from "react-toastify";
import { useAppStore } from "../utils/store/AppStore";

const initialValues = {
  email: "",
};

const ForgotPassword = () => {
  const { forgotPassword } = useAppStore();
  const navigate = useNavigate();
  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: forgotPasswordSchema,
      onSubmit: async (values, action) => {
        forgotPassword(values);
      },
    });
  return (
    <div className="flex h-[90vh] flex-col items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="h-[80%] w-[80%] max-w-[550px] rounded-[15px] bg-white p-5 shadow-xl md:h-[80%] md:p-14"
      >
        <h2 className="py-5 text-center text-[20px] font-semibold">
          Forgot Password
        </h2>
        <InputForm
          title="Email"
          name="email"
          type="email"
          value={values.email}
          handleChange={handleChange}
          handleBlur={handleBlur}
          errors={errors}
          touched={touched}
        />
        <div className="py-5">
          <button
            type="submit"
            className="w-full rounded-md bg-blue-950 px-5 py-3 text-white"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
