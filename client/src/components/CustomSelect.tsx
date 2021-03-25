import React, { ReactElement } from 'react';
import Select from 'react-select';

import { TOptionOrNull } from '../containers/TourFilterContainer';
import { IOption } from '../actions/filterOptions';

interface ICustomSelectProps {
	id: string,
	options: Array<IOption>,
	handleSelectChange: (option: TOptionOrNull) => void,
	handleSelectBlur: () => void,
	value: TOptionOrNull,
	placeholder: ReactElement
}

const CustomSelect: React.FC<ICustomSelectProps> = React.memo(({
	id,
	options,
	handleSelectChange,
	handleSelectBlur,
	value,
	placeholder,
}) => (
	// eslint-disable-next-line jsx-a11y/label-has-associated-control
  <label>
    <Select
      id={id}
      name={id}
      options={options}
      onChange={handleSelectChange}
      onBlur={handleSelectBlur}
      value={value}
      placeholder={placeholder}
    />
  </label>
));

export default CustomSelect;
