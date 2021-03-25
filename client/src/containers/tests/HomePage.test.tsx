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

describe('Home page desktop tests', () => {
  beforeEach(() => {
    // global.innerWidth = 1280;
    Object.defineProperty(global, 'innerWidth', { writable: true, configurable: true, value: 1280 });

    renderWithRouterAndContext(<App />);
  });

  it('renders on desktop correctly', async () => {
    /* important: don't change order of variables map and links: first await for map, second for
      links. Otherwise, in const links will be only one link element, because map and second link
      are in the same component (<Homepage />).
    */
    const map = await screen.findByLabelText(/World/i);
    const links = await screen.findAllByText(/Tours/);
    const mobileMap = screen.queryByLabelText(/mobilePath-Indonesia/i);

    expect(map).toBeInTheDocument();
    expect(links.length).toBe(2);
    expect(mobileMap).toBeNull();
  });

  it('hover on large country should show tooltip with country name in center of country', async () => {
    // @ts-ignore
    // for testing onMouseEnter in <WorldMap />
    global.SVGElement.prototype.getBBox = getBBox;

    const country = await screen.findByLabelText(/Ukraine/i);

    userEvent.hover(country);
    expect(screen.getByText(/Ukraine/)).toBeInTheDocument();
  });

  it('hover on small country should show tooltip with country name right side of country', async () => {
    // @ts-ignore
    // for testing onMouseEnter in <WorldMap />
    global.SVGElement.prototype.getBBox = () => ({
      x: 0,
      y: 0,
      height: 145,
      width: 145,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    });

    const country = await screen.findByLabelText(/Cuba/i);

    userEvent.hover(country);
    expect(screen.getByText(/Cuba/)).toBeInTheDocument();

    userEvent.unhover(country);
  });
});

describe('Home page mobile tests', () => {
  it('renders on mobile correctly', async () => {
    // global.innerWidth = 390;
    Object.defineProperty(global, 'innerWidth', { writable: true, configurable: true, value: 390 });

    renderWithRouterAndContext(<App />);
    const mobileMap = await screen.findByLabelText(/mobilePath-Indonesia/i);
    const map = screen.queryByLabelText(/World/i);

    expect(mobileMap).toBeInTheDocument();
    expect(map).toBeNull();
  });
});
