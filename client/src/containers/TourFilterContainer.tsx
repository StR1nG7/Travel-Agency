import React, { useEffect } from 'react';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';

import useSelector from '../hooks/useSelector';
import { getToursThunkCreator, setCurrentFilter, setCurrentPage } from '../actions/toursPage';
import { getFilterDataThunk, IFilterData, IOption } from '../actions/filterOptions';

import CustomSelectContainer from './CustomSelectContainer';
import TourFilter from '../components/TourFilter';

export type TOptionOrNull = IOption | null;

export interface formValues {
  from: TOptionOrNull,
  destination: TOptionOrNull,
  period: TOptionOrNull,
  persons: TOptionOrNull,
  hotels: TOptionOrNull,
  price: string,
}

const TourFilterContainer: React.FC = () => {
  const filterOptions: IFilterData = useSelector((state) => state.filterOptions);
  const currentFilters = useSelector((state) => state.toursPage.currentFilters);
  const minPrice = useSelector((state) => state.toursPage.minPrice);
  const maxPrice = useSelector((state) => state.toursPage.maxPrice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFilterDataThunk);
  }, []);

  return (
    <>
      <Formik
        initialValues={{
              from: null,
              destination: null,
              period: null,
              persons: null,
              hotels: null,
              price: '',
            } as formValues}
        onSubmit={(values) => {}}
      >
        {
            (props) => {
              const {
                values,
                handleChange,
                setFieldValue,
                setFieldTouched,
              } = props;

              const selectComponents = [];

              let key: keyof IFilterData;
              // eslint-disable-next-line guard-for-in,no-restricted-syntax
              for (key in filterOptions) {
                if (key !== 'error') {
                  let value;
                  if (values[key]) {
                    value = values[key];
                  } else {
                  /*
                    Else-block is for case when user selected filters on Tours page with all tours,
                    after that went to Single Tour page with one tour,
                    and after that click Back history in browser to Tours page with
                    selected filters.
                    In this case, values[key] is null (Formik initial value), and
                    is not selected value.
                    So, I get selected value from store (state.toursPage.currentFilters) and
                    set as value for CustomSelectContainer component.
                  */

                    // @ts-ignore
                    const optionValue = currentFilters[key]; // for example, "Kyiv", "Egypt".
                    const options = filterOptions[key];
                    value = optionValue
                        && options.find((currentItem) => currentItem.value === optionValue);
                  }

                  selectComponents.push(
                    <CustomSelectContainer
                      key={key}
                      id={key}
                      setFieldValue={setFieldValue}
                      setFieldTouched={setFieldTouched}
                      options={filterOptions[key]}
                      value={value}
                    />,
                  );
                }
              }

              let selectedPrice;
              if (values.price) {
                selectedPrice = values.price;
                // @ts-ignore
              } else if (currentFilters.price) {
                // @ts-ignore
                selectedPrice = currentFilters.price;
              } else {
                selectedPrice = maxPrice;
              }

              const handlePriceChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
                handleChange(e); // Formik handleChange
                const val = e.currentTarget.value;
                if (+val) {
                  dispatch(setCurrentFilter({ price: val }));
                  dispatch(setCurrentPage(1));
                  dispatch(getToursThunkCreator({
                    page: 1,
                    currentFilters: { ...currentFilters, price: val },
                  }));
                }
              };

              const tourFilterProps = {
                selectComponents, minPrice, maxPrice, selectedPrice, handlePriceChange,
              };

              return (
                  // eslint-disable-next-line react/jsx-props-no-spreading
                <TourFilter {...tourFilterProps} />
              );
            }
          }
      </Formik>
    </>
  );
};

export default TourFilterContainer;
