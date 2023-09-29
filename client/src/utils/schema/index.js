import * as YUP from "yup";

export const loginSchema = YUP.object({
  email: YUP.string()
    .min(3, "minimum 3 character")
    .email("invalid mail")
    .required("Enter mail"),
  password: YUP.string().required("Enter Password"),
});
export const registerSchema = YUP.object({
  name: YUP.string().min(3, "Minimum 3 character").required("enter name"),
  email: YUP.string().email("invalid mail").required("Enter mail"),
  password: YUP.string().required("Enter Password"),
  c_password: YUP.string()
    .required("Enter Password")
    .oneOf([YUP.ref("password"), null], "Password must be match"),
});
export const addProductSchema = YUP.object({
  name: YUP.string().min(3, "Minimum 3 character").required("enter name"),
  description: YUP.string()
    .min(3, "Minimum 3 character")
    .required("description required"),
  discountPrice: YUP.number()
    .min(1, "Minimum 1 character required")
    .required("Enter Discount price"),
  discount: YUP.number()
    .min(1, "Minimum 1 character required")
    .required("Enter Discount"),
  price: YUP.number()
    .min(1, "Minimum 1 character required")
    .required("price required"),
  stock: YUP.number()
    .min(1, "Minimum 1 character required")
    .required("Enter Stock"),
  category: YUP.string().required("category required"),
  brand: YUP.string().required("brand required"),
  size: YUP.array(),
  images: YUP.array(),
  // images: YUP.array()
  //   .min(1, "select atleast one image")
  //   .required("select image")
  //   .nullable(),
  tags: YUP.array(),
  color: YUP.array(),
  specifications: YUP.array(),
  // brand: YUP.string().required("Enter brand"),
  totalRatings: YUP.number(),
  // totalRatings: YUP.number().required("rating required"),
  sold: YUP.number(),
});
export const brandSchema = YUP.object({
  name: YUP.string().min(3, "mimum 3 character").required("enter brand"),
  image: YUP.string().required("select image"),
});

export const editBrandSchema = YUP.object({
  name: YUP.string().min(3, "3 character required").required("enter name"),
  image: YUP.lazy((value) => {
    switch (typeof value) {
      case "string":
        return YUP.string().required("select image");
      case "object":
        return YUP.object().required("Select image");
      default:
        return YUP.mixed();
    }
  }),
});

export const categorySchema = YUP.object({
  name: YUP.string().min(3, "3 character required").required("enter name"),
  image: YUP.string().required("select image"),
});
export const editCategorySchema = YUP.object({
  name: YUP.string().min(3, "3 character required").required("enter name"),
  image: YUP.lazy((value) => {
    switch (typeof value) {
      case "string":
        return YUP.string().required("select image");
      case "object":
        return YUP.object().required("Select image");
      default:
        return YUP.mixed();
    }
  }),
});

export const forgotPasswordSchema = YUP.object({
  email: YUP.string()
    .min(3, "minimum 3 character")
    .email("invalid mail")
    .required("Enter mail"),
});
export const verifyOtpSchema = YUP.object({
  otp: YUP.number().required("Enter OTP"),
});
export const confirmPasswordSchema = YUP.object({
  password: YUP.string().required("Enter Password"),
  c_password: YUP.string()
    .required("Enter Password")
    .oneOf([YUP.ref("password"), null], "Password must be match"),
});

export const contactUsSchema = YUP.object({
  email: YUP.string()
    .min(3, "minimum 3 character")
    .email("invalid mail")
    .required("Enter mail"),
  name: YUP.string().min(2, "minimum 2 character").required("Enter Name"),
  message: YUP.string().min(2, "minimum 2 character").required("Enter Name"),
});
