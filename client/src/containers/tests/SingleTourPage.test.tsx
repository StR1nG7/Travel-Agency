/* eslint-disable no-undef,import/no-extraneous-dependencies */
import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
// @ts-ignore
import * as moxios from 'moxios';
import renderWithRouterAndContext from '../../utils/utilsForTesting';
import App from '../App';
import { COMMON_TEXT_ERROR } from '../../constants';
import { moxiosWaitHelper } from '../../actions/tests/utilsForActionsTests';

describe('App tests for Single tour page', () => {
  beforeAll(() => {
    global.history.pushState({}, 'Single tour page', '/tours/1');
  });

  beforeEach(() => {
    renderWithRouterAndContext(<App />);
  });

  it('renders correctly', async () => {
    const tourImage = await screen.findByRole('img', { name: /tour/i });
    const tourTitle = await screen.findByRole('heading', { name: /sharm el sheikh/i });
    const tourDay4 = await screen.findByText(/day 4/i);

    expect(tourImage).toBeInTheDocument();
    expect(tourTitle).toBeInTheDocument();
    expect(tourDay4).toBeInTheDocument();
  });
});

describe('simulate server error when fetching tour', () => {
  beforeAll(() => {
    global.history.pushState({}, 'Single tour page', '/tours/1');
  });

  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('should render only paragraph with error text', async () => {
    moxiosWaitHelper(undefined);

    renderWithRouterAndContext(<App />);
    const paragraphWithError = await screen.findByText(COMMON_TEXT_ERROR);

    expect(paragraphWithError).toBeInTheDocument();
  });
});
