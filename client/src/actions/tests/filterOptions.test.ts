/* eslint-disable no-undef */
import { setFilterData, setFiltersError } from '../filterOptions';
import { SET_FILTER_DATA, SET_FILTERS_ERROR } from '../../constants';

const filterDataMock = {
  from: [],
  destination: [],
  hotels: [],
  period: [],
  persons: [],
  error: '',
};

describe('sync actions of filter options', () => {
  it('setFilterData(): should create an action to set filter data', () => {
    const expectedAction = {
      type: SET_FILTER_DATA,
      filterData: filterDataMock,
    };
    expect(setFilterData(filterDataMock)).toEqual(expectedAction);
  });

  it('setFiltersError(): should create an action to set filter error', () => {
    const err = 'Some error';
    const expectedAction = {
      type: SET_FILTERS_ERROR,
      err,
    };
    expect(setFiltersError(err)).toEqual(expectedAction);
  });
});
