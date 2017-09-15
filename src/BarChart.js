import React, { PureComponent } from 'react';
import styled, { withTheme } from 'styled-components';

const Svg = styled.svg`
  width: ${({ theme }) => theme.width}px;
  height: ${({ theme }) => theme.height}px;
`

const Rect = styled.rect`
  stroke: black;
  stroke-width: 0.5;
  fill: none;
`

class BarChart extends PureComponent {
  render() {
    const { theme } = this.props;
    const { width, height } = theme;
    return (
      <Svg width={width} height={height}>
        <Rect x={0} y={0} width={width} height={height} />
      </Svg>
    );
  }
} // BarChart

export default withTheme(BarChart);
