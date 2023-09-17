import React, { useEffect } from "react";
import { useFormik } from "formik";
import { registerSchema } from "../utils/schema";
import { InputForm } from "../components/form/InputForm";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../utils/store/AppStore";

const initialValues = { name: "", email: "", password: "", c_password: "" };

const Register = () => {
  const navigate = useNavigate();
  const { user, registerUser } = useAppStore();
  const { errors, values, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: registerSchema,
      onSubmit: (values, action) => {
        registerUser(values, navigate);
      },
    });

  const formDatas = [
    { name: "name", type: "text", title: "Name", value: values.name },
    { name: "email", type: "email", title: "Email", value: values.email },
    {
      name: "password",
      type: "password",
      title: "Password",
      value: values.password,
    },
    {
      name: "c_password",
      type: "password",
      title: "Password",
      value: values.c_password,
    },
  ];

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="flex min-h-[100vh] flex-col items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="h-[90%] w-[80%] max-w-[550px] rounded-[15px] bg-white p-5 md:p-14"
      >
        <h2 className="py-5 text-center text-[20px] font-semibold">
          {" "}
          Register
        </h2>
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
        <div className="py-5">
          <button
            type="submit"
            className="w-full rounded-md bg-blue-950 px-5 py-3 text-white"
          >
            Submit
          </button>
        </div>
        <div className="flex items-center justify-end gap-1 py-4">
          <h2>
            Already have account ?{" "}
            <span
              className="cursor-pointer font-semibold text-slate-500"
              onClick={() => navigate("/login")}
            >
              Sign in here
            </span>{" "}
          </h2>
        </div>
      </form>
    </div>
  );
};

export default Register;
