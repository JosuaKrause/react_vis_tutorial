import React, { PureComponent } from 'react';
import styled from 'styled-components';

const Svg = styled.svg`
  width: 300px;
  height: 150px;
`

const Rect = styled.rect`
  stroke: black;
  stroke-width: 0.5;
  fill: none;
`

class BarChart extends PureComponent {
  render() {
    return (
      <Svg width={300} height={150}>
        <Rect x={0} y={0} width={300} height={150} />
      </Svg>
    );
  }
} // BarChart

export default BarChart;
