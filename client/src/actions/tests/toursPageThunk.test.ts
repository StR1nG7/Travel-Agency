/* eslint-disable no-undef,import/no-extraneous-dependencies */
// @ts-ignore
import * as moxios from 'moxios';
import { mockStore, expectActionsHelper, moxiosWaitHelper } from './utilsForActionsTests';
import { COMMON_TEXT_ERROR, SET_TOURS, SET_TOURS_ERROR } from '../../constants';
import { getToursThunkCreator } from '../toursPage';
import { toursDataMock } from './toursPage.test';

describe('async action of single tour page (getTourThunkCreator())', () => {
  beforeEach(() => {
    moxios.install();
    mockStore.clearActions();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('should fetch tour data and set it correctly', async (done) => {
    moxiosWaitHelper({ data: { getTours: toursDataMock } });

    const expectedActions = [{
      type: SET_TOURS,
      toursData: toursDataMock,
    }];

    await expectActionsHelper(getToursThunkCreator({ page: 1, size: 2, currentFilters: { from: 'Kyiv' } }), expectedActions);
    done();
  });

  it('should dispatch setToursError action', async (done) => {
    moxiosWaitHelper(undefined);

    const expectedActions = [{
      type: SET_TOURS_ERROR,
      err: COMMON_TEXT_ERROR,
    }];

    await expectActionsHelper(getToursThunkCreator({ page: 1, size: 2 }), expectedActions);
    done();
  });
});
