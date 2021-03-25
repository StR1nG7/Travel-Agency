import React from 'react';
import styled from 'styled-components';

interface ICountryCardProps {
  countryName: string,
  countryData: {
    viewbox: string,
    path: string,
    visa: string,
    languages: string,
    currency: string,
  },
  handleCountryClick: () => void
}

const CountryCard: React.FC<ICountryCardProps> = (
    { countryName, countryData, handleCountryClick },
) => (
  <div className="col-12 col-sm-6 col-lg-4" style={{ marginBottom: 40 }}>
    <SCountryWrapper>
      <SCountry xmlns="http://www.w3.org/2000/svg" viewBox={countryData.viewbox}>
        <path name={countryName} aria-label={`mobilePath-${countryName}`} d={countryData.path} onClick={handleCountryClick} />
      </SCountry>
    </SCountryWrapper>
    <SName>{countryName}</SName>
    <p>
      Visa:
      {` ${countryData.visa}`}
    </p>
    <p>
      Languages spoken:
      {` ${countryData.languages}`}
    </p>
    <p>
      Currency Used:
      {` ${countryData.currency}`}
    </p>
  </div>
);

const SCountryWrapper = styled.div`
  height: 105px;
  @media (min-width: 576px) {
    height: 90px;
  }
  @media (min-width: 768px) {
    height: 124px;
  }
  @media (min-width: 992px) {
    height: 124px;
  }
`;

const SCountry = styled.svg`
  max-height: 105px;
  @media (min-width: 576px) {
    max-height: 90px;
  }
  @media (min-width: 768px) {
    max-height: 124px;
  }
  @media (min-width: 992px) {
    max-height: 124px;
  }
  path {
    fill: ${(props) => props.theme.blue2};
    &:hover {
      fill: ${(props) => props.theme.lightBlue};
    }
  }
`;

const SName = styled.h4`
  margin-top: 10px;
  margin-bottom: 20px;
  text-transform: capitalize;
`;

export default CountryCard;
