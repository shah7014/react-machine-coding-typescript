import { useProductContext } from "../../context/ProductsContext";

const CategoryFilter: React.FC = () => {
  const { categories, filter, handleFilterChange } = useProductContext();

  return (
    <div className="products__filter--category">
      <h3>Categories</h3>
      {categories.map((category) => (
        <div key={category} className="category-input-control">
          <input
            id={category}
            name="categories"
            value={category}
            checked={filter.category === category}
            type="radio"
            onChange={(e) => handleFilterChange("category", e.target.value)}
          />
          <label htmlFor={category}>{category}</label>
        </div>
      ))}
    </div>
  );
};

export default CategoryFilter;
