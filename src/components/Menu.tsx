import React from "react";
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {flex} from '../utils/styled-components';

const menu = [
	{
		name: 'Home',
		url: '/'
	},
	{
		name: 'Destinations',
		url: '/destinations.html'
	}
];

const Menu: React.FC = () => {

	return (
			<nav className="navigation">
				<SMenuWrapper>
					{
						menu.map(item => (
								<li key={item.name}>
									<SLink to={item.url}>{item.name}</SLink>
								</li>
						))
					}
					{/*<li className="menu__item">*/}
					{/*	<Link to="/" className="menu__link menu__link--active">Home</Link>*/}
					{/*</li>*/}
				</SMenuWrapper>
			</nav>
	)
};

const SMenuWrapper = styled.ul`
	${flex({justify: 'center'})};
	font-family:"Poppins",sans-serif;
	li {
		padding:10px 20px;
	}
`;

const SLink = styled(Link)`
  position:relative;
	display:block;
	font-size:1em;
	font-weight:400;
	color: ${props => props.theme.darkGrey};
	text-decoration:none;
	transition:all 0.2s;
	@media (min-width: 768px) {
		font-size:1.25em
	}
	:hover, :focus {
		color: ${props => props.theme.blue2};
	}
`;

export default Menu;

