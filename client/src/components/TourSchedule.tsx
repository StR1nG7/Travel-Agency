import React from 'react';
import styled from 'styled-components';

import { ITour } from '../actions/toursPage';

import TourScheduleDay from './TourScheduleDay';

interface ITourScheduleProps {
  schedule: ITour['schedule'],
}

const TourSchedule: React.FC<ITourScheduleProps> = ({ schedule }) => (
  <div>
    <STourSchedule>Tour Schedule</STourSchedule>
    {
      schedule && schedule.map((item, index) => (
        <TourScheduleDay key={item.day} item={item} index={index} />
      ))
    }
  </div>
);

const STourSchedule = styled.h3`
  margin-bottom: 10px;
  @media (min-width: 768px) {
    margin-bottom: 25px;
  }
`;

export default TourSchedule;
