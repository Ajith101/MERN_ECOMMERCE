import { create } from "zustand";
import { toast } from "react-toastify";
import axios from "./axios";

const userExist = localStorage.getItem("user");
const itemExist = localStorage.getItem("cart");
export const BASE_URL = import.meta.env.VITE_DB_URL;
const cartList = itemExist ? JSON.parse(itemExist) : [];

export const useAppStore = create((set, get) => {
  return {
    loading: false,
    isFetching: { products: false, category: false },
    allProducts: [],
    categorys: [],
    categoryProducts: [],
    brands: [],
    cart: null,
    singleItem: null,
    trendingItems: [],
    errors: "",
    user: userExist ? JSON.parse(userExist) : null,
    allUser: [],
    cartNo: null,
    isVisible: false,
    tempUser: null,
    getAllProducts: async () => {
      try {
        set((state) => ({
          loading: true,
          isFetching: { ...state.isFetching, products: true },
        }));
        const response = await axios(`/api/products/`);
        set((state) => ({
          allProducts: response.data,
          loading: false,
          isFetching: { ...state.isFetching, products: false },
        }));
      } catch (error) {
        toast.error(error.response.data.message);
        set(() => ({
          loading: false,
          errors: error.response.data.message,
          isFetching: { ...state.isFetching, products: false },
        }));
      }
    },
    getByCategory: async (name) => {
      try {
        set((state) => ({
          loading: true,
          isFetching: { ...state.isFetching, products: true },
        }));
        const { data, status } = await axios(`api/products/category/${name}`);
        if (status === 200) {
          set((state) => ({
            categoryProducts: data,
            loading: false,
            isFetching: { ...state.isFetching, products: false },
          }));
        }
      } catch (error) {
        toast.error(error.response.data.message);
        set(() => ({
          loading: false,
          errors: error.response.data.message,
          isFetching: { ...state.isFetching, products: false },
        }));
      }
    },
    deleteProduct: async (id, setShowpopUp) => {
      try {
        set(() => ({ loading: true }));
        const { status } = await axios("/api/products", {
          method: "DELETE",
          data: { id },
        });
        if (status === 200) {
          set((state) => ({
            allProducts: [
              ...state.allProducts.filter((item) => item._id !== id),
            ],
            loading: false,
          }));
          setShowpopUp(false);
          toast.success("Deleted successfully");
        }
      } catch (error) {
        toast.error(error.response.data.message);
        set(() => ({ loading: false, errors: error.response.data.message }));
      }
    },
    getTrendingItems: async () => {
      try {
        set(() => ({ loading: true }));
        const response = await axios(`/api/products/trending`);
        set(() => ({ trendingItems: response?.data, loading: false }));
      } catch (error) {
        toast.error(error.response.data.message);
        set(() => ({ loading: false, errors: error.response.data.message }));
      }
    },
    getSingleProductEdit: async (id, setValues) => {
      try {
        set(() => ({ loading: true }));
        // const checkCartExist = get().cart.find((item) => item.id == id);
        const { data } = await axios(`/api/products/single-product`, {
          method: "POST",
          data: { id },
        });
        set(() => ({
          singleItem: data,
          loading: false,
        }));
        setValues((pre) => ({ ...pre, ...data }));
      } catch (error) {
        toast.error(error.response.data.message);
        set(() => ({ loading: false, errors: error.response.data.message }));
      }
    },
    getSingleProduct: async (id) => {
      try {
        const { data } = await axios(`/api/products/single/`, {
          method: "POST",
          data: { id },
        });
        set(() => ({ singleItem: data }));
      } catch (error) {
        toast.error(error.response.data.message);
        set(() => ({ loading: false, errors: error.response.data.message }));
      }
      // try {
      //   set(() => ({ loading: true }));
      //   const checkCartExist = get().cart.find((item) => item.id == id);
      //   const { data } = await axios(`/api/products/single/`, {
      //     method: "POST",
      //     data: { id },
      //   });
      //   console.log(data);
      //   set(() => ({
      //     singleItem: checkCartExist
      //       ? { ...data, qty: checkCartExist.qty }
      //       : data,
      //     loading: false,
      //   }));
      //   // setValues((pre) => ({ ...pre, ...data }));
      // } catch (error) {
      //   toast.error(error?.response?.data?.message);
      //   set(() => ({ loading: false, errors: error?.response?.data?.message }));
      // }
    },
    addProduct: async (values, navigate) => {
      try {
        set(() => ({ loading: true }));
        const { status } = await axios(`/api/products/add`, {
          method: "POST",
          data: { ...values },
        });
        if (status === 200) {
          set(() => ({ loading: false }));
          navigate("/admin/products");
          toast.success("Added successfully");
        }
      } catch (error) {
        toast.error(error.response.data.message);
        set(() => ({ loading: false, errors: error.response.data.message }));
      }
    },
    editProduct: async (values, id, navigate) => {
      try {
        set(() => ({ loading: true }));
        const update = {
          name: values.name,
          description: values.description,
          price: values.price,
          category: values.category,
          stock: values.stock,
          images: values.images,
          newImages: values.newImages,
          tags: values.tags,
          totalRatings: values.totalRatings,
          specifications: values.specifications,
        };
        const { status } = await axios(`/api/products`, {
          method: "PUT",
          data: { id, update },
        });
        if (status === 200) {
          toast.success("Updated Product");
          navigate("/admin/products");
          set(() => ({ loading: false }));
        }
      } catch (error) {
        toast.error(error.response.data.message);
        set(() => ({ loading: false, errors: error.response.data.message }));
      }
    },
    removeImage: async (id, image, setValues, values) => {
      try {
        if (values.images.length && id) {
          const { status } = await axios(`/api/products/image`, {
            method: "DELETE",
            data: { id, public_id: image.public_id },
          });
          if (status === 200) {
            setValues((pre) => ({
              ...pre,
              images: [...pre.images.filter((item) => item !== image)],
            }));
          }
        } else {
          setValues((pre) => ({
            ...pre,
            images: [...pre.images.filter((item) => item !== image)],
          }));
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
    increaseQty: () => {
      set((state) => ({
        singleItem: { ...state.singleItem, qty: state.singleItem.qty + 1 },
      }));
    },
    decreaseQtys: () => {
      set((state) => ({
        singleItem: {
          ...state.singleItem,
          qty: state.singleItem.qty > 1 ? state.singleItem.qty - 1 : 1,
        },
      }));
    },
    getCategoryNames: async () => {
      try {
        set((state) => ({
          loading: true,
          isFetching: { ...state.isFetching, category: true },
        }));
        const { data } = await axios(`/api/category`);
        set((state) => ({
          categorys: data,
          loading: false,
          isFetching: { ...state.isFetching, category: false },
        }));
      } catch (error) {
        toast.error(error.response.data.message);
        set(() => ({
          loading: false,
          errors: error.response.data.message,
          isFetching: { ...state.isFetching, category: false },
        }));
      }
    },
    addCart: (data) => {
      const cart = get().cart;
      const itemExist = cart.find((item) => item.id === data.id);
      if (itemExist) {
        const updatedCart = cart.map((item) =>
          item.id === data.id ? { ...item, qty: item.qty + 1 } : item
        );
        set(() => ({ cart: updatedCart }));
        toast.success("Added to cart");
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      } else {
        set((state) => ({ cart: [{ ...data, qty: 1 }, ...state.cart] }));
        toast.success("Added to cart");
        localStorage.setItem("cart", JSON.stringify(get().cart));
      }
    },
    getCartNumbers: async () => {
      try {
        set(() => ({ loading: true }));
        const { data } = await axios("/api/user/cart/qty");
        set(() => ({ cartNo: data, loading: false }));
      } catch (error) {
        toast.error(error.response.data.message);
        set(() => ({ loading: false, errors: error.response.data.message }));
      }
    },
    getUserCart: async () => {
      try {
        set(() => ({ loading: true }));
        const { data } = await axios(`/api/user/cart`);
        set(() => ({ cart: data, loading: false }));
      } catch (error) {
        toast.error(error.response.data.message);
        set(() => ({ loading: false, errors: error.response.data.message }));
      }
    },
    addToCart: async (item) => {
      try {
        const { data, status } = await axios(`/api/user/add-cart`, {
          method: "POST",
          data: {
            productId: item._id,
          },
        });
        if (status == 200) {
          toast.success("added to cart");
          set(() => ({ loading: false, cartNo: data?.total }));
        }
      } catch (error) {
        toast.error(error.response.data.message);
        set(() => ({ loading: false, errors: error.response.data.message }));
      }
    },
    // addToCart: (data) => {
    //   const cart = get().cart;
    //   const isExist = cart.find((item) => item_id === data_id);
    //   if (isExist) {
    //     const updatedCart = cart.map((item) =>
    //       item_id === data_id ? { ...item, qty: data.qty } : item
    //     );
    //     set(() => ({ cart: updatedCart }));
    //     localStorage.setItem("cart", JSON.stringify(updatedCart));
    //     toast.success("Added to cart");
    //   } else {
    //     set((state) => ({ cart: [data, ...state.cart] }));
    //     localStorage.setItem("cart", JSON.stringify(get().cart));
    //     toast.success("Added to cart");
    //   }
    // },
    removeCart: async (id) => {
      try {
        const { status, data } = await axios(`/api/user/cart`, {
          method: "DELETE",
          data: {
            productId: id,
          },
        });
        if (status === 200) {
          let cartList = get().cart;
          const products = cartList?.products?.filter(
            (item) => item.productId._id !== id
          );
          set((state) => ({
            loading: false,
            cart: { ...state.cart, products },
            cartNo: data?.total,
          }));

          toast.success(data.message);
        }
      } catch (error) {}
    },
    addQty: async (id) => {
      try {
        // set(() => ({ loading: true }));
        const { status, data } = await axios(`/api/user/cart/add-qty`, {
          method: "PUT",
          data: {
            productId: id,
          },
        });
        if (status === 200) {
          let cartList = get().cart;
          const products = cartList?.products?.map((item) =>
            item.productId._id === id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
          set((state) => ({
            loading: false,
            cart: { ...state.cart, products },
          }));
          toast.success(data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
        set(() => ({ loading: false, errors: error.response.data.message }));
      }
    },
    decreaseQty: async (id) => {
      try {
        // set(() => ({ loading: true }));
        const { status, data } = await axios(`/api/user/cart/decrease-qty`, {
          method: "PUT",
          data: {
            productId: id,
          },
        });
        if (status === 200) {
          let cartList = get().cart;
          const products = cartList?.products?.map((item) =>
            item.productId._id === id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
          set((state) => ({
            loading: false,
            cart: { ...state.cart, products },
          }));
          toast.success(data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
        set(() => ({ loading: false, errors: error.response.data.message }));
      }
    },
    addCategory: async (values, navigate) => {
      try {
        set(() => ({ loading: true }));
        const { data, status } = await axios("/api/category/", {
          method: "POST",
          data: { ...values },
        });
        if (status == 200) {
          set((state) => ({
            loading: false,
            categorys: [data, ...state.categorys],
          }));
          toast.success("Category updated");
          navigate("/admin/category");
        }
      } catch (error) {
        toast.error(error.response.data.message);
        set(() => ({ loading: false, errors: error.response.data.message }));
      }
    },
    editCategory: async (values, navigate) => {
      try {
        set(() => ({ loading: true }));
        const update = { name: values.name, image: values.image };
        const { status, data } = await axios("/api/category/", {
          method: "PUT",
          data: { id: values._id, update },
        });
        if (status === 200) {
          const allCategory = get().categorys;
          const update = allCategory.map((item) =>
            item._id === values._id ? { ...data } : item
          );
          set((state) => ({ categorys: update, loading: false }));
          toast.success("Category updated");
          navigate("/admin/category");
        }
      } catch (error) {
        toast.error(error.response.data.message);
        set(() => ({ loading: false, errors: error.response.data.message }));
      }
    },
    deleteCategory: async (id, setShowpopUp) => {
      try {
        set(() => ({ loading: true }));
        await axios(`/api/category`, {
          method: "DELETE",
          data: { id: id },
        });
        const allCategory = get().categorys;
        const updatedCategory = allCategory.filter((item) => item._id !== id);
        set(() => ({ categorys: updatedCategory, loading: false }));
        toast.success("Deleted");
        setShowpopUp(false);
      } catch (error) {
        toast.error(error.response.data.message);
        set(() => ({ errors: error.response.data.message, loading: false }));
      }
    },
    removeCategoryImage: async (values, setValues) => {
      try {
        set(() => ({ loading: true }));
        const { status } = await axios(`/api/category/image/`, {
          method: "DELETE",
          data: { id: values._id, public_id: values.image.public_id },
        });
        if (status === 200) {
          set(() => ({ loading: false }));
          toast.success("Image deleted");
          setValues((pre) => ({
            ...pre,
            image: "",
          }));
        }
      } catch (error) {
        toast.error(error.response.data.message);
        set(() => ({ loading: false, errors: error.response.data.message }));
      }
    },
    getCategory: async (id, setValues, navigate) => {
      try {
        set(() => ({ loading: true }));
        const { data } = await axios("/api/category/single/", {
          method: "POST",
          data: { id },
        });
        setValues((pre) => ({ ...pre, ...data }));
        set(() => ({ loading: false }));
      } catch (error) {
        if (error?.response?.status == 401) {
          navigate("/login");
        }
        toast.error(error.response.data.message);
        set(() => ({ loading: false, errors: error.response.data.message }));
      }
    },
    addBrand: async (values, navigate) => {
      try {
        set(() => ({ loading: true }));
        const { data, status } = await axios("/api/brand/", {
          method: "POST",
          data: { ...values },
        });
        if (status === 200) {
          set((state) => ({
            loading: false,
            brands: [data, ...state.brands],
          }));
          toast.success("Brand updated");
          navigate("/admin/brand");
        }
      } catch (error) {
        toast.error(error.response.data.message);
        set(() => ({ loading: false, errors: error.response.data.message }));
      }
    },
    editBrand: async (values, navigate) => {
      try {
        set(() => ({ loading: true }));
        const update = { name: values.name, image: values.image };
        const { status, data } = await axios("/api/brand/", {
          method: "PUT",
          data: { id: values._id, update },
        });
        if (status === 200) {
          const allBrand = get().brands;
          const update = allBrand.map((item) =>
            item._id === values._id ? { ...data } : item
          );
          set((state) => ({ brands: update, loading: false }));
          toast.success("Brand updated");
          navigate("/admin/brand");
        }
      } catch (error) {
        toast.error(error.response.data.message);
        set(() => ({ loading: false, errors: error.response.data.message }));
      }
    },
    getBrands: async () => {
      try {
        set(() => ({ loading: true }));
        const { data } = await axios("/api/brand");
        set(() => ({ brands: data, loading: false }));
      } catch (error) {
        toast.error(error.response.data.message);
        set(() => ({ loading: false, errors: error.response.data.message }));
      }
    },
    getBrand: async (id, setValues, navigate) => {
      try {
        set(() => ({ loading: true }));
        const { data, status } = await axios("/api/brand/single", {
          method: "POST",
          data: { id },
        });
        setValues((pre) => ({ ...pre, ...data }));
        set(() => ({ loading: false }));
      } catch (error) {
        if (error?.response?.status == 401) {
          navigate("/login");
        }
        toast.error(error.response.data.message);
        set(() => ({ loading: false, errors: error.response.data.message }));
      }
    },
    removeBrandImage: async (values, setValues) => {
      try {
        set(() => ({ loading: true }));
        const { status } = await axios(`/api/brand/image`, {
          method: "DELETE",
          data: { id: values._id, public_id: values.image.public_id },
        });
        if (status === 200) {
          set(() => ({ loading: false }));
          toast.success("Image deleted");
          setValues((pre) => ({
            ...pre,
            image: "",
          }));
        }
      } catch (error) {
        toast.error(error.response.data.message);
        set(() => ({ loading: false, errors: error.response.data.message }));
      }
    },
    deleteBrand: async (id, setShowpopUp) => {
      try {
        set(() => ({ loading: true }));
        await axios(`/api/brand/`, {
          method: "DELETE",
          data: { id: id },
        });
        const brands = get().brands;
        const updatedBrand = brands.filter((item) => item._id !== id);
        set(() => ({ brands: updatedBrand, loading: false }));
        toast.success("Deleted");
        setShowpopUp(false);
      } catch (error) {
        toast.error(error.response.data.message);
        set(() => ({ loading: false, errors: error.response.data.message }));
      }
    },
    registerUser: async (values, navigate) => {
      try {
        set(() => ({ loading: true }));
        const { data, status } = await axios("/api/user/register", {
          method: "POST",
          data: {
            ...values,
          },
        });
        if (status == 200) {
          toast.success("Registered successfully");
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", JSON.stringify(data.token));
          navigate("/");
          set(() => ({ user: data.user, loading: false }));
        }
      } catch (error) {
        toast.error(error.response.data.message);
        set(() => ({ loading: false, errors: error.response.data.message }));
      }
    },
    loginUser: async (values, navigate) => {
      try {
        set(() => ({ loading: true }));
        const { data, status } = await axios("/api/user/login", {
          method: "POST",
          data: {
            ...values,
          },
        });
        if (status === 200) {
          set(() => ({ user: data.user, loading: false }));
          navigate("/");
          toast.success("Login successfully");
          localStorage.setItem("token", JSON.stringify(data.token));
          localStorage.setItem("user", JSON.stringify(data.user));
        }
      } catch (error) {
        toast.error(error.response.data.message);
        set(() => ({ loading: false, errors: error.response.data.message }));
      }
    },
    getAllUsers: async () => {
      try {
        set(() => ({ loading: true }));
        const { status, data } = await axios("/api/user");
        if (status === 200) {
          set((state) => ({ loading: false, allUser: data }));
        }
      } catch (error) {
        toast.error(error.response.data.message);
        set(() => ({ loading: false, errors: error.response.data.message }));
      }
    },
    forgotPassword: async (values, navigate) => {
      try {
        set(() => ({ loading: true }));
        const { data, status } = await axios("/api/user/forgot-password", {
          method: "POST",
          data: { email: values?.email },
        });
        if (status === 200) {
          set(() => ({ loading: false, tempUser: values?.email }));
          navigate("/forgot-password/confirm-otp");
          toast.success(data.message);
        }
      } catch (error) {
        set(() => ({ loading: false }));
        toast.error(error.response.data.message);
      }
    },
    confirmOTP: async (values, navigate) => {
      const email = get().tempUser;
      try {
        set(() => ({ loading: true }));
        const { data, status } = await axios("/api/user/confirm-otp", {
          method: "POST",
          data: { email, otp: values.otp },
        });
        if (status === 200) {
          set(() => ({ loading: false }));
          navigate("/forgot-password/new");
          toast.success(data.message);
        }
      } catch (error) {
        set(() => ({ loading: false }));
        toast.error(error.response.data.message);
      }
    },
    resetPassword: async (values, navigate) => {
      const email = get().tempUser;
      try {
        set(() => ({ loading: true }));
        const { data, status } = await axios("/api/user/reset-password", {
          method: "POST",
          data: { email, password: values.password },
        });
        if (status === 200) {
          set(() => ({ loading: false, tempUser: null }));
          navigate("/login");
          toast.success(data.message);
        }
      } catch (error) {
        set(() => ({ loading: false }));
        toast.error(error.response.data.message);
      }
    },
    logOut: async (setNav, navigate) => {
      try {
        const { status } = await axios("/api/user/logout", { method: "POST" });
        if (status === 200) {
          setNav && setNav(false);
          navigate("/");
          toast.success("Logout successfully");
          set(() => ({ user: null, cart: null, cartNo: null }));
          localStorage.clear();
        }
      } catch (error) {
        toast.error(error.response.data.message);
        set(() => ({ loading: false, errors: error.response.data.message }));
      }
    },
    toggleVisible: (value) => {
      set(() => ({ isVisible: value }));
    },
  };
});
