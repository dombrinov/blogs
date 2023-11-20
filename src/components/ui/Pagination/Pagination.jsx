import { memo } from "react";
import React from "react";
import { getPagesArray } from "../../../utils/pages";

export const Pagination = React.memo(({ totalPages, page, changePage }) => {
  const pagesArray = getPagesArray(totalPages); // массив страниц
  return (
    <div className="page__wrapper">
      {pagesArray.map((p) => (
        <span
          onClick={() => changePage(p)}
          key={p}
          className={page === p ? "page page__current" : "page"}
        >
          {p}
        </span>
      ))}
    </div>
  );
}); //обернут в мемо для рендера пагинации один раз
