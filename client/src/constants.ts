export const SET_FILTER_DATA = 'SET_FILTER_DATA';
export const SET_TOURS = 'SET_TOURS';
export const SET_CURRENT_FILTER = 'SET_CURRENT_FILTERS';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const TOURS_PER_PAGE = 6;
export const SET_SINGLE_TOUR = 'SET_SINGLE_TOUR';
export const SET_TOURS_ERROR = 'SET_ERROR';
export const SET_FILTERS_ERROR = 'SET_FILTERS_ERROR';
export const SET_SINGLE_TOUR_ERROR = 'SET_SINGLE_TOUR_ERROR';
export const COMMON_TEXT_ERROR = "We're sorry, we're not able to retrieve data at the moment, please refresh page or try back later.";

// 'http://localhost:4000' is api host and is used for unit tests without mocking api (see thunks in actions)
export const API_DEV_HOST = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000';
