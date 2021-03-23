import {
 ISetCurrentFilterAction, ISetCurrentPageAction, ISetToursErrorAction, ISetToursAction, IToursData,
} from '../actions/toursPage';
import {
 SET_TOURS, SET_CURRENT_PAGE, SET_CURRENT_FILTER, SET_TOURS_ERROR,
} from '../constants';

export interface IToursPageReducer extends IToursData {
	currentPage: number,
	currentFilters: object,
	error: string
}

type TourActionsType = ISetToursAction | ISetCurrentPageAction | ISetCurrentFilterAction
		| ISetToursErrorAction;

export const toursPageInitialState = {
	count: 0,
	tours: [],
	currentPage: 1,
	currentFilters: {},
	minPrice: 0,
	maxPrice: 0,
	error: '',
};

const toursPage = (state = toursPageInitialState, action: TourActionsType): IToursPageReducer => {
	switch (action.type) {
		case SET_TOURS:
			return {
				...state,
				count: action.toursData.count,
				tours: [...action.toursData.tours],
				minPrice: action.toursData.minPrice,
				maxPrice: action.toursData.maxPrice,
			};
		case SET_CURRENT_PAGE:
			return { ...state, currentPage: action.currentPage };
		case SET_CURRENT_FILTER:
			return { ...state, currentFilters: { ...state.currentFilters, ...action.currentFilter } };
		case SET_TOURS_ERROR:
			return { ...state, error: action.err };
		default:
			return state;
	}
};

export default toursPage;
