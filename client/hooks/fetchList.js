import { useEffect, useState } from "react";
import { useAppStore } from "../src/utils/store/AppStore";
import { toast } from "react-toastify";
import axios from "./../src/utils/store/axios";

const useFetch = (url) => {
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const getProducts = async () => {
    try {
      useAppStore.setState((state) => ({
        isFetching: { ...state.isFetching, products: true },
      }));
      const { data, status } = await axios(url);
      if (status === 200) {
        setResults(data);
        useAppStore.setState((state) => ({
          isFetching: { ...state.isFetching, products: false },
        }));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, [url]);

  return { results, totalPage, currentPage, setCurrentPage };
};

export default useFetch;
