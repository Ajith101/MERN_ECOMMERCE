import React, { useEffect, useRef, useState } from "react";
import { InputForm } from "../components/form/InputForm";
import { useFormik } from "formik";
import { addProductSchema } from "../utils/schema";
import { useAppStore } from "../utils/store/AppStore";
import { IoIosCloseCircle } from "react-icons/io";
import { BsCloudUploadFill } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import axios from "../utils/store/axios";
import { useNavigate, useParams } from "react-router-dom";

const initialValues = {
  name: "",
  description: "",
  discountPrice: "",
  discount: "",
  price: "",
  stock: "",
  category: "",
  size: [],
  images: [],
  tags: [],
  color: [],
  specifications: [],
  brand: "",
  totalRatings: "1",
  sold: "",
};

const AddProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [newImages, setNewImages] = useState([]);
  const [tags, setTags] = useState("");
  const fileRef = useRef(null);
  const tagRef = useRef(null);
  const {
    categorys,
    getSingleProductEdit,
    singleItem,
    addProduct,
    editProduct,
    removeImage,
  } = useAppStore();
  const {
    handleBlur,
    values,
    setValues,
    handleChange,
    handleSubmit,
    touched,
    errors,
  } = useFormik({
    validationSchema: addProductSchema,
    initialValues,
    onSubmit: (values, action) => {
      if (id) {
        editProduct({ ...values, newImages }, id, navigate);
      } else {
        addProduct(values, navigate);
      }
    },
  });

  const handleImage = (e) => {
    let files = Array.from(e.target.files);
    let newFiles = [];
    files.forEach((item) => {
      let reader = new FileReader();
      reader.readAsDataURL(item);
      reader.onload = () => {
        if (reader.readyState === 2) {
          newFiles.push(reader.result);
          if (id) {
            setNewImages((pre) => [...pre, reader.result]);
          } else {
            setValues((pre) => ({
              ...pre,
              images: [...pre.images, ...newFiles],
            }));
          }
        }
      };
    });
  };

  const removeNewImage = (image) => {
    setNewImages((pre) => [...pre.filter((item) => item !== image)]);
  };

  const formData = [
    {
      name: "name",
      title: "Product Name",
      type: "text",
      value: values.name,
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      value: values.description,
    },
    {
      name: "stock",
      title: "Stock",
      type: "number",
      value: values.stock,
    },
    {
      name: "discountPrice",
      title: "Discount price",
      type: "number",
      value: values.discountPrice,
    },
    {
      name: "discount",
      title: "Discount",
      type: "number",
      value: values.discount,
    },
    {
      name: "price",
      title: "Price",
      type: "number",
      value: values.price,
    },
  ];

  const getAllBrand = async () => {
    try {
      const { data } = await axios("/api/brand");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTags = (e) => {
    const { value } = e.target;
    if (value) {
      setValues((pre) => ({ ...pre, tags: [...pre.tags, value] }));
      e.target.value = "";
    }
  };

  const removeTags = (tag) => {
    setValues((pre) => ({
      ...pre,
      tags: [...pre.tags.filter((item) => item !== tag)],
    }));
  };

  useEffect(() => {
    if (id) {
      getSingleProductEdit(id, setValues);
    }
  }, [id]);

  return (
    <div className="my-10 flex min-h-screen w-full items-center justify-center">
      <div className="flex h-[80%] w-[80%] max-w-[550px] flex-col">
        <h2 className="py-4 text-[18px] font-semibold text-slate-700">
          {id ? "Edit Product" : "Add Product"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="shadows rounded-2xl bg-white p-5"
        >
          {formData?.map((item, id) => {
            if (id < 2)
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
          <div className="grid grid-cols-2 gap-3">
            {formData?.map((item, id) => {
              if (id > 1)
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
          </div>
          <div className="flex flex-col pb-4">
            <label htmlFor="email" className="text-gray-500">
              Category
            </label>
            {errors.category && touched.category ? (
              <span className="text-[14px] text-red-600">
                {errors.category}
              </span>
            ) : null}
            <select
              onChange={handleChange}
              onBlur={handleBlur}
              name="category"
              id="category"
              value={values?.category}
              className="w-full rounded-xl border-[1px] p-2 outline-none"
            >
              <option value="">Select</option>
              {categorys?.map((item, id) => {
                return (
                  <option key={id} value={item._id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="">
            <div className="flex items-center justify-between">
              <h2>0</h2>
              {Array.from({ length: 5 }, (value, index) => {
                return <h2 key={index}>{index + 1}</h2>;
              })}
            </div>
            <input
              className="w-full"
              type="range"
              min="0"
              max="5"
              value={values.totalRatings}
              onChange={handleChange}
              onBlur={handleBlur}
              step="0.5"
              name="totalRatings"
              id=""
            />
          </div>
          <div className="flex flex-col gap-2">
            {errors.images && touched.images ? (
              <span className="text-[14px] text-red-600">{errors.images}</span>
            ) : null}
            <input
              ref={fileRef}
              onChange={handleImage}
              name="images"
              type="file"
              multiple={true}
              accept="image/*"
              className="hidden"
            />

            <div className="grid grid-cols-2 gap-x-2 gap-y-2 py-3 md:grid-cols-3">
              {values?.images?.map((item, ids) => {
                return (
                  <div
                    key={ids}
                    className="relative h-[120px] w-full rounded-2xl border-[1px] p-2 md:h-[150px]"
                  >
                    <img
                      src={typeof item !== "string" ? item?.url : item}
                      className="h-full w-full overflow-hidden object-contain"
                    />
                    <IoIosCloseCircle
                      onClick={() => removeImage(id, item, setValues, values)}
                      size={"22px"}
                      color="red"
                      className="absolute right-[5px] top-[5px] cursor-pointer"
                    />
                  </div>
                );
              })}
              {newImages?.map((item, id) => {
                return (
                  <div
                    key={id}
                    className="relative h-[120px] w-full rounded-2xl border-[1px] p-2 md:h-[150px]"
                  >
                    <img
                      src={item}
                      className="h-full w-full overflow-hidden object-contain"
                    />
                    <IoIosCloseCircle
                      onClick={() => removeNewImage(item)}
                      size={"22px"}
                      color="red"
                      className="absolute right-[5px] top-[5px] cursor-pointer"
                    />
                  </div>
                );
              })}
              <div
                onClick={() => fileRef.current.click()}
                className="flex h-[120px] cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-[2px] border-dotted border-violet-500 bg-violet-50 p-2 text-center md:h-[150px]"
              >
                <BsCloudUploadFill size={"22px"} color="#7C3AED" />
                <span className="font-[500] text-violet-600">
                  click to upload file
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col pb-4">
            <span htmlFor="email" className="text-gray-500">
              Tags
            </span>
            <div className="flex w-full flex-wrap gap-1 rounded-xl border-[1px] p-2">
              {values?.tags?.length
                ? values?.tags?.map((item, id) => {
                    return (
                      <div
                        key={id}
                        className="relative rounded-lg bg-gray-200 p-2"
                      >
                        <span>{item}</span>
                        <AiFillCloseCircle
                          onClick={() => removeTags(item)}
                          className="absolute right-[-5px] top-[-5px] cursor-pointer"
                          color="red"
                        />
                      </div>
                    );
                  })
                : null}
              <input
                type="text"
                name="tags"
                onMouseDown={handleTags}
                className="outline-none"
              />
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

export default AddProduct;
