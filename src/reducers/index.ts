import {combineReducers} from 'redux';
import toursPage from "./tours";
import {filterOptions} from "./filterOptions";

const rootReducer = combineReducers({toursPage, filterOptions});

export default rootReducer;

export type TRootState = ReturnType<typeof rootReducer>;
