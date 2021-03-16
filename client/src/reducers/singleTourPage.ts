import { ISetErrorAction, ITour } from '../actions/toursPage';
import { ISetTourAction } from '../actions/singleTourPage';
import { SET_ERROR, SET_SINGLE_TOUR } from '../constants';

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

interface ISingleTourPage extends ITour {
	error: string
}

const singleTourPage = (
		state = initialState,
		action: ISetTourAction | ISetErrorAction,
): ISingleTourPage => {
	switch (action.type) {
		case SET_SINGLE_TOUR:
			return { ...state, ...action.tour };
		case SET_ERROR:
			return { ...state, error: action.err };
		default:
			return state;
	}
};

export default singleTourPage;
