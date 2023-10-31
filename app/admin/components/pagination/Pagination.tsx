'use client';

import React, { useState } from 'react';
import styles from './pagination.module.scss';

export default function Pagination({
  currentPage,
  setCurrentPage,
  itemsPerPage,
  totalItems,
}: PaginationProps) {
  const pageNumbers: number[] = [];
  const totalPages: number = totalItems / itemsPerPage;

  //limit the sets of page numbers shown
  const [pageNumberLimit] = useState<number>(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState<number>(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState<number>(0);

  //create the page numbers
  for (let i = 1; i < Math.ceil(totalPages) + 1; i++) {
    pageNumbers.push(i);
  }

  //paginate
  const paginate = (pageNumber: number): void => setCurrentPage(pageNumber);

  // Go to next page
  const paginateNext = (): void => {
    setCurrentPage(currentPage + 1);

    //show the next set of pageNumbers
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  //Go to the previous page
  const paginatePrev = (): void => {
    setCurrentPage(currentPage - 1);

    //show the previous set of pageNumbers
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  return (
    <ul className={styles.pagination}>
      <li
        onClick={paginatePrev}
        className={currentPage === pageNumbers[0] ? styles.hidden : ''}
      >
        Prev
      </li>

      {pageNumbers.map((number) => {
        return (
          number < maxPageNumberLimit + 1 &&
          number > minPageNumberLimit && (
            <li
              key={number}
              onClick={() => paginate(number)}
              className={currentPage === number ? styles.active : ''}
            >
              {number}
            </li>
          )
        );
      })}

      <li
        onClick={paginateNext}
        className={
          currentPage === pageNumbers[pageNumbers.length - 1]
            ? styles.hidden
            : ''
        }
      >
        Next
      </li>

      <p>
        <b className={styles.page}>{`Page ${currentPage}`}</b>
        <span>{` of `}</span>
        <b>{`${Math.ceil(totalPages)}`}</b>
      </p>
    </ul>
  );
}
