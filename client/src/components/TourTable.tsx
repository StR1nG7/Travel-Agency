import React from 'react';
import styled from 'styled-components';

import { flex } from '../utils/styled-components';

interface ITourTableProps {
  period: number,
  destination: string,
  details: string,
  priceIncluded: Array<string>,
}

const TourTable: React.FC<ITourTableProps> = ({
                                                period, destination, details, priceIncluded,
}) => (
  <STourTable className="tour-table">
    <tbody>
      <tr>
        <td>
          <h5>Duration</h5>
        </td>
        <td>
          <h5>
            {period}
            {' Days'}
          </h5>
        </td>
      </tr>
      <tr>
        <td><h5>Destination:</h5></td>
        <td><span>{destination}</span></td>
      </tr>
      <tr>
        <td><h5>Tour Details:</h5></td>
        <td>
          <span>
            {details}
          </span>
        </td>
      </tr>
      <tr>
        <td><h5>Price Included:</h5></td>
        <td>
          <ul>
            {
              priceIncluded.map((item) => <li key={item.slice(0, 5)}>{item}</li>)
            }
          </ul>
        </td>
      </tr>
    </tbody>
  </STourTable>
);

const STourTable = styled.table`
  width: 100%;
  margin-bottom: 25px;
  border-collapse: collapse;
  @media (min-width: 768px) {
    margin-bottom: 30px;
  }
  @media (min-width: 992px) {
    margin-bottom: 35px;
  }
  h4, h5 {
    margin: 0;
  }
  tr {
    border:1px solid #e6e6e6;
    box-sizing:border-box;
    @media (max-width: 575px) {
      :not(:first-child) {
        ${flex({ direction: 'column', align: 'flex-start' })};
      }
    }
  }
  td {
    padding: 10px 0;
    vertical-align: top;
    @media (min-width: 768px) {
      padding: 15px 0;
    }
    :first-child {
      width: 50%;
      padding-left: 20px;
      @media (max-width: 575px) {
        padding-bottom:0;
        width: 100%;
      }
      @media (min-width: 768px){
        width: 34.12%;
      }
    }
    :last-child {
      padding-right: 20px;
      @media (max-width: 575px) {
        width: 100%;
        padding-left: 20px;
      }
    }
  }
  ul {
    font-weight:600;
  }
`;

export default TourTable;
