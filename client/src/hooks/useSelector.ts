import { createSelectorHook } from 'react-redux';
import { IToursPageReducer } from '../reducers/toursPage';
import { ITour } from '../actions/toursPage';
import { IFilterData } from '../actions/filterOptions';

type TRootState = {
  toursPage: IToursPageReducer,
  filterOptions: IFilterData,
  singleTourPage: ITour,
}

const useSelector = createSelectorHook<TRootState>();

export default useSelector;
