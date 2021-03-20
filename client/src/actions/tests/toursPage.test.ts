/* eslint-disable no-undef */
import { setTours, setToursError } from '../toursPage';
import { SET_TOURS, SET_TOURS_ERROR } from '../../constants';

// eslint-disable-next-line import/prefer-default-export
export const toursDataMock = {
  count: 7,
  tours: [
    {
      id: '1',
      title: 'Title1',
      from: ['Kyiv'],
      destination: 'Turkey',
      period: 7,
      persons: 2,
      hotels: ['3', '4'],
      price: 3000,
    },
    {
      id: '2',
      title: 'Title2',
      from: ['Lviv'],
      destination: 'Egypt',
      period: 7,
      persons: 2,
      hotels: ['4', '5'],
      price: 3500,
    },
  ],
  minPrice: 3000,
  maxPrice: 3500,
};

describe('sync actions of tours page', () => {
  it('setTours(): should create an action to set tours', () => {
    const expectedAction = {
      type: SET_TOURS,
      toursData: toursDataMock,
    };
    expect(setTours(toursDataMock)).toEqual(expectedAction);
  });

  it('setToursError(): should create an action to set tours error', () => {
    const err = 'Some error';
    const expectedAction = {
      type: SET_TOURS_ERROR,
      err,
    };
    expect(setToursError(err)).toEqual(expectedAction);
  });
});
