import React from "react";
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {flex} from '../utils/styled-components';

const TitlePanel: React.FC = () => {
	return (
			<STitleWrapper>
				<div className="container">
					<div className="row">
						<STitleInner className="col-12 col-sm-8 mx-auto">
							<h2>Our Tours</h2>
							<SBreadcrumbs>
								<li><Link to="/">Home</Link></li>
								<li><Link to="#">Tours</Link></li>
							</SBreadcrumbs>
						</STitleInner>
					</div>
				</div>
			</STitleWrapper>
	)
};

const STitleWrapper = styled.div`
	padding: 70px 0;
  @media (min-width: 768px) {
  	padding: 80px 0;
  }
  @media (min-width: 992px) {
  	padding: 90px 0;
  }
  .webp & {
  	background: url('/public/img/banner.webp') right center no-repeat;
  }
  .no-webp & {
  	background: url('/public/img/banner.jpg') right center no-repeat;
  }
`;

const STitleInner = styled.div`
	${flex({direction: 'column'})};
	padding: 20px 0;
	background-color: #fff;
  @media (min-width: 768px) {
  	padding: 30px 0;
  }
  @media (min-width: 992px) {
  	padding: 40px 0;
  }
  h2 {
		margin-bottom: 15px;
		font-size: 1.8em;
		font-weight: 300;
		text-transform: capitalize;
		@media (min-width: 768px) {
			margin-bottom: 20px;
			font-size: 2.6em;
		}
		@media (min-width: 992px) {
			font-size: 3.75em;
		}
  }
`;

const SBreadcrumbs = styled.ul`
	${flex({wrap: 'wrap', align: 'flex-start'})};
  @media (max-width: 768px) {
  	justify-content: center;
  }
	li {
		position:relative;
		:not(:last-child) {
			margin-right: 20px;
			::after {
				position: absolute;
				top: 40%;
				right: -14px;
				content: '';
  			width: 6px;
  			height: 6px;
  			background-color: ${props => props.theme.darkGrey};
  			border-radius: 50%;
			}
		}
	}
	a {
		color: ${props => props.theme.darkGrey};
		font-family: "Raleway",sans-serif;
		font-size: 0.875em;
  	text-decoration: none;
  	:hover, :focus {
  		text-decoration: underline;
  	}
	}
`;

export default TitlePanel;
