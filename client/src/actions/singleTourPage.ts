import { Dispatch } from 'redux';
import axios from 'axios';
import { SET_SINGLE_TOUR_ERROR, SET_SINGLE_TOUR, COMMON_TEXT_ERROR } from '../constants';
import { ITour } from './toursPage';

export interface ISetTourAction {
	type: typeof SET_SINGLE_TOUR,
	tour: ITour
}

export const setTour = (tour: ITour): ISetTourAction => ({
	type: SET_SINGLE_TOUR,
	tour,
});

export interface ISetSingleTourErrorAction {
	type: typeof SET_SINGLE_TOUR_ERROR,
	err: string
}

export const setSingleTourError = (err: string): ISetSingleTourErrorAction => ({
	type: SET_SINGLE_TOUR_ERROR,
	err,
});

export const getTourThunkCreator = (id: string) => (
	(dispatch: Dispatch<ISetTourAction | ISetSingleTourErrorAction>) => (
		axios.post('http://localhost:4000/graphql', {
			query:
					`query {
				getTour( id: "${id}" ) {
					id,
					title,
					destination,
					period,
					price,
					description,
					details,
					priceIncluded,
					schedule {
						day
						title
						description
					}
				}
			}`,
		}).then((res) => {
			dispatch(setTour(res.data.data.getTour));
		}).catch((error) => {
			// eslint-disable-next-line no-console
			console.log(error);
			dispatch(setSingleTourError(COMMON_TEXT_ERROR));
		})
	)
);
