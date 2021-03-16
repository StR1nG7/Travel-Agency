import { createSelectorHook } from 'react-redux';
import { IToursPageReducer } from '../reducers/toursPage';
import { IFilterData, ITour } from '../actions/actionCreators';

type TRootState = {
  toursPage: IToursPageReducer,
  filterOptions: IFilterData,
  singleTourPage: ITour,
}

const useSelector = createSelectorHook<TRootState>();

export default useSelector;
