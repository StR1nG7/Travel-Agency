/* eslint-disable no-undef,import/no-extraneous-dependencies */
import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from '../../utils/utilsForTesting';
import App from '../App';

const getBBox = () => ({
  x: 0,
  y: 0,
  height: 155,
  width: 155,
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
});

describe('Navigation between Home page and Tours page', () => {
  it('Home page desktop: click on available country should navigate to "/tours" page', async () => {
    // global.innerWidth = 1280;
    Object.defineProperty(global, 'innerWidth', { writable: true, configurable: true, value: 1280 });
    // @ts-ignore
    // for onMouseEnter in <WorldMap />
    global.SVGElement.prototype.getBBox = getBBox;

    renderWithRouterAndContext(<App />);

    const availableCountry = await screen.findByLabelText(/Turkey/i);
    expect(availableCountry).toBeInTheDocument();

    // click on link /tours
    userEvent.click(availableCountry);

    // expected elements on /tours page
    const priceRangeInput = await screen.findByRole('slider', { name: /max\. price, \$:/i });
    const map = screen.queryByLabelText(/World/i);
    expect(priceRangeInput).toBeInTheDocument();
    expect(map).toBeNull();
  });

  it('Home page mobile: click on country card should navigate to "/tours" page', async () => {
    // global.innerWidth = 390;
    Object.defineProperty(global, 'innerWidth', { writable: true, configurable: true, value: 390 });

    renderWithRouterAndContext(<App />);

    // first go home from /tours (after previous test)
    const homeLink = await screen.findByText(/Home/);
    userEvent.click(homeLink);

    // second find mobile map at home page and go to /tours again by clicking mobile map
    const mobileMap = await screen.findByLabelText(/mobilePath-Indonesia/i);
    userEvent.click(mobileMap);

    // expected elements on /tours page
    const priceRangeInput = await screen.findByRole('slider', { name: /max\. price, \$:/i });
    const map = screen.queryByLabelText(/World/i);
    expect(priceRangeInput).toBeInTheDocument();
    expect(map).toBeNull();
  });
});
