import { useEffect, useState } from "react";
import { useProductContext } from "../../context/ProductsContext";

const TitleFilter: React.FC = () => {
  const { handleFilterChange, filter } = useProductContext();

  const [filterText, setFilterText] = useState<string>(filter.title);

  const handleFilterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
    handleFilterChange("title", e.target.value);
  };

  useEffect(() => {
    setFilterText(filter.title);
  }, [filter.title]);

  return (
    <div className="products__filter--title">
      <input
        type="text"
        value={filterText}
        onChange={handleFilterInputChange}
        className="title-input-control"
        placeholder="Search by product name"
      />
    </div>
  );
};

export default TitleFilter;
