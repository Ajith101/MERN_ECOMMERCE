import { create } from "zustand";
import { toast } from "react-toastify";
import axios from "./axios";

const itemExist = localStorage.getItem("cart");
export const BASE_URL = import.meta.env.VITE_DB_URL;
const cartList = itemExist ? JSON.parse(itemExist) : [];

export const useAppStore = create((set, get) => {
  return {
    loading: false,
    allProducts: [],
    categorys: [],
    cart: cartList,
    singleItem: null,
    trendingItems: [],
    errors: "",
    getTrendingItems: async () => {
      try {
        set(() => ({ loading: true }));
        const response = await axios(`/api/products/trending`);
        set(() => ({ trendingItems: response.data, loading: false }));
      } catch (error) {
        set(() => ({ errors: response.data.message, loading: false }));
      }
    },
    getSingleProduct: async (id) => {
      try {
        set(() => ({ loading: true }));
        const checkCartExist = get().cart.find((item) => item.id == id);
        const response = await axios(`/api/products`, {
          method: "POST",
          data: { id },
        });
        set(() => ({
          singleItem: checkCartExist
            ? { ...response.data, qty: checkCartExist.qty }
            : response.data,
          loading: false,
        }));
      } catch (error) {
        set(() => ({ errors: response.data.message, loading: false }));
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
        set(() => ({ loading: true }));
        const response = await axios(`/api/products/category`);
        set(() => ({ categorys: response.data, loading: false }));
      } catch (error) {
        set(() => ({ errors: response.data.message, loading: false }));
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
        set((state) => ({ cart: [...state.cart, { ...data, qty: 1 }] }));
        toast.success("Added to cart");
        localStorage.setItem("cart", JSON.stringify(get().cart));
      }
    },
    addToCart: (data) => {
      const cart = get().cart;
      const isExist = cart.find((item) => item.id === data.id);
      if (isExist) {
        const updatedCart = cart.map((item) =>
          item.id === data.id ? { ...item, qty: data.qty } : item
        );
        set(() => ({ cart: updatedCart }));
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        toast.success("Added to cart");
      } else {
        set((state) => ({ cart: [...state.cart, data] }));
        localStorage.setItem("cart", JSON.stringify(get().cart));

        toast.success("Added to cart");
      }
    },
    removeCart: (id) => {
      const cart = get().cart;
      const updatedCart = cart.filter((item) => item.id !== id);
      set(() => ({ cart: updatedCart }));
      toast.success("Item removed");
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    },
    addQty: (id) => {
      const cart = get().cart;
      const updatedCart = cart.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      );
      set(() => ({ cart: updatedCart }));
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    },
    decreaseQty: (id) => {
      const cart = get().cart;
      const updatedCart = cart.map((item) =>
        item.id === id ? { ...item, qty: item.qty - 1 } : item
      );
      set(() => ({ cart: updatedCart }));
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    },
  };
});
