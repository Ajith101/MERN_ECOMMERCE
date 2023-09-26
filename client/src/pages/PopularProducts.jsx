import { useAppStore } from "../utils/store/AppStore";
import useFetch from "../../hooks/fetchList";
import ByList from "../components/ByList";

const PopularProducts = () => {
  const { isFetching } = useAppStore();
  const { results } = useFetch(`/api/products/by?rating=5`);
  return (
    <ByList
      isFetching={isFetching?.products}
      products={results?.products}
      title={"Popular Products"}
    />
  );
};

export default PopularProducts;
