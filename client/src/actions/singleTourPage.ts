import { Dispatch } from 'redux';
import axios from 'axios';
import { SET_SINGLE_TOUR } from '../constants';
import { ISetErrorAction, ITour, setError } from './toursPage';

export interface ISetTourAction {
	type: typeof SET_SINGLE_TOUR,
	tour: ITour
}

export const setTour = (tour: ITour): ISetTourAction => ({
	type: SET_SINGLE_TOUR,
	tour,
});

export const getTourThunkCreator = (id: string) => (
		(dispatch: Dispatch<ISetTourAction | ISetErrorAction>) => {
			axios.post('/graphql', {
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
			});
		}
);
