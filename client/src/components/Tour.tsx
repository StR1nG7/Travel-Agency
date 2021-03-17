import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { flex } from '../utils/styled-components';
import { ITour } from '../actions/toursPage';

import ImageWithWebp from './ImageWithWebp';

const Tour: React.FC<ITour> = (
    {
      id,
      title,
      from,
      destination,
      period,
      persons,
      hotels,
      price,
    },
) => {
  const starsGroups: Array<ReactElement> = [];
  const stars: Array<Array<ReactElement>> = [];
  if (hotels) {
    for (let i = 0; i < hotels.length; i++) {
      stars[i] = [];
      for (let j = 1; j <= +hotels[i]; j++) {
        stars[i].push(<i className="mdi mdi-star" key={j} />);
      }
      starsGroups.push(<div key={i}>{stars[i]}</div>);
    }
  }

  const replacedTitle = title.replace(/ /g, '');

  return (
    <div className="col-12 col-sm-6 col-lg-4">
      <STourWrapper>
        <div style={{ position: 'relative' }}>
          <Link to={`/tours/${id}`}>
            <ImageWithWebp
              srcWebp={`/public/img/${replacedTitle}.webp`}
              fallback={`/public/img/${replacedTitle}.jpg`}
              alt="Tour"
              style={{ width: '100%' }}
            />
          </Link>
          <STourPrice>
            <h5 style={{ marginBottom: 0, fontWeight: 500, color: '#fff' }}>
              $
              {price}
            </h5>
            /tour
          </STourPrice>
        </div>
        <STourCaption>
          <STourTitleWrapper>
            <h4 style={{ marginRight: 25, marginBottom: 0, lineHeight: 1.2 }}>
              <STourTitle to={`/tours/${id}`}>{title}</STourTitle>
            </h4>
            <STourLocation>{destination}</STourLocation>
            <div style={{ fontSize: '0.9375em' }}>
              {'From: '}
              {from && from.join(', ')}
            </div>
            <div style={{ fontSize: '0.9375em' }}>
              {persons}
              {' '}
              persons
            </div>
          </STourTitleWrapper>
          <STourDaysWrapper>
            <STourDays>
              <span style={{ marginRight: 10 }}>
                {period}
                {' '}
                Days
              </span>
            </STourDays>
            <SRating>
              {starsGroups}
            </SRating>
          </STourDaysWrapper>
        </STourCaption>
      </STourWrapper>
    </div>
  );
};

const STourWrapper = styled.div`
	${flex({ direction: 'column', justify: 'space-between' })};
	margin-top:20px;
  height:calc(100% - 30px);
  
  @media (min-width: 768px) {
  	min-height:400px;
  	margin-top:25px;
  }
  @media (min-width: 992px) {
  	margin-top:30px;
  }
`;

const STourCaption = styled.div`
	${flex({ direction: 'column', align: 'flex-start' })};
	width:100%;
	height:100%;
	padding: 35px 15px 15px;
	border:1px solid ${(props) => props.theme.grey};
  
  @media (min-width: 768px) {
  	flex-flow: row nowrap;
  	justify-content: space-between;
  	align-items: center;
  	padding: 35px 20px 25px;
  }
  @media (min-width: 992px) {
  	padding: 35px 15px 15px;
  }
`;

const STourTitleWrapper = styled.div`
	${flex({ direction: 'column', align: 'flex-start' })}
`;

const STourTitle = styled(Link)`
	color: #222831;
`;

const STourPrice = styled.div`
	${flex({})};
	position:absolute;
	top:100%;
	left:50%;
  transform:translate(-50%, -50%);
  height:45px;
  padding:0 20px;
  color:#fff;
  background-color: ${(props) => props.theme.blue2};
  border-radius:23px;
`;

const STourLocation = styled.div`
	margin-bottom:15px;
	font-size:0.9375em;
	::before {
		content:'\\f34e';
		margin-right:5px;
		font-family:'Material Design Icons';
		font-size:0.8em;
		color: ${(props) => props.theme.grey2};
	}
`;

const STourDaysWrapper = styled.div`
	${flex({})};
	width:100%;
	margin-top:15px;
	padding:5px 0;
	font-size:0.9375em;
	@media (min-width: 768px) {
		flex: 0 0 auto;
  	flex-flow: column nowrap;
  	justify-content: flex-start;
  	align-items: flex-start;
  	width:auto;
  	margin-top:20px;
  	padding:10px 0 10px 10px;
  	border-left:1px solid ${(props) => props.theme.grey};
  }
`;

const STourDays = styled.div`
	margin-right:10px;
	line-height:1.3em;
	@media (min-width: 768px) {
		margin-right:0;
  }
`;

const SRating = styled.div`
	display:none;
	@media (min-width: 768px) {
		${flex({ direction: 'column', align: 'flex-start' })}
  }
  i {
  	color: ${(props) => props.theme.yellow};
  	font-size:0.8125em;
  	:not(:last-child) {
  		margin-right:5px;
  	}
	}
`;

export default Tour;
