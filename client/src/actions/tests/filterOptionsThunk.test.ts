/* eslint-disable no-undef,import/no-extraneous-dependencies */
// @ts-ignore
import * as moxios from 'moxios';
import { mockStore, expectActionsHelper, moxiosWaitHelper } from './utilsForActionsTests';
import { getFilterDataThunk } from '../filterOptions';
import { COMMON_TEXT_ERROR, SET_FILTER_DATA, SET_FILTERS_ERROR } from '../../constants';

describe('filter options async actions (getFilterDataThunk())', () => {
  beforeEach(() => {
    moxios.install();
    mockStore.clearActions();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('should fetch filter options and set it correctly', async (done) => {
    const filterDataMock = {
      from: [{ value: 'All', label: 'All' }],
      destination: [{ value: 'All', label: 'All' }],
      hotels: [{ value: 'All', label: 'All' }],
      period: [{ value: 'All', label: 'All' }],
      persons: [{ value: 'All', label: 'All' }],
    };

    moxiosWaitHelper({ data: { getFilterData: filterDataMock } });

    const expectedActions = [{
      type: SET_FILTER_DATA,
      filterData: filterDataMock,
    }];

    await expectActionsHelper(getFilterDataThunk, expectedActions);
    done();
  });

  it('should dispatch setFiltersError action', async (done) => {
    moxiosWaitHelper(undefined);

    const expectedActions = [{
      type: SET_FILTERS_ERROR,
      err: COMMON_TEXT_ERROR,
    }];

    await expectActionsHelper(getFilterDataThunk, expectedActions);
    done();
  });
});
