import { ITour } from '../actions/toursPage';
import { ISetSingleTourErrorAction, ISetTourAction } from '../actions/singleTourPage';
import { SET_SINGLE_TOUR_ERROR, SET_SINGLE_TOUR } from '../constants';

const initialState = {
	id: '',
	title: '',
	destination: '',
	period: 0,
	price: 0,
	description: '',
	details: '',
	priceIncluded: [],
	schedule: [],
	error: '',
};

export interface ISingleTourPage extends ITour {
	error: string
}

const singleTourPage = (
		state = initialState,
		action: ISetTourAction | ISetSingleTourErrorAction,
): ISingleTourPage => {
	switch (action.type) {
		case SET_SINGLE_TOUR:
			return { ...state, ...action.tour };
		case SET_SINGLE_TOUR_ERROR:
			return { ...state, error: action.err };
		default:
			return state;
	}
};

export default singleTourPage;
