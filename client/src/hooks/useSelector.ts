import { createSelectorHook } from 'react-redux';
import { IToursPageReducer } from '../reducers/toursPage';
import { IFilterData } from '../actions/filterOptions';
import { ISingleTourPage } from '../reducers/singleTourPage';

type TRootState = {
  toursPage: IToursPageReducer,
  filterOptions: IFilterData,
  singleTourPage: ISingleTourPage,
}

const useSelector = createSelectorHook<TRootState>();

export default useSelector;
