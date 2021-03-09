import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TourFilter from '../components/TourFilter';
import Tour from '../components/Tour';
import { getToursThunkCreator } from '../actions/actionCreators';
import { TRootState } from '../reducers';
import { ITour, IToursPageReducer } from '../reducers/tours';
import { TOURS_PER_PAGE } from '../constants';
import Pagination from './Pagination';

const ToursPage:React.FC = () => {
  const tours = useSelector((state: TRootState) => (state.toursPage as
      IToursPageReducer).tours as Array<ITour>);
  const count = useSelector((state: TRootState) => (state.toursPage as IToursPageReducer).count);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getToursThunkCreator());
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
