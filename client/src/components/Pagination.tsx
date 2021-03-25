import React, { ReactElement } from 'react';
import styled from 'styled-components';

import { flex } from '../utils/styled-components';

interface IPaginationProps {
  currentPage: number,
  pages: number,
  links: Array<ReactElement>,
  handlePrevClick: () => void,
  handleNextClick: () => void,
}

const Pagination: React.FC<IPaginationProps> = (
{
 currentPage, pages, links, handlePrevClick, handleNextClick,
},
) => (
  <div className="col-sm-8 col-md-6 col-lg-4 mx-auto">
    <SPaginationWrapper data-testid="Pagination">
      <SPrevArrowWrapper>
        { currentPage > 1 && <SPrevArrow aria-label="Prev" className="mdi mdi-arrow-left" onClick={handlePrevClick} />}
      </SPrevArrowWrapper>

      <SPaginationLinks>
        { links }
      </SPaginationLinks>

      <SNextArrowWrapper>
        { currentPage < pages && <SNextArrow aria-label="Next" className="mdi mdi-arrow-right" onClick={handleNextClick} />}
      </SNextArrowWrapper>
    </SPaginationWrapper>
  </div>
);

const SPaginationWrapper = styled.div`
	${flex({ justify: 'center' })};
	height:50px;
	margin-top:20px;
	padding: 0 10px;
	@media (min-width: 576px) {
		margin-top:25px;
		padding: 0;
	}
	@media (min-width: 768px) {
		margin-top:30px;
	}
`;

const SArrowWrapper = styled.div`
	width:52px;
	height:50px;
	background-color: ${(props) => props.theme.lightGrey};
`;

const SPrevArrowWrapper = styled(SArrowWrapper)`
	border-radius:25px 0 0 25px;
`;
const SNextArrowWrapper = styled(SArrowWrapper)`
	border-radius:0 25px 25px 0;
`;

const SArrow = styled.div`
	height:100%;
  line-height:220%;
  padding:0 15px;
  box-sizing:border-box;
  font-size:1.375em;
  color: ${(props) => props.theme.grey};
  background-color: ${(props) => props.theme.lightGrey};
  cursor:pointer;
  transition:all 0.2s;
  :hover, :focus {
  	color:#fff;
  	background-color: ${(props) => props.theme.blue};
  }
`;
const SPrevArrow = styled(SArrow)`
	border-radius:25px 0 0 25px;
`;
const SNextArrow = styled(SArrow)`
	border-radius:0 25px 25px 0;
`;

const SPaginationLinks = styled.div`
	height:100%;
	line-height:47px;
	background-color: ${(props) => props.theme.lightGrey};
	padding:0 20px;
`;

export default Pagination;
