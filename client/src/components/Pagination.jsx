import React, { useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Pagination = ({ totalPage, currentPage, handlePagination }) => {
  const displayPages = Array.from({ length: totalPage }, (ele, index) => {
    let page = index + 1;
    return (
      <button
        disabled={currentPage === page}
        onClick={() => handlePagination(page)}
        key={index}
        className={`h-[38px] w-[38px] rounded-full text-center ${
          currentPage === page ? "bg-blue-500 text-white" : "border-[2px]"
        }`}
      >
        {page}
      </button>
    );
  });
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-wrap items-center gap-3 pb-5">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePagination(currentPage - 1)}
          className={`relative h-[38px] w-[38px] rounded-full border-[2px] text-center`}
        >
          <FiChevronLeft
            size={19}
            className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]"
          />
        </button>
        {displayPages}
        <button
          disabled={currentPage === totalPage}
          onClick={() => handlePagination(currentPage + 1)}
          className="relative h-[38px] w-[38px] rounded-full border-[2px] text-center"
        >
          <FiChevronRight
            size={19}
            className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]"
          />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
