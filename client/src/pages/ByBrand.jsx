import { useParams } from "react-router-dom";
import { useAppStore } from "../utils/store/AppStore";
import ByList from "../components/ByList";
import useFetch from "../../hooks/fetchList";

const ByBrand = () => {
  const { isFetching } = useAppStore();
  const { name } = useParams();
  const { results } = useFetch(`/api/brand/name/${name}`);

  return (
    <>
      <ByList
        isFetching={isFetching?.products}
        products={results}
        title={name}
      />
    </>
  );
};

export default ByBrand;
