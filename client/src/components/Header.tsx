import React from 'react';
import styled from 'styled-components';

import { flex } from '../utils/styled-components';

import Menu from './Menu';

const Header: React.FC = () => (
  <SHeader>
    <div className="container">
      <div className="row">
        <SHeaderInner className="col-12">
          <h2>Travel Agency</h2>
          <Menu />
        </SHeaderInner>
      </div>
    </div>
  </SHeader>
);

const SHeader = styled.div`
	padding: 70px 0;
  @media (min-width: 768px) {
  	padding: 80px 0;
  }
  @media (min-width: 992px) {
  	padding: 90px 0;
  }
  .webp & {
  	background: url('../assets/img/banner.webp') right center no-repeat; 
  }
  .no-webp & {
  	background: url('../assets/img/banner.jpg') right center no-repeat;
  }
`;

const SHeaderInner = styled.div`
	${flex({ direction: 'column' })};
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

export default Header;
