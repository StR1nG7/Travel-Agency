/* eslint-disable no-undef,import/no-extraneous-dependencies */
import thunk from 'redux-thunk';
// @ts-ignore
import * as moxios from 'moxios';
// @ts-ignore
import configureMockStore from 'redux-mock-store';
import * as expect from 'expect';
import { Dispatch } from 'redux';

const mockstore = configureMockStore([thunk]);
export const mockStore = mockstore({});

export const moxiosWaitHelper = (response: any) => {
  moxios.wait(() => {
    const request = moxios.requests.mostRecent();
    request.respondWith({
      status: 200,
      response,
    });
  });
};

export const expectActionsHelper = async (
  testedThunk: (dispatch: Dispatch<{type: string}>) => void,
  expectedActions: Array<object>,
) => {
  await mockStore.dispatch(testedThunk);
  const actualActions = mockStore.getActions();
  expect(actualActions).toEqual(expectedActions);
};
