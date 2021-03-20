/* eslint-disable no-undef,import/no-extraneous-dependencies */
// @ts-ignore
import * as moxios from 'moxios';
import { mockStore, expectActionsHelper, moxiosWaitHelper } from './utilsForActionsTests';
import { COMMON_TEXT_ERROR, SET_SINGLE_TOUR, SET_SINGLE_TOUR_ERROR } from '../../constants';
import { getTourThunkCreator } from '../singleTourPage';
import { tourMock } from './singleTourPage.test';

describe('async action of single tour page (getTourThunkCreator())', () => {
  beforeEach(() => {
    moxios.install();
    mockStore.clearActions();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('should fetch tour data and set it correctly', async (done) => {
    moxiosWaitHelper({ data: { getTour: tourMock } });

    const expectedActions = [{
      type: SET_SINGLE_TOUR,
      tour: tourMock,
    }];

    await expectActionsHelper(getTourThunkCreator('7'), expectedActions);
    done();
  });

  it('should dispatch setSingleTourError action', async (done) => {
    moxiosWaitHelper(undefined);

    const expectedActions = [{
      type: SET_SINGLE_TOUR_ERROR,
      err: COMMON_TEXT_ERROR,
    }];

    await expectActionsHelper(getTourThunkCreator('7'), expectedActions);
    done();
  });
});
