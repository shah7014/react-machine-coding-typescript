import { useProductContext } from "../../context/ProductsContext";
import { SortDir, SortKey } from "../../types/Product";

const ProductSort: React.FC = () => {
  const { handleSortDirChange, handleSortKeyChange, sortDir, sortKey } =
    useProductContext();

  return (
    <div className="product-sort">
      <div>
        <label htmlFor="sortBy">Sort By</label>
        <select
          id="sortBy"
          value={sortKey}
          onChange={(e) => handleSortKeyChange(e.target.value as SortKey)}
        >
          {["price", "rating", "title"].map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="sortDir">Sort Dir</label>
        <select
          id="sortDir"
          value={sortDir}
          onChange={(e) => handleSortDirChange(e.target.value as SortDir)}
        >
          {["asc", "desc"].map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ProductSort;
