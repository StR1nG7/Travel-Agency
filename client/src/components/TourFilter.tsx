import React, { useEffect } from 'react';
import { Formik, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import CustomSelect from './CustomSelect';
import {
  getFilterDataThunk,
  getToursThunkCreator,
  IFilterData, IOption,
  setCurrentFilter,
  setCurrentPage,
} from '../actions/actionCreators';
import { TRootState } from '../reducers';
import { IToursPageReducer } from '../reducers/toursPage';
import { flex } from '../utils/styled-components';

export type TOptionOrNull = IOption | null;

export interface formValues {
  from: TOptionOrNull,
  destination: TOptionOrNull,
  period: TOptionOrNull,
  persons: TOptionOrNull,
  hotels: TOptionOrNull,
  price: string,
}

const TourFilter: React.FC = () => {
  const filterOptions: IFilterData = useSelector((state: TRootState) => state.filterOptions);
  const currentPage = useSelector((state: TRootState) => (state.toursPage as
      IToursPageReducer).currentPage);
  const currentFilters = useSelector((state: TRootState) => (state.toursPage as
      IToursPageReducer).currentFilters);
  const minPrice = useSelector((state: TRootState) => (state.toursPage as
      IToursPageReducer).minPrice);
  const maxPrice = useSelector((state: TRootState) => (state.toursPage as
      IToursPageReducer).maxPrice);
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
                    set as value for CustomSelect component.
                  */

                  // @ts-ignore
                  const optionValue = currentFilters[key]; // for example, "Kyiv", "Egypt".
                  const options = filterOptions[key];
                  value = optionValue
                      && options.find((currentItem) => currentItem.value === optionValue);
                }

                selectComponents.push(
                  <CustomSelect
                    key={key}
                    id={key}
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                    options={filterOptions[key]}
                    value={value}
                  />,
                );
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

              return (
                <STourFilterWrapper>

                  { selectComponents }

                  <STourFilterPrice>
                    <STourFilterTitle>
                      <span>{minPrice}</span>
                      <span style={{ position: 'relative', left: -22 }}>
                        Max. price, $:
                        <span style={{ position: 'absolute', width: 43, left: 'calc(100% + 3px)' }}>{selectedPrice}</span>
                      </span>
                      <span>{maxPrice}</span>
                    </STourFilterTitle>
                    <Field
                      type="range"
                      name="price"
                      min={minPrice}
                      max={maxPrice}
                      step="100"
                      value={selectedPrice}
                      onChange={(e: React.KeyboardEvent<HTMLInputElement>) => {
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
                             }}
                    />
                  </STourFilterPrice>
                </STourFilterWrapper>
              );
            }
          }
      </Formik>
    </>
  );
};

const STourFilterWrapper = styled.form`
	${flex({ wrap: 'wrap', justify: 'space-between', align: 'flex-start' })};
	padding:15px 15px 10px;
	background-color: ${(props) => props.theme.lightBlue};
	input {
		width:100%;
	}
	label {
		position:relative;
		width:100%;
		margin-bottom:15px;
		@media (max-width: 767px) {
			:nth-of-type(odd) {
				margin-bottom:15px
			}
		}
		[class*='control'] {
			border: none;
			border-radius: 0;
		}
		[class*='ValueContainer'],
		[class*='-menu'] {
			font-size: .9375em;
			text-transform: capitalize;
		}
		[class*='-placeholder'] {
			color: ${(props) => props.theme.grey2};
		}
	}
	@media (min-width: 576px) {
		padding:15px 15px 0;
		label {
			width:49%;
			margin-bottom:0;
		}
	}
	@media (min-width: 768px) {
		padding:15px;
		label {
			width:32%;
			:first-child {
				margin-bottom:15px;
			}
		}
	}
	@media (min-width: 992px){
		padding:30px;
		label {
			:first-child {
				margin-bottom:20px;
			}
		}
	}
`;

const STourFilterPrice = styled.label`
	top: -5px;
	[name*='price'] {
		position: absolute;
		top: 100%;
		left: 0;
		padding: 0;
	}
`;

const STourFilterTitle = styled.div`
	${flex({ justify: 'space-between' })};
	font-size: .85em;
  color: #fff;
  @media (min-width: 992px) {
		font-size: .9375em;
	}
`;

export default TourFilter;
