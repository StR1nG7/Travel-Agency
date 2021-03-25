import { Dispatch } from 'redux';
import axios from 'axios';
import {
 COMMON_TEXT_ERROR, SET_FILTERS_ERROR, SET_FILTER_DATA,
} from '../constants';

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
	error: string
}

export interface ISetFilterDataAction {
	type: typeof SET_FILTER_DATA,
	filterData: IFilterData
}

export const setFilterData = (filterData: IFilterData): ISetFilterDataAction => ({
	type: SET_FILTER_DATA,
	filterData,
});

export interface ISetFiltersErrorAction {
	type: typeof SET_FILTERS_ERROR,
	err: string
}

export const setFiltersError = (err: string): ISetFiltersErrorAction => ({
	type: SET_FILTERS_ERROR,
	err,
});

export const getFilterDataThunk = (dispatch: Dispatch<ISetFilterDataAction |
		ISetFiltersErrorAction>) => {
	const fragment = '{value, label}';

	return axios.post('http://localhost:4000/graphql', {
		query:
				`query {
			getFilterData {
				from ${fragment},
				destination ${fragment},
				period ${fragment},
				persons ${fragment},
				hotels ${fragment}
			}
		}`,
	}).then((response) => {
		dispatch(setFilterData(response.data.data.getFilterData));
	}).catch((error) => {
		// eslint-disable-next-line no-console
		console.log(error);
		dispatch(setFiltersError(COMMON_TEXT_ERROR));
	});
};
