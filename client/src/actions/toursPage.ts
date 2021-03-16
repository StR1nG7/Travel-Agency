import { Dispatch } from 'redux';
import axios from 'axios';
import {
	SET_TOURS, TOURS_PER_PAGE, SET_ERROR, SET_CURRENT_PAGE, SET_CURRENT_FILTER,
} from '../constants';

/* start tours */
export interface ITourScheduleDay {
	day: number,
	title: string,
	description: string
}

export interface ITour {
	id: string,
	title: string,
	from?: Array<string>,
	destination: string,
	period: number,
	persons?: number,
	hotels?: Array<string>,
	price: number,
	description: string,
	details: string,
	priceIncluded: Array<string>,
	schedule: Array<ITourScheduleDay>
}

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
				const keys = Object.keys(currentFilters);
				if (keys[0]) {
					const properties: Array<string> = [];
					keys.forEach((key) => {
						if (currentFilters[key]) {
							properties.push(`${key}: "${currentFilters[key]}"`);
						}
					});
					currentFiltersFragment = `, currentFilters: { ${properties.join(', ')} }`;
				}
			}

			axios.post('/graphql', {
				query:
						`query {
					getTours( page: ${currentData.page}, size: ${TOURS_PER_PAGE} ${currentFiltersFragment || ''} ) {
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
				}`,
			}).then((res) => {
				dispatch(setTours(res.data.data.getTours));
			});
		}
);

export interface ISetCurrentPageAction {
	type: typeof SET_CURRENT_PAGE,
	currentPage: number
}

export const setCurrentPage = (currentPage: number): ISetCurrentPageAction => ({
	type: SET_CURRENT_PAGE,
	currentPage,
});

export interface ISetCurrentFilterAction {
	type: typeof SET_CURRENT_FILTER,
	currentFilter: object
}

export const setCurrentFilter = (currentFilter = {}): ISetCurrentFilterAction => ({
	type: SET_CURRENT_FILTER,
	currentFilter,
});

export interface ISetErrorAction {
	type: typeof SET_ERROR,
	err: string
}

export const setError = (err: string): ISetErrorAction => ({
	type: SET_ERROR,
	err,
});
