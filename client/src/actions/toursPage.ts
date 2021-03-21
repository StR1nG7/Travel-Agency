import { Dispatch } from 'redux';
import axios from 'axios';
import {
	SET_TOURS, TOURS_PER_PAGE, SET_TOURS_ERROR, SET_CURRENT_PAGE, SET_CURRENT_FILTER,
	COMMON_TEXT_ERROR,
} from '../constants';

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
	schedule?: Array<ITourScheduleDay>
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

export interface ISetToursErrorAction {
	type: typeof SET_TOURS_ERROR,
	err: string
}

export const setToursError = (err: string): ISetToursErrorAction => ({
	type: SET_TOURS_ERROR,
	err,
});

interface ICurrentData {
	page?: number,
	size?: number,
	currentFilters?: {[key: string]: any}
}

export const getToursThunkCreator = (currentData: ICurrentData) => (
		(dispatch: Dispatch<ISetToursAction | ISetToursErrorAction>) => {
			let currentFiltersFragment;

			if (currentData.currentFilters) {
				const currentFilters = currentData.currentFilters;
				const keys = Object.keys(currentFilters);
				const properties: Array<string> = [];
				keys.forEach((key) => {
						properties.push(`${key}: "${currentFilters[key]}"`);
				});
				currentFiltersFragment = `, currentFilters: { ${properties.join(', ')} }`;
			}

			return axios.post('/graphql', {
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
			}).catch((error) => {
				// eslint-disable-next-line no-console
				console.log(error);
				dispatch(setToursError(COMMON_TEXT_ERROR));
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

export const setCurrentFilter = (currentFilter: object): ISetCurrentFilterAction => ({
	type: SET_CURRENT_FILTER,
	currentFilter,
});
