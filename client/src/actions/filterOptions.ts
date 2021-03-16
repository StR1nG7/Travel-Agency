import { Dispatch } from 'redux';
import axios from 'axios';
import { SET_FILTER_DATA } from '../constants';

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

	axios.post('/graphql', {
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
	}).then((res) => {
		dispatch(setFilterData(res.data.data.getFilterData));
	});
};
