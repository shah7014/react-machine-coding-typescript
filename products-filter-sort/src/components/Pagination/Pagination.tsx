import { useMemo } from "react";
import "./Pagination.scss";

type PaginationProps = {
  currentPageNo: number;
  onPageSelect: (pageNo: number) => void;
  maxPages: number;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPageNo,
  onPageSelect,
  maxPages,
}) => {
  const pages = useMemo(() => {
    return Array(maxPages)
      .fill(1)
      .map((_, index) => {
        return (
          <button
            key={index}
            className={`pagination__page-btn ${
              currentPageNo === index + 1
                ? "pagination__page-btn--selected"
                : ""
            }`}
            onClick={() => onPageSelect(index + 1)}
          >
            {index + 1}
          </button>
        );
      });
  }, [maxPages, onPageSelect, currentPageNo]);

  return (
    <div className="pagination">
      <button
        className="pagination__prev-btn"
        onClick={() => onPageSelect(currentPageNo - 1)}
        disabled={currentPageNo === 1}
      >
        Prev
      </button>
      <div className="pagination__pages">{pages}</div>
      <button
        className="pagination__next-btn"
        onClick={() => onPageSelect(currentPageNo + 1)}
        disabled={currentPageNo === maxPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
