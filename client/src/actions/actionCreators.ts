import { Dispatch } from 'redux';
import axios from 'axios';
import {
	SET_CURRENT_FILTER, SET_FILTER_DATA, SET_TOURS, SET_CURRENT_PAGE, TOURS_PER_PAGE,
} from '../constants';
import { ITour } from '../reducers/tours';

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
	toursData,
});

interface ICurrentData {
	page?: number,
	size?: number,
	currentFilters?: {[key: string]: any}
}

export const getToursThunkCreator = (currentData: ICurrentData = {}) => (
	(dispatch: Dispatch<ISetToursAction>) => {
		let currentFiltersFragment;
		if (currentData.currentFilters) {
			const currentFilters = currentData.currentFilters;
			const properties: Array<string> = [];
			const keys = Object.keys(currentFilters);
			keys.forEach((key) => {
				if (currentFilters[key]) {
					properties.push(`${key}: "${currentFilters[key]}"`);
				}
			});
			currentFiltersFragment = `, currentFilters: { ${properties.join(', ')} }`;
		}

		axios.post('http://localhost:4000/graphql', {
			query: `
				query {
					getTours( page: ${currentData.page || 1}, size: ${TOURS_PER_PAGE} ${currentFiltersFragment || ''} ) {
						count, 
						tours {
							id,
							title,
							from,
							destination,
							persons,
							period,
							hotels,
							price
						},
						minPrice,
						maxPrice
					}
				}
			`,
		}).then((res) => {
			dispatch(setTours(res.data.data.getTours));
		});
	}
);
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

export const setFilterData = (filterData: IFilterData): ISetFilterDataAction => ({
	type: SET_FILTER_DATA,
	filterData,
});

export const getFilterDataThunk = (dispatch: Dispatch<ISetFilterDataAction>) => {
	// fetch('http://localhost:4000/filterdata')
	// 		.then(res => res.json() as Promise<IFilterData>)
	// 		.then(data => dispatch(setFilterData(data)));

	// axios.get('http://localhost:4000/filterdata')
	// 		.then( res => {
	//   dispatch(setFilterData(res.data));
	// } );
	const fragment = '{value, label}';

	axios.post('http://localhost:4000/graphql', {
		query: `
				query {
					getFilterData {
						from ${fragment},
						destination ${fragment},
						period ${fragment},
						persons ${fragment},
						hotels ${fragment}
					}
				}
			`,
	}).then((res) => {
		dispatch(setFilterData(res.data.data.getFilterData));
	});
};
/* end filter options */

/* start current filter */
export interface ISetCurrentFilterAction {
	type: typeof SET_CURRENT_FILTER,
	currentFilter: object
}

export const setCurrentFilter = (currentFilter = {}): ISetCurrentFilterAction => ({
	type: SET_CURRENT_FILTER,
	currentFilter,
});
/* end current filter */

/* start current page */
export interface ISetCurrentPageAction {
	type: typeof SET_CURRENT_PAGE,
	currentPage: number
}

export const setCurrentPage = (currentPage: number): ISetCurrentPageAction => ({
	type: SET_CURRENT_PAGE,
	currentPage,
});
/* end current page */
