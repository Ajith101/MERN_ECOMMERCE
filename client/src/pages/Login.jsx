import React, { useEffect } from "react";
import { useFormik } from "formik";
import { loginSchema } from "../utils/schema";
import { InputForm } from "../components/form/InputForm";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../utils/store/AppStore";

const initialValues = { email: "", password: "" };

const Login = () => {
  const { loginUser, user } = useAppStore();
  const navigate = useNavigate();
  const { errors, values, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: (values, action) => {
        loginUser(values, navigate);
      },
    });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="flex h-[90vh] flex-col items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="h-[80%] w-[80%] max-w-[550px] rounded-[15px] bg-white p-5 shadow-xl md:h-[80%] md:p-14"
      >
        <h2 className="py-5 text-center text-[20px] font-semibold"> Login</h2>
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
        <InputForm
          title="Password"
          name="password"
          type="password"
          value={values.password}
          handleChange={handleChange}
          handleBlur={handleBlur}
          errors={errors}
          touched={touched}
        />
        <h2
          onClick={() => navigate("/forgot-password")}
          className="cursor-pointer font-semibold text-slate-500 underline"
        >
          Forgot Password ?
        </h2>
        <div className="py-5">
          <button
            type="submit"
            className="w-full rounded-md bg-blue-950 px-5 py-3 text-white"
          >
            Submit
          </button>
        </div>
        <div className="flex items-center justify-end gap-1 py-4">
          <h2 className="text-slate-600">
            Don't have an account ?{" "}
            <span
              className="cursor-pointer font-semibold text-slate-500"
              onClick={() => navigate("/register")}
            >
              Signup
            </span>{" "}
          </h2>
        </div>
      </form>
    </div>
  );
};

export default Login;
