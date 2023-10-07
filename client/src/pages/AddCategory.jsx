import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { categorySchema, editCategorySchema } from "../utils/schema";
import { IoIosCloseCircle } from "react-icons/io";
import { BsCloudUploadFill } from "react-icons/bs";
import { InputForm } from "../components/form/InputForm";
import { useAppStore } from "../utils/store/AppStore";
import { useNavigate, useParams } from "react-router-dom";

const initialValues = {
  name: "",
  image: "",
};

const AddCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addCategory, getCategory, editCategory, removeCategoryImage } =
    useAppStore();
  const fileRef = useRef(null);
  const {
    handleBlur,
    handleChange,
    values,
    errors,
    touched,
    handleSubmit,
    setValues,
  } = useFormik({
    validationSchema: id ? editCategorySchema : categorySchema,
    initialValues,
    onSubmit: async (values, action) => {
      if (id) {
        editCategory(values, navigate);
      } else {
        addCategory(values, navigate);
      }
    },
  });

  const handleImage = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setValues((pre) => ({
          ...pre,
          image: reader.result,
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    if (id && values?.image?.public_id) {
      removeCategoryImage(values, setValues);
    } else setValues((pre) => ({ ...pre, image: "" }));
  };

  useEffect(() => {
    if (id) {
      getCategory(id, setValues, navigate);
    }
  }, [id]);

  return (
    <div className="my-10 flex min-h-screen w-full flex-col items-center justify-center">
      <div className="flex h-[80%] w-[80%] max-w-[550px] flex-col">
        <h2 className="py-4 text-[18px] font-semibold text-slate-700">
          {id ? "Edit Category" : "Add Category"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="shadows rounded-2xl bg-white p-5"
        >
          <InputForm
            title="Name"
            name="name"
            type="text"
            value={values.name}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
            touched={touched}
          />
          <div className="flex flex-col gap-2">
            {errors.image && touched.image ? (
              <span className="text-[14px] text-red-600">{errors.image}</span>
            ) : null}
            <input
              ref={fileRef}
              onChange={handleImage}
              name="images"
              type="file"
              accept="image/*"
              className="hidden"
            />

            <div className="grid grid-cols-2 gap-x-2 gap-y-2 pb-3 md:grid-cols-3">
              {values?.image ? (
                <div className="relative h-[120px] w-full rounded-2xl border-[1px] p-2 md:h-[150px]">
                  <img
                    src={
                      values?.image?.url ? values?.image?.url : values?.image
                    }
                    className="h-full w-full overflow-hidden object-contain"
                  />
                  <IoIosCloseCircle
                    onClick={removeImage}
                    size={"22px"}
                    color="red"
                    className="absolute right-[5px] top-[5px] cursor-pointer"
                  />
                </div>
              ) : (
                <div
                  onClick={() => fileRef.current.click()}
                  className="flex h-[120px] cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-[2px] border-dotted border-violet-500 bg-violet-50 p-2 text-center md:h-[150px]"
                >
                  <BsCloudUploadFill size={"22px"} color="#7C3AED" />
                  <span className="font-[500] text-violet-600">
                    click to upload file
                  </span>
                </div>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="my-5 rounded-xl bg-blue-950 px-5 py-2 text-white hover:shadow-xl"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
