import { IFilterData, ISetFilterDataAction } from '../actions/actionCreators';
import { SET_FILTER_DATA } from '../constants';

export const filterOptionsInitialState = {
	from: [],
	destination: [],
	period: [],
	persons: [],
	hotels: [],
};

const filterOptionsReducer = (state = filterOptionsInitialState, action: ISetFilterDataAction):
		IFilterData => {
	switch (action.type) {
		case SET_FILTER_DATA:
			return { ...state, ...action.filterData };
		default:
			return state;
	}
};

export { filterOptionsReducer as filterOptions };
