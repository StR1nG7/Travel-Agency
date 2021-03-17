import React from 'react';
import styled from 'styled-components';

import { ITourScheduleDay } from '../actions/toursPage';

import { flex } from '../utils/styled-components';

interface ITourScheduleDayProps {
  item: ITourScheduleDay,
  index: number,
}

const TourScheduleDay: React.FC<ITourScheduleDayProps> = ({ item, index }) => (
  <STourScheduleDay>
    <SDayWrapper>
      <SDay>
        {'Day '}
        {/* eslint-disable-next-line no-param-reassign */}
        {++index}
      </SDay>
    </SDayWrapper>
    <SDayCaption>
      <SDayTitle>{item.title}</SDayTitle>
      <SDayText className="day-text">
        <p>{item.description}</p>
      </SDayText>
    </SDayCaption>
  </STourScheduleDay>
);

const STourScheduleDay = styled.div`
  {${flex({ direction: 'column', align: 'flex-start' })};
  @media (min-width: 576px) {
    flex-flow:row nowrap;
    :not(:nth-of-type(1)) {
      margin-top: -7px;
    }
  }
  :last-child .day-text {
    padding-bottom: 0;
    border: 0;
  }
`;

const SDayWrapper = styled.div`
  padding-right: 15px;
  @media (min-width: 768px) {
    padding-right: 20px;
  }
`;

const SDay = styled.div`
  padding: 5px 15px;
  font-family: "Poppins",sans-serif;
  font-size: 0.8125em;
  text-align: center;
  color: #fff;
  background-color: ${(props) => props.theme.blue2};
  @media (min-width: 576px) {
    width: 90px;
    padding: 5px 0;
  }
`;

const SDayCaption = styled.div`
  margin-top: 10px;
  margin-bottom: 15px;
  @media (min-width: 576px) {
    margin-top:8px;
    margin-bottom:0;
  }
`;

const SDayTitle = styled.h5`
  position:relative;
  margin-bottom:0;
  padding:0 15px;
  font-weight:400;
  ::before {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(-50%, -50%);
    content: '\\f12f';
    font-family: "Material Design Icons";
    font-size: 0.625em;
    color: ${(props) => props.theme.blue2};
  }
`;

const SDayText = styled.div`
  border-left:1px solid #b9b9b9;
  box-sizing:border-box;
  padding: 10px 10px 15px 10px;
  @media (min-width: 768px) {
    padding: 15px 15px 20px 15px;
  }
`;

export default TourScheduleDay;
