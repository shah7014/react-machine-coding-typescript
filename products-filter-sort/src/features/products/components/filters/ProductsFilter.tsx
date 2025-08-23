import { useProductContext } from "../../context/ProductsContext";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import TitleFilter from "./TitleFilter";

const ProductsFilter: React.FC = () => {
  const { handleResetFilter } = useProductContext();

  return (
    <div className="products__filter">
      <TitleFilter />
      <PriceFilter />
      <CategoryFilter />
      <button className="products__filter-reset" onClick={handleResetFilter}>
        Reset Filters
      </button>
    </div>
  );
};

export default ProductsFilter;
