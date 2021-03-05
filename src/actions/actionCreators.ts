import {Dispatch} from "redux";
import axios from 'axios';
import {SET_CURRENT_FILTER, SET_FILTER_DATA, SET_TOURS, SET_CURRENT_PAGE, TOURS_PER_PAGE} from "../constants";
import {ITour} from "../reducers/tours";

/* start tours */
export interface IToursData {
	count: number,
	tours: Array<ITour>,
	minPrice: number,
	maxPrice: number
}

export interface ISetToursAction {
	type: typeof SET_TOURS,
	toursData: IToursData
}

export const setTours = (toursData: IToursData): ISetToursAction => ({
	type: SET_TOURS,
	toursData
});

export const getToursThunkCreator = ( currentData = {} ) => {
	return (dispatch: Dispatch<ISetToursAction> ) => {
		// fetch('http://localhost:4000/tours', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json; charset=utf-8',
		// 	},
		// 	body: JSON.stringify({page: 1, size: TOURS_PER_PAGE, ...currentData})
		// })
		// 		.then(res => res.json() as Promise<IToursData>)
		// 		.then(data => dispatch(setTours(data)));

		axios.post('http://localhost:4000/tours', {
			page: 1,
			size: TOURS_PER_PAGE,
			...currentData
		}).then( res => {
			dispatch(setTours(res.data));
		} );
	}
};
/* end tours */

/* start filter options */
export interface IOption {
	value: string,
	label: string
}

export interface IFilterData {
	from: Array<IOption>,
	destination: Array<IOption>,
	period: Array<IOption>,
	persons: Array<IOption>,
	hotels: Array<IOption>,
}

export interface ISetFilterDataAction {
	type: typeof SET_FILTER_DATA,
	filterData: IFilterData
}

export const setFilterData = (filterData: IFilterData ): ISetFilterDataAction => ({
	type: SET_FILTER_DATA,
	filterData
});

export const getFilterDataThunk = (dispatch: Dispatch<ISetFilterDataAction> ) => {
	// fetch('http://localhost:4000/filterdata')
	// 		.then(res => res.json() as Promise<IFilterData>)
	// 		.then(data => dispatch(setFilterData(data)));

	axios.get('http://localhost:4000/filterdata')
			.then( res => {
	  dispatch(setFilterData(res.data));
	} );
};
/* end filter options */

/* start current filter */
export interface ISetCurrentFilterAction {
	type: typeof SET_CURRENT_FILTER,
	currentFilter: object
}

export const setCurrentFilter = (currentFilter = {}): ISetCurrentFilterAction => ({
	type: SET_CURRENT_FILTER,
	currentFilter
});
/* end current filter */

/* start current page */
export interface ISetCurrentPageAction {
	type: typeof SET_CURRENT_PAGE,
	currentPage: number
}

export const setCurrentPage = (currentPage: number): ISetCurrentPageAction => ({
	type: SET_CURRENT_PAGE,
	currentPage
});
/* end current page */
