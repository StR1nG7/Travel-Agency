import React from 'react';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import useSelector from '../hooks/useSelector';
import { TOptionOrNull } from './TourFilter';
import { getToursThunkCreator, setCurrentFilter, setCurrentPage } from '../actions/toursPage';
import { IFilterData, IOption } from '../actions/filterOptions';

interface ICustomSelectProps {
	id: string,
	setFieldValue: (field: string, option: TOptionOrNull) => void,
	setFieldTouched: (field: string, touched: boolean) => void,
	options: Array<IOption>,
	value: TOptionOrNull
}

const CustomSelect: React.FC<ICustomSelectProps> = React.memo(({
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
	const handleChange = (option: TOptionOrNull) => {
		setFieldValue(id, option);
		dispatch(setCurrentFilter({ [id]: option?.value }));
		dispatch(setCurrentPage(1));
		dispatch(getToursThunkCreator({
			page: 1,
			currentFilters: { ...currentFilters, [id]: option?.value },
		}));
	};
	const handleBlur = () => {
		setFieldTouched(id, true);
	};

	return (
			// eslint-disable-next-line jsx-a11y/label-has-associated-control
  <label>
    <Select
      id={id}
      options={options}
      onChange={handleChange}
      onBlur={handleBlur}
      value={value}
      placeholder={(
        <>
          <i className={`mdi ${icons[id as keyof Omit<IFilterData, 'error'>]} `} />
          {' '}
          <span>{id}</span>
        </>
      )}
    />
  </label>
	);
});

export default CustomSelect;
