import React, {
 useContext, useEffect, useRef, useState,
} from 'react';
import styled, { ThemeContext } from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { VectorMap } from '@south-paw/react-vector-maps';

import { setCurrentFilter } from '../actions/toursPage';
// @ts-ignore
import worldMapData from '../utils/world.json';

const WorldMap: React.FC = () => {
  const theme = useContext(ThemeContext);
  const svgMapWrapper = useRef<HTMLDivElement>(null);
  const tooltipEl = useRef<HTMLSpanElement>(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const [correctingCoef, setcorrectingCoef] = useState(1);

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

  return (
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
      <SVectorMap {...worldMapData} layerProps={layerProps} checkedLayers={['eg', 'tr', 'id']} />
    </div>
  );
};

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

export default WorldMap;
