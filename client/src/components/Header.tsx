import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import Menu from './Menu';

const Header: React.FC = () => {
	const theme = useContext(ThemeContext);

	return (
  <header style={{ fontFamily: 'Poppins,sans-serif' }}>
    <div className="container">
      <div className="row">
        <div className="col-12" style={{ borderBottom: `1px solid ${theme.grey2}` }}>
          <h1 style={{ textAlign: 'center' }}>Travel Agency</h1>
        </div>

        <div className="col-12">
          <Menu />
        </div>
      </div>
    </div>
  </header>
	);
};

export default Header;
