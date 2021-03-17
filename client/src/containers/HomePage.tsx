import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import CountryCardContainer from './CountryCardContainer';
import WorldMap from './WorldMap';

const HomePage: React.FC = () => {
  const width = window.innerWidth;
  const countries = ['Egypt', 'Turkey', 'Indonesia'];

  return (
    <div className="col-12">
      <p style={{ marginBottom: 15 }}>
        Now our destinations are Turkey, Egypt and Indonesia. To see all tours go
        {' '}
        <SLink to="/tours">Tours</SLink>
        {' '}
        page or click one of the available countries to see its tours.
      </p>

      {
        width >= 1200
          ? <WorldMap />
          : (
            <div className="row" style={{ marginBottom: -40 }}>
              {
                countries.map((item: string) => <CountryCardContainer key={item} country={item} />)
              }
            </div>
          )
      }

    </div>
  );
};

const SLink = styled(Link)`
  :link {
    text-decoration: underline;
  }
  :visited {
    color: ${(props) => props.theme.darkGrey};
  }
  :hover, :focus {
    color: ${(props) => props.theme.blue2};
  }
`;

export default HomePage;
