import React, { useContext, useEffect, useRef } from 'react';
import { VectorMap } from '@south-paw/react-vector-maps';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled, { ThemeContext } from 'styled-components';
import { setCurrentFilter } from '../actions/actionCreators';
import CountryCard from '../components/CountryCard';
// @ts-ignore
import worldMap from '../utils/world.json';

const HomePage: React.FC = () => {
  const width = window.innerWidth;
  let mapComponent;

  if (width >= 1200) {
    const theme = useContext(ThemeContext);
    const svgMapWrapper = useRef<HTMLDivElement>(null);
    const tooltipEl = useRef<HTMLSpanElement>(null);
    const history = useHistory();
    const dispatch = useDispatch();
    let correctingCoef: number; // see useEffect()

    const layerProps = {
      onMouseEnter: (e: any) => {
        if (tooltipEl.current) {
          const tooltip = tooltipEl.current;
          const pathBox = e.target.getBBox();
          let leftValue;
          let topValue;
          if (pathBox.width > 150 && pathBox.height > 150) {
            /*
            * pathBox is country, if pathBox's width && height > 150 - tooltip position will be
            * in center of pathBox
            */
            leftValue = `${(pathBox.x + pathBox.width / 2) * correctingCoef - tooltip.clientWidth / 2}px`;
            topValue = `${(pathBox.y + pathBox.height / 2) * correctingCoef - tooltip.clientHeight / 2}px`;
          } else {
            // other way (for small countries) tooltip position will be right from pathBox
            leftValue = `${(pathBox.x + pathBox.width) * correctingCoef}px`;
            topValue = `${pathBox.y * correctingCoef}px`;
          }

          tooltip.style.left = leftValue;
          tooltip.style.top = topValue;
          tooltip.innerHTML = e.target.attributes.name.value;
          tooltip.style.visibility = 'visible';
        }
      },
      onMouseLeave: (e: any) => {
        if (tooltipEl.current) {
          tooltipEl.current.style.visibility = 'hidden';
        }
      },
      onClick: (e: any) => {
        const isChecked: string = e.target.attributes['aria-checked'].value;
        const destination: string = e.target.attributes['aria-label'].value;
        if (isChecked === 'true') {
          dispatch(setCurrentFilter({ destination }));
          history.push('/tours');
        }
      },
    };

    useEffect(() => {
      const svgMap = document.querySelector('[aria-label=World]');
      // @ts-ignore
      const viewBoxVal = svgMap.attributes.viewBox.value;
      const viewBoxWidth = viewBoxVal.split(' ')[2];

      if (svgMapWrapper.current) {
        const mapWidth = svgMapWrapper.current.clientWidth;
        correctingCoef = mapWidth / viewBoxWidth;
      }
    }, []);

    mapComponent = (
      <div ref={svgMapWrapper} style={{ position: 'relative' }}>
        <span
          ref={tooltipEl}
          style={{
            position: 'absolute',
            backgroundColor: '#fff',
            padding: '5px 10px',
            border: `2px solid ${theme.blue}`,
            zIndex: 999999,
            visibility: 'hidden', // will be changed to 'visible' on mouse enter event (see const layerProps)
          }}
        />
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <SVectorMap {...worldMap} layerProps={layerProps} checkedLayers={['eg', 'tr', 'id']} />
      </div>
    );
  } else {
    const countries = ['Egypt', 'Turkey', 'Indonesia'];
    mapComponent = (
      <div className="row" style={{ marginBottom: -40 }}>
        {
          countries.map((item: string) => <CountryCard key={item} country={item} />)
        }
      </div>
    );
  }

  return (
    <div className="col-12">
      <p style={{ marginBottom: 15 }}>
        Now our destinations are Turkey, Egypt and Indonesia. To see all tours go
        {' '}
        <SLink to="/tours">Tours</SLink>
        {' '}
        page or click one of the available countries to see its tours.
      </p>

      {mapComponent}

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

const SVectorMap = styled(VectorMap)`
  position:relative;
  path {
    fill: ${(props) => props.theme.lightGrey};
    stroke: #000;
    outline: none;
    &:hover {
      fill: ${(props) => props.theme.lightBlue};
    }
    &[aria-checked='true'] {
      fill: ${(props) => props.theme.blue2};
      cursor: pointer;
    }
  }
`;

export default HomePage;
