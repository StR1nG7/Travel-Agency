import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import useSelector from '../hooks/useSelector';
import { getToursThunkCreator } from '../actions/toursPage';
import { TOURS_PER_PAGE } from '../constants';

import TourFilterContainer from './TourFilterContainer';
import PaginationContainer from './PaginationContainer';
import Tour from '../components/Tour';

const ToursPage:React.FC = () => {
  const toursPageState = useSelector((state) => state.toursPage);
  const filtersFetchError = useSelector((state) => state.filterOptions.error);
  const error = toursPageState.error;
  const tours = toursPageState.tours;
  const count = toursPageState.count;
  const currentPage = toursPageState.currentPage;
  const currentFilters = toursPageState.currentFilters;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getToursThunkCreator({ page: currentPage, currentFilters }));
  }, [currentPage, currentFilters]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <div className="col-12">
        {!filtersFetchError && <TourFilterContainer />}
        <div className="row">
          {
            tours.length !== 0
                // eslint-disable-next-line react/jsx-props-no-spreading
                ? tours.map((tour) => (<Tour key={tour.id} {...tour} />))
                : <div className="col-12"><div style={{ marginTop: 30, fontSize: '1.5em' }}>No tours founded. Please try other options.</div></div>
          }
        </div>
      </div>

      { count && count > TOURS_PER_PAGE ? <PaginationContainer /> : false }
    </>
  );
};

export default ToursPage;
