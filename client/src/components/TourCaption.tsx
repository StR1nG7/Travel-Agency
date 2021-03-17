import React from 'react';
import styled from 'styled-components';

import { flex } from '../utils/styled-components';

interface ITourCaptionProps {
  price: number,
  destination: string,
}

const TourCaption: React.FC<ITourCaptionProps> = ({ price, destination }) => (
  <STourCaption>
    <STourPriceWrapper>
      <STourPrice className="tour__price--icon">
        <h5>
          $
          {price}
        </h5>
        /tour
      </STourPrice>
      <STourDestination>{destination}</STourDestination>
    </STourPriceWrapper>
  </STourCaption>
);

const STourCaption = styled.div`
  margin-bottom: 15px;
  @media (min-width: 768px) {
    margin-bottom: 25px;
  }
`;

const STourPriceWrapper = styled.div`
  ${flex({ wrap: 'wrap' })};
`;

const STourPrice = styled.div`
  position:relative;
  top:0;
  left:0;
  ${flex({ wrap: 'wrap' })};
  transform:translate(0, 0);
  margin-right:30px;
  font-size:0.9375em;
  color:inherit;
  ::before {
    content:url('/public/img/wallet.png');
    height:30px;
    margin-right:10px;
  }
  h5 {
    margin-bottom:0;
    font-weight:500;
    color: ${(props) => props.theme.blue2};
  }
`;

const STourDestination = styled.div`
  font-size: 0.9375em;
  ::before {
    content: '\\f34e';
    margin-right: 5px;
    font-family: 'Material Design Icons';
    font-size: 0.8em;
    color: #929aab;
  }
`;

export default TourCaption;
