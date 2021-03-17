import React from 'react';
import { useDispatch } from 'react-redux';

import useSelector from '../hooks/useSelector';
import { getToursThunkCreator, setCurrentFilter, setCurrentPage } from '../actions/toursPage';
import { IFilterData, IOption } from '../actions/filterOptions';
import { TOptionOrNull } from './TourFilterContainer';

import CustomSelect from '../components/CustomSelect';

interface ICustomSelectProps {
  id: string,
  setFieldValue: (field: string, option: TOptionOrNull) => void,
  setFieldTouched: (field: string, touched: boolean) => void,
  options: Array<IOption>,
  value: TOptionOrNull
}

const CustomSelectContainer: React.FC<ICustomSelectProps> = React.memo(({
  id,
  setFieldValue,
  setFieldTouched,
  options,
  value,
}) => {
  const icons = {
    from: 'mdi-map-marker',
    destination: 'mdi-map-marker',
    period: 'mdi-calendar-month',
    persons: 'mdi-account-multiple',
    hotels: 'mdi-hotel',
  };

  const currentFilters = useSelector((state) => state.toursPage.currentFilters);
  const dispatch = useDispatch();
  const handleSelectChange = (option: TOptionOrNull) => {
    setFieldValue(id, option);
    dispatch(setCurrentFilter({ [id]: option?.value }));
    dispatch(setCurrentPage(1));
    dispatch(getToursThunkCreator({
      page: 1,
      currentFilters: { ...currentFilters, [id]: option?.value },
    }));
  };
  const handleSelectBlur = () => {
    setFieldTouched(id, true);
  };
  const placeholder = (
    <>
      <i className={`mdi ${icons[id as keyof Omit<IFilterData, 'error'>]} `} />
      {' '}
      <span>{id}</span>
    </>
  );

  const selectProps = {
    id, options, handleSelectChange, handleSelectBlur, value, placeholder,
  };

  return (
      // eslint-disable-next-line react/jsx-props-no-spreading
    <CustomSelect {...selectProps} />
  );
});

export default CustomSelectContainer;
