import { IFilterData, ISetFilterDataAction, ISetFiltersErrorAction } from '../actions/filterOptions';
import { SET_FILTER_DATA, SET_FILTERS_ERROR } from '../constants';

export const filterOptionsInitialState = {
	from: [],
	destination: [],
	period: [],
	persons: [],
	hotels: [],
	error: '',
};

const filterOptionsReducer = (state = filterOptionsInitialState, action: ISetFilterDataAction |
		ISetFiltersErrorAction):
		IFilterData => {
	switch (action.type) {
		case SET_FILTER_DATA:
			return { ...state, ...action.filterData };
		case SET_FILTERS_ERROR:
			return { ...state, error: action.err };
		default:
			return state;
	}
};

export default filterOptionsReducer;
