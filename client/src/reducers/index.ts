import { combineReducers } from 'redux';
import toursPage from './toursPage';
import filterOptionsReducer from './filterOptions';
import singleTourPage from './singleTourPage';

const rootReducer = combineReducers({
  toursPage,
  filterOptions: filterOptionsReducer,
  singleTourPage,
});

export default rootReducer;

// export type TRootState = ReturnType<typeof rootReducer>;
