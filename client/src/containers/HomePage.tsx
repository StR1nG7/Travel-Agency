import React, {
 useContext, useEffect, useRef, useState,
} from 'react';
import { VectorMap } from '@south-paw/react-vector-maps';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled, { ThemeContext } from 'styled-components';
import { setCurrentFilter } from '../actions/toursPage';
import CountryCard from '../components/CountryCard';
// @ts-ignore
import worldMap from '../utils/world.json';

const HomePage: React.FC = () => {
  const theme = useContext(ThemeContext);
  const svgMapWrapper = useRef<HTMLDivElement>(null);
  const tooltipEl = useRef<HTMLSpanElement>(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const [correctingCoef, setcorrectingCoef] = useState(1);
  const width = window.innerWidth;
  let mapComponent: React.ReactComponentElement<'div'>;

  useEffect(() => {
    const svgMap = document.querySelector('[aria-label=World]');
    const viewBoxVal = svgMap?.attributes.getNamedItem('viewBox')?.value || '';
    const viewBoxWidth = viewBoxVal.split(' ')[2];

    if (svgMapWrapper.current) {
      const mapWidth = svgMapWrapper.current.clientWidth;
      const coef = mapWidth / +viewBoxWidth;
      setcorrectingCoef(coef);
    }
  }, []);

  if (width >= 1200) {
    const layerProps = {
      onMouseEnter: (e: React.MouseEvent) => {
        if (tooltipEl.current) {
          const tooltip = tooltipEl.current;
          const pathBox = (e.target as SVGPathElement).getBBox();
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
          tooltip.innerHTML = (e.target as SVGPathElement).attributes.getNamedItem('name')?.value || '';
          tooltip.style.visibility = 'visible';
        }
      },
      onMouseLeave: () => {
        if (tooltipEl.current) {
          tooltipEl.current.style.visibility = 'hidden';
        }
      },
      onClick: (e: React.MouseEvent) => {
        const isChecked: string = (e.target as SVGPathElement).attributes.getNamedItem('aria-checked')?.value || '';
        const destination: string = (e.target as SVGPathElement).attributes.getNamedItem('aria-label')?.value || '';
        if (isChecked === 'true') {
          dispatch(setCurrentFilter({ destination }));
          history.push('/tours');
        }
      },
    };

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
