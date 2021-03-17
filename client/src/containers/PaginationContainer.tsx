import React from 'react';
import { useDispatch } from 'react-redux';
import useSelector from '../hooks/useSelector';

import { TOURS_PER_PAGE } from '../constants';
import { getToursThunkCreator, setCurrentPage } from '../actions/toursPage';

import PaginationItem from '../components/PaginationItem';
import Pagination from '../components/Pagination';

const PaginationContainer: React.FC = () => {
  const count = useSelector((state) => state.toursPage.count);
  const currentFilters = useSelector((state) => state.toursPage.currentFilters);
  const currentPage = useSelector((state) => state.toursPage.currentPage);

  const dispatch = useDispatch();
  const handlePagination = (pageNumber: number) => {
    dispatch(setCurrentPage(pageNumber));
    dispatch(getToursThunkCreator({ currentFilters, page: pageNumber, size: TOURS_PER_PAGE }));
  };
  const handlePrevClick = () => {
    handlePagination(currentPage - 1);
  };
  const handleNextClick = () => {
    handlePagination(currentPage + 1);
  };

  const pages = Math.ceil(count / TOURS_PER_PAGE);
  const links = [];

  for (let i = 1; i <= pages; i++) {
    links.push(
      <PaginationItem
        key={i}
        number={i}
        currentPage={currentPage}
        handleClick={() => handlePagination(i)}
      />,
    );
  }

  const paginationProps = {
    currentPage, pages, links, handlePrevClick, handleNextClick,
  };

  return (
      // eslint-disable-next-line react/jsx-props-no-spreading
    <Pagination {...paginationProps} />
  );
};

export default PaginationContainer;
