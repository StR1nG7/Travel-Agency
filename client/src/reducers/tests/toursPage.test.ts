/* eslint-disable no-undef */
import toursPage, { toursPageInitialState } from '../toursPage';
import {
	setTours, setToursError, setCurrentPage, setCurrentFilter,
} from '../../actions/toursPage';
import { toursDataMock } from '../../actions/tests/toursPage.test';

describe('toursPage tests', () => {
	it('case SET_TOURS: should create new state with tours', () => {
		const newState = toursPage(toursPageInitialState, setTours(toursDataMock));
		expect(newState.count).toBe(2);
		expect(newState.tours[1].title).toBe('Hurghada');
	});

	it('case SET_TOURS_ERROR: should create new state with error and empty data', () => {
		const newState = toursPage(toursPageInitialState, setToursError('Some error'));
		expect(newState.tours.length).toBe(0);
		expect(newState.error).toBe('Some error');
	});

	it('case SET_CURRENT_PAGE: should create new state with new current page', () => {
		const newState = toursPage(toursPageInitialState, setCurrentPage(3));
		expect(newState.currentPage).toBe(3);
	});

	it('case SET_CURRENT_FILTER: should create new state with new current filter', () => {
		const newState = toursPage(toursPageInitialState, setCurrentFilter({ from: 'Odesa' }));
		// @ts-ignore
		expect(newState.currentFilters.from).toBe('Odesa');
		// @ts-ignore
		expect(newState.currentFilters.destination).toBeUndefined();
	});

	it('default case: should return initial state', () => {
		// @ts-ignore
		const newState = toursPage(undefined, { type: 'Default' });
		expect(newState.count).toBe(0);
		expect(newState.tours.length).toBe(0);
		expect(newState.error).toBe('');
	});
});
