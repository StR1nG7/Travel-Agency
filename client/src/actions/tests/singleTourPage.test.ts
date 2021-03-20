/* eslint-disable no-undef */
import { setTour, setSingleTourError } from '../singleTourPage';
import { SET_SINGLE_TOUR, SET_SINGLE_TOUR_ERROR } from '../../constants';

// eslint-disable-next-line import/prefer-default-export
export const tourMock = {
  id: '1',
  title: 'Test tour',
  destination: 'Egypt',
  period: 7,
  price: 3500,
  description: 'Some description',
  details: 'Some details',
  priceIncluded: ['Some string1', 'Some string2'],
  schedule: [{ day: 1, title: 'Title', description: 'Desc' }],
};

describe('sync actions of single tour page', () => {
  it('setTour(): should create an action to set single tour data', () => {
    const expectedAction = {
      type: SET_SINGLE_TOUR,
      tour: tourMock,
    };
    expect(setTour(tourMock)).toEqual(expectedAction);
  });

  it('setSingleTourError(): should create an action to set single tour error', () => {
    const err = 'Some error';
    const expectedAction = {
      type: SET_SINGLE_TOUR_ERROR,
      err,
    };
    expect(setSingleTourError(err)).toEqual(expectedAction);
  });
});
