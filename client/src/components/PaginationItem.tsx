import React from 'react';
import styled from 'styled-components';

interface IPaginationItemProps {
	number: number,
	currentPage: number,
	handleClick: () => void
}

const PaginationItem: React.FC<IPaginationItemProps> = ({ number, currentPage, handleClick }) => (
  <SPaginationItemWrapper current={number === currentPage} onClick={handleClick}>
    {number}
  </SPaginationItemWrapper>
);

interface IPaginationItemWrapper {
	current: boolean;
}

const SPaginationItemWrapper = styled.span<IPaginationItemWrapper>`
	font-family:"Poppins",sans-serif;
	font-size:1em;
	color: ${(props) => (props.current ?	props.theme.blue : props.theme.darkGrey)};
	font-weight: ${(props) => (props.current ? '600' : '400')};
	text-decoration: ${(props) => (props.current ? 'underline' : 'none')};
  cursor:pointer;
  @media (min-width: 768px) {
  	font-size:1.125em;
  }
  :not(:last-child) {
  	margin-right:25px;
  }
  :hover, :focus {
  	text-decoration:underline;
  	color: ${(props) => props.theme.blue};
  }
`;

export default PaginationItem;
