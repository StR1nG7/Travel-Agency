import { combineReducers } from 'redux';
import toursPage from './toursPage';
import { filterOptions } from './filterOptions';
import singleTourPage from './singleTourPage';

const rootReducer = combineReducers({ toursPage, filterOptions, singleTourPage });

export default rootReducer;

export type TRootState = ReturnType<typeof rootReducer>;
