import { useFormik } from "formik";
import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAppStore } from "../../utils/store/AppStore";
import { InputForm } from "../../components/form/InputForm";
import { verifyOtpSchema } from "../../utils/schema";

const initialValues = {
  otp: "",
};

const VerifyOTP = () => {
  const { confirmOTP, tempUser } = useAppStore();
  const navigate = useNavigate();
  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: verifyOtpSchema,
      onSubmit: async (values, action) => {
        confirmOTP(values, navigate);
      },
    });

  return (
    <>
      {tempUser ? (
        <div className="flex h-[90vh] flex-col items-center justify-center bg-gray-100">
          <form
            onSubmit={handleSubmit}
            className="h-[80%] w-[80%] max-w-[550px] rounded-[15px] bg-white p-5 shadow-xl md:h-[80%] md:p-14"
          >
            <h2 className="py-5 text-center text-[20px] font-semibold">
              Verify OTP
            </h2>
            <InputForm
              title="OTP"
              name="otp"
              type="number"
              value={values.otp}
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
      ) : (
        <Navigate to="/login" replace={true} />
      )}
    </>
  );
};

export default VerifyOTP;
