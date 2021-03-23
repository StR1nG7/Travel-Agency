/* eslint-disable no-undef */
import singleTourPage, { initialState } from '../singleTourPage';
import { setTour, setSingleTourError } from '../../actions/singleTourPage';
import { tourMock } from '../../actions/tests/singleTourPage.test';

describe('singleTourPage tests', () => {
	it('case SET_SINGLE_TOUR: should create new state with filters data', () => {
		const newState = singleTourPage(initialState, setTour(tourMock));
		expect(newState.title).toBe('Test tour');
		// @ts-ignore
		expect(newState.schedule[0].description).toBe('Desc');
	});

	it('case SET_SINGLE_TOUR_ERROR: should create new state with error and empty data', () => {
		const newState = singleTourPage(initialState, setSingleTourError('Some error'));
		expect(newState.schedule?.length).toBe(0);
		expect(newState.error).toBe('Some error');
	});

	it('default case: should return initial state', () => {
		// @ts-ignore
		const newState = singleTourPage(undefined, { type: 'Default' });
		expect(newState.schedule?.length).toBe(0);
		expect(newState.priceIncluded.length).toBe(0);
		expect(newState.error).toBe('');
	});
});
