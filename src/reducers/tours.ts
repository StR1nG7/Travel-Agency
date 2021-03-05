import {ISetCurrentFilterAction, ISetCurrentPageAction, ISetToursAction, IToursData} from "../actions/actionCreators";
import { SET_TOURS, SET_CURRENT_PAGE, SET_CURRENT_FILTER } from "../constants";

export interface ITour {
	id: string,
	title: string,
	from: Array<string>,
	destination: string,
	period: number,
	persons: number,
	hotels: Array<string>,
	price: number
}

export interface IToursPageReducer extends IToursData {
	currentPage: number,
	currentFilters: object
}

type TourActionsType = ISetToursAction | ISetCurrentPageAction | ISetCurrentFilterAction;

const toursPage = (state = {count: 0, tours: [], currentPage: 1, currentFilters: {}, minPrice: 0, maxPrice: 0 }, action: TourActionsType ): IToursPageReducer => {
	switch (action.type) {
		case SET_TOURS:
			return {...state, count: action.toursData.count,  tours: [...action.toursData.tours], minPrice: action.toursData.minPrice, maxPrice: action.toursData.maxPrice}; // return only filtered tours; don't copy old state here (...state)
		case SET_CURRENT_PAGE:
			return {...state, currentPage: action.currentPage};
		case SET_CURRENT_FILTER:
			return {...state, currentFilters: {...state.currentFilters, ...action.currentFilter}};
		default:
			return state;
	}
};

export default toursPage;


