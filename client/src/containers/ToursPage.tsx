import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useSelector from '../hooks/useSelector';
import TourFilter from '../components/TourFilter';
import Tour from '../components/Tour';
import { getToursThunkCreator } from '../actions/actionCreators';
import { TOURS_PER_PAGE } from '../constants';
import Pagination from './Pagination';

const ToursPage:React.FC = () => {
  const toursPageState = useSelector((state) => state.toursPage);
  const tours = toursPageState.tours;
  const count = toursPageState.count;
  const currentPage = toursPageState.currentPage;
  const currentFilters = toursPageState.currentFilters;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getToursThunkCreator({ page: currentPage, currentFilters }));
  }, []);

  return (
    <>
      <div className="col-12">
        <TourFilter />
        <div className="row">
          {
            tours.length !== 0
                // eslint-disable-next-line react/jsx-props-no-spreading
                ? tours.map((tour) => (<Tour key={tour.id} {...tour} />))
                : <div className="col-12"><div style={{ marginTop: 30, fontSize: '1.5em' }}>No tours founded. Please try other options.</div></div>
          }
        </div>
      </div>

      { count && count > TOURS_PER_PAGE ? <Pagination /> : false }
    </>
  );
};

export default ToursPage;
