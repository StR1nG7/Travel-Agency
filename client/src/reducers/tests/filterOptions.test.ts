/* eslint-disable no-undef */
import filterOptionsReducer, { filterOptionsInitialState } from '../filterOptions';
import { setFilterData, setFiltersError } from '../../actions/filterOptions';
import { filterDataMock } from '../../actions/tests/filterOptionsThunk.test';

describe('filterOptionsReducer\'s tests', () => {
  it('case SET_FILTER_DATA: should create new state with filters data', () => {
    const newState = filterOptionsReducer(filterOptionsInitialState, setFilterData(filterDataMock));
    expect(newState.from.length).toBe(1);
    expect(newState.hotels[0].value).toBe('All');
    expect(newState.error).toBe('');
  });

  it('case SET_FILTERS_ERROR: should create new state with error and empty data', () => {
    const newState = filterOptionsReducer(filterOptionsInitialState, setFiltersError('Some error'));
    expect(newState.destination.length).toBe(0);
    expect(newState.error).toBe('Some error');
  });

  it('default case: should return filterOptionsInitialState', () => {
    // @ts-ignore
    const newState = filterOptionsReducer(undefined, { type: 'Default' });
    expect(newState.destination.length).toBe(0);
    expect(newState.persons.length).toBe(0);
    expect(newState.error).toBe('');
  });
});
