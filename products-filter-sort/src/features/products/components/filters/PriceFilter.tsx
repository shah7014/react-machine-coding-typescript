import { useProductContext } from "../../context/ProductsContext";

const PriceFilter: React.FC = () => {
  const { filter, handleFilterChange } = useProductContext();

  return (
    <div className="products__filter--price">
      <input
        type="number"
        min={0}
        placeholder="Min Price"
        value={filter.price.min}
        onChange={(e) =>
          handleFilterChange("price", { min: Number(e.target.value) })
        }
      />
      <input
        type="number"
        min={0}
        placeholder="Max price"
        value={filter.price.max}
        onChange={(e) =>
          handleFilterChange("price", { max: Number(e.target.value) })
        }
      />
    </div>
  );
};

export default PriceFilter;
