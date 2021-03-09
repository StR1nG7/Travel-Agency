import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

interface ParamsTypes {
  id: string
}

const SingleTourPage:React.FC = () => {
  const { id } = useParams<ParamsTypes>();
  console.log(`----${id}`);

  // const dispatch = useDispatch;

  useEffect(() => {
    // dispatch(getToursThunkCreator());
    console.log('effect');
  }, []);

  return (
    <>

    </>
  );
};

export default SingleTourPage;
