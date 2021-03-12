import { ISetTourAction, ITour } from '../actions/actionCreators';
import { SET_SINGLE_TOUR } from '../constants';

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
};

const singleTourPage = (state = initialState, action: ISetTourAction): ITour => {
	switch (action.type) {
		case SET_SINGLE_TOUR:
			return action.tour;
		default:
			return state;
	}
};

export default singleTourPage;
