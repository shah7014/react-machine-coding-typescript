import { useProductContext } from "../../context/ProductsContext";

const TitleFilter: React.FC = () => {
  const { handleFilterChange, filter } = useProductContext();

  return (
    <div className="products__filter--title">
      <input
        type="text"
        value={filter.title}
        onChange={(e) => handleFilterChange("title", e.target.value)}
        className="title-input-control"
        placeholder="Search by product name"
      />
    </div>
  );
};

export default TitleFilter;
