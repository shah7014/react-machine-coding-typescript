import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Filter,
  FilterKeys,
  Product,
  ProductResponse,
  SortDir,
  SortKey,
} from "../types/Product";
import { debounce } from "../../../utils/debounce";
import useDebounce from "../../../hooks/useDebounce";

type ProductsContextType = {
  filteredProducts: Product[];
  loading: boolean;
  error: string;
  categories: string[];
  handleFilterChange: (
    filterType: FilterKeys,
    filterValue: string | { min?: number; max?: number }
  ) => void;
  filter: Filter;
  handleResetFilter: () => void;
  handleSortKeyChange: (key: SortKey) => void;
  handleSortDirChange: (key: SortDir) => void;
  sortKey: SortKey;
  sortDir: SortDir;
};

// prettier-ignore
const ProductContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [filter, setFilter] = useState<Filter>({
    category: "",
    title: "",
    price: { min: 0, max: Infinity },
  });

  const [sortKey, setSortKey] = useState<SortKey>("rating");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const categories = useMemo(() => {
    return [...new Set(allProducts.map((product) => product.category))];
  }, [allProducts]);

  const sortedFilteredProducts = useMemo(() => {
    return allProducts
      .slice()
      .sort((a, b) => {
        if (sortKey === "price" || sortKey === "rating") {
          return sortDir === "asc"
            ? a[sortKey] - b[sortKey]
            : b[sortKey] - a[sortKey];
        } else if (sortKey === "title") {
          return sortDir === "asc"
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
        }
        return 1;
      })
      .filter((product) => {
        let isPassed = true;
        if (filter.category) {
          isPassed = product.category
            .toLowerCase()
            .includes(filter.category.toLowerCase());
        }
        if (filter.title && isPassed) {
          isPassed = product.title
            .toLowerCase()
            .includes(filter.title.toLowerCase());
        }
        if (
          (filter.price.min !== 0 || filter.price.max !== Infinity) &&
          isPassed
        ) {
          isPassed =
            product.price >= filter.price.min &&
            product.price <= filter.price.max;
        }
        return isPassed;
      });
  }, [allProducts, filter, sortKey, sortDir]);

  const handleTitleChange = useCallback((title: string) => {
    setFilter((prev) => ({ ...prev, title }));
  }, []);

  const debouncedTitleFilter = useDebounce(handleTitleChange, 1000);

  const handleFilterChange = (
    filterType: FilterKeys,
    filterValue: string | { min?: number; max?: number }
  ) => {
    if (filterType === "category") {
      setFilter((prev) => ({ ...prev, category: filterValue as string }));
    } else if (filterType === "title") {
      // setFilter((prev) => ({ ...prev, title: filterValue as string }));
      debouncedTitleFilter(filterValue);
    } else if (filterType === "price") {
      setFilter((prev) => ({
        ...prev,
        price: {
          ...prev.price,
          ...(filterValue as { min?: number; max?: number }),
        },
      }));
    }
  };

  const handleResetFilter = () => {
    setFilter({ category: "", price: { min: 0, max: Infinity }, title: "" });
  };

  const handleSortKeyChange = (key: SortKey) => {
    setSortKey(key);
  };

  const handleSortDirChange = (key: SortDir) => {
    setSortDir(key);
  };

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://dummyjson.com/products?limit=194");
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        const data: ProductResponse = await res.json();
        setAllProducts(data.products);
        setError("");
      } catch (error) {
        console.log(error);
        let msg =
          error instanceof Error ? error.message : "Something went wrong";
        setError(msg);
        setAllProducts([]);
      } finally {
        setLoading(false);
      }
    };

    getAllProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        filteredProducts: sortedFilteredProducts,
        loading,
        error,
        categories,
        handleFilterChange,
        filter,
        handleResetFilter,
        handleSortDirChange,
        handleSortKeyChange,
        sortDir,
        sortKey,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error(
      "Product Context accessed outside of ProductContextProvider"
    );
  }
  return context;
};
