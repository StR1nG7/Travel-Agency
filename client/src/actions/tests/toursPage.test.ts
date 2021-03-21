/* eslint-disable no-undef */
import {
 setTours, setToursError, setCurrentPage, setCurrentFilter,
} from '../toursPage';
import {
  SET_TOURS, SET_TOURS_ERROR, SET_CURRENT_PAGE, SET_CURRENT_FILTER,
} from '../../constants';

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
      description: 'Desc1',
      details: 'Details1',
      priceIncluded: ['Tickets', 'Hotel'],
    },
    {
      id: '2',
      title: 'Title2',
      from: ['Kyiv'],
      destination: 'Egypt',
      period: 7,
      persons: 2,
      hotels: ['4', '5'],
      price: 3500,
      description: 'Desc1',
      details: 'Details1',
      priceIncluded: ['Tickets', 'Hotel'],
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

  it('setCurrentPage(): should create an action to set current page number', () => {
    const currentPageMock = 3;
    const expectedAction = {
      type: SET_CURRENT_PAGE,
      currentPage: currentPageMock,
    };
    expect(setCurrentPage(currentPageMock)).toEqual(expectedAction);
  });

  it('setCurrentFilter(): should create an action to set current filter', () => {
    const currentFilterMock = { from: 'Kyiv' };
    const expectedAction = {
      type: SET_CURRENT_FILTER,
      currentFilter: currentFilterMock,
    };
    expect(setCurrentFilter(currentFilterMock)).toEqual(expectedAction);
  });
});
