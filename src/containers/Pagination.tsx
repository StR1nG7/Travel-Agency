import React from "react";
import {TOURS_PER_PAGE} from "../constants";
import {getToursThunkCreator, setCurrentPage} from "../actions/actionCreators";
import {useDispatch, useSelector} from "react-redux";
import {TRootState} from "../reducers";
import {IToursPageReducer} from "../reducers/tours";
import PaginationItem from "../components/PaginationItem";
import styled from 'styled-components';
import {flex} from '../utils/styled-components';

const Pagination: React.FC = () => {

	const count = useSelector((state: TRootState) => (state.toursPage as IToursPageReducer).count);
	const currentFilters = useSelector((state: TRootState) => (state.toursPage as IToursPageReducer).currentFilters);
	const currentPage = useSelector((state: TRootState) => (state.toursPage as IToursPageReducer).currentPage);

	const dispatch = useDispatch();
	const handlePagination = (pageNumber: number) => {
		dispatch(setCurrentPage(pageNumber));
		dispatch(getToursThunkCreator({currentFilters: currentFilters, page: pageNumber, size: TOURS_PER_PAGE}));
	};
	const handlePrevClick = () => {
		handlePagination(currentPage - 1);
	};
	const handleNextClick = () => {
		handlePagination(currentPage + 1);
	};

	const pages = Math.ceil(count / TOURS_PER_PAGE);
	const links = [];

	for (let i = 1; i <= pages; i++) {
		links.push(<PaginationItem key={i} number={i} currentPage={currentPage} handleClick={ () => handlePagination(i) }/>)
	}

	return (
			<div className="col-sm-8 col-md-6 col-lg-4 mx-auto">
				<SPaginationWrapper>
					<SPrevArrowWrapper>
						{ currentPage > 1 && <SPrevArrow className="mdi mdi-arrow-left" onClick={handlePrevClick}></SPrevArrow>}
					</SPrevArrowWrapper>

					<SPaginationLinks>
						{ links }
					</SPaginationLinks>

					<SNextArrowWrapper>
						{ currentPage < pages && <SNextArrow className="mdi mdi-arrow-right" onClick={handleNextClick}></SNextArrow>}
					</SNextArrowWrapper>
				</SPaginationWrapper>
			</div>
	)
};

const SPaginationWrapper = styled.div`
	${flex({justify: 'center'})};
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
	background-color: ${props => props.theme.lightGrey};
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
  color: ${props => props.theme.grey};
  background-color: ${props => props.theme.lightGrey};
  cursor:pointer;
  transition:all 0.2s;
  :hover, :focus {
  	color:#fff;
  	background-color: ${props => props.theme.blue};
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
	background-color: ${props => props.theme.lightGrey};
	padding:0 20px;
`;

export default Pagination;
