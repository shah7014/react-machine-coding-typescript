import { useCallback, useMemo, useState } from "react";
import { useProductContext } from "../context/ProductsContext";
import { getAsDisplayProducts } from "../utils/productMapper";
import Pagination from "../../../components/Pagination/Pagination";
import ProductSort from "./sort/ProductSort";

const ProductsGrid: React.FC = () => {
  const { filteredProducts, error, loading } = useProductContext();

  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const maxNumberOfPages = useMemo(() => {
    return Math.ceil(filteredProducts.length / pageSize);
  }, [filteredProducts, pageSize]);

  const visibleProducts = useMemo(() => {
    // 1 => 0, 10
    // 2 => 10, 20
    return filteredProducts
      .map(getAsDisplayProducts)
      .slice((pageNo - 1) * pageSize, pageNo * pageSize);
  }, [filteredProducts, pageNo, pageSize]);

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage <= 0 || newPage > maxNumberOfPages) {
        return;
      }
      setPageNo(newPage);
    },
    [maxNumberOfPages]
  );

  return (
    <div className="products__display">
      <h3>Products</h3>
      <ProductSort />
      <div>
        {loading && <p>LOADING...</p>}
        {!loading && !!error && <p>{error}</p>}
        {!loading && !error && (
          <>
            <div className="products__grid">
              {visibleProducts.map((prod) => (
                <div className="products__grid-item" key={prod.id}>
                  <img
                    className="products__grid-item-img"
                    src={prod.displayImg}
                    alt={prod.title}
                  />
                  <p className="products__grid-item-name">{prod.title}</p>
                  <p className="products__grid-item-price">
                    {prod.currency}
                    {prod.sellingPrice}
                  </p>
                </div>
              ))}
            </div>
            <Pagination
              currentPageNo={pageNo}
              maxPages={maxNumberOfPages}
              onPageSelect={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsGrid;
