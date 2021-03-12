import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTourThunkCreator, ITour } from '../actions/actionCreators';
import { TRootState } from '../reducers';
import TourSchedule from '../components/TourSchedule';
import TourTable from '../components/TourTable';
import TourCaption from '../components/TourCaption';

interface ParamsTypes {
  id: string
}

const SingleTourPage: React.FC = () => {
  const { id } = useParams<ParamsTypes>();
  const dispatch = useDispatch();
  const tour = useSelector((state: TRootState) => state.singleTourPage) as ITour;

  useEffect(() => {
    dispatch(getTourThunkCreator(id));
  }, []);

  const replacedTitle = tour.title.replace(/ /g, '');

  if (tour.title) {
    return (
      <div className="col-12">
        <img src={`/public/img/${replacedTitle}-lg.jpg`} style={{ marginBottom: 30 }} alt="Tour" />
        <h2 style={{ marginBottom: 20, fontWeight: 600 }}>{tour.title}</h2>

        <TourCaption price={tour.price} destination={tour.destination} />

        <div dangerouslySetInnerHTML={{ __html: tour.description }} style={{ marginBottom: 20 }} />

        <TourTable
          period={tour.period}
          destination={tour.destination}
          details={tour.details}
          priceIncluded={tour.priceIncluded}
        />

        <TourSchedule schedule={tour.schedule} />
      </div>
    );
  }
  return <p>Loading...</p>;
};

export default SingleTourPage;
