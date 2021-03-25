import React from 'react';
import { Field } from 'formik';
import styled from 'styled-components';

import { flex } from '../utils/styled-components';

export interface ITourFilterProps {
  selectComponents: Array<any>,
  minPrice: number,
  maxPrice: number,
  selectedPrice: string,
  handlePriceChange: (e: React.KeyboardEvent<HTMLInputElement>) => void,
}

const TourFilter: React.FC<ITourFilterProps> = ({
 selectComponents, minPrice, maxPrice, selectedPrice, handlePriceChange,
}) => (
  <STourFilterWrapper data-testid="tourFilterForm">

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
        onChange={handlePriceChange}
      />
    </STourFilterPrice>
  </STourFilterWrapper>
);

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
