/* eslint-disable no-undef,import/no-extraneous-dependencies */
import React from 'react';
import {
 act, screen, fireEvent, within,
} from '@testing-library/react';
import '@testing-library/jest-dom';
// @ts-ignore
import * as moxios from 'moxios';
import selectEvent from 'react-select-event';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndContext from '../../utils/utilsForTesting';
import App from '../App';
import { COMMON_TEXT_ERROR } from '../../constants';
import { moxiosWaitHelper } from '../../actions/tests/utilsForActionsTests';

describe('App tests for Tours page', () => {
  beforeAll(() => {
    global.history.pushState({}, 'Tours page', '/tours');
  });

  beforeEach(() => {
    renderWithRouterAndContext(<App />);
  });

  it('renders correctly', async () => {
    const tourItemLink = await screen.findByText(/antalya/i);
    const pagination = await screen.findByTestId('Pagination');
    const fromInput = screen.getByRole('textbox', { name: /from/i });
    const hotelsInput = screen.getByRole('textbox', { name: /hotels/i });

    expect(pagination).toBeInTheDocument();
    expect(fromInput).toBeInTheDocument();
    expect(hotelsInput).toBeInTheDocument();
    expect(tourItemLink).toBeInTheDocument();
  });

  it('CustomSelectContainer handleSelectChange(): should change select value', async () => {
    const form = await screen.findByTestId('tourFilterForm');
    const destinationSelect = await screen.findByLabelText(/destination/i);

    await selectEvent.select(destinationSelect, 'Turkey');
    expect(form).toHaveFormValues({ destination: 'Turkey' });

    await act(async () => {
      await fireEvent.blur(destinationSelect);
    });
  });

  it('set price should change price input value', async () => {
    const form = await screen.findByTestId('tourFilterForm');
    const priceRangeInput = await screen.findByRole('slider', { name: /max\. price, \$:/i });

    await act(async () => {
      await fireEvent.change(priceRangeInput, { target: { value: '9500' } });
    });
    expect(form).toHaveFormValues({ price: '9500' });
  });

  it('click page2 should render new tours', async () => {
    /* important: this case is tested with selected filters in previous tests:
    * destination - Turkey, max. price - 9500.
    */
    const pagination = await screen.findByTestId('Pagination');
    const page2Link = within(pagination).getByText(/2/i);

    userEvent.click(page2Link);

    const tourItemLink = await screen.findByText(/side/i);
    const previousTourItemLink = screen.queryByText(/antalya/i);

    expect(tourItemLink).toBeInTheDocument();
    expect(previousTourItemLink).toBeNull();
  });

  it('click Prev should render previous tours', async () => {
    /* previous tours relative to previous test */
    const prevArrow = await screen.findByLabelText(/prev/i);

    userEvent.click(prevArrow);

    const previousTourItemLink = await screen.findByText(/antalya/i);
    const tourItemLink = screen.queryByText(/side/i);

    expect(previousTourItemLink).toBeInTheDocument();
    expect(tourItemLink).toBeNull();
  });

  it('click Next should render next tours', async () => {
    /* next tours relative to previous test */
    const nextArrow = await screen.findByLabelText(/next/i);

    userEvent.click(nextArrow);

    const tourItemLink = await screen.findByText(/side/i);
    const previousTourItemLink = screen.queryByText(/antalya/i);

    expect(tourItemLink).toBeInTheDocument();
    expect(previousTourItemLink).toBeNull();
  });
});

describe('simulate server error when fetching tours', () => {
  beforeAll(() => {
    global.history.pushState({}, 'Tours page', '/tours');
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
    const tourItemLink = await screen.queryByText(/antalya/i);

    expect(paragraphWithError).toBeInTheDocument();
    expect(tourItemLink).toBeNull();
  });
});
