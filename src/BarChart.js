import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled, { withTheme } from 'styled-components';
import Bars from './Bars.js';
import { doFetch } from './util.js';

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
  constructor(props) {
    super(props);
    this.state = {
      values: [],
    };
    this.unmounted = false;
  }

  componentDidMount() {
    doFetch("/data.json", (data) => {
      if(this.unmounted) return;
      this.setState({
        values: data["values"],
      });
    });
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  render() {
    const { theme: { width, height }, isPercentage } = this.props;
    const { values } = this.state;
    return (
      <Svg width={width} height={height}>
        <Rect x={0} y={0} width={width} height={height} />
        <Bars values={values} isPercentage={isPercentage}
          w={width} h={height} />
      </Svg>
    );
  }
} // BarChart

export default withTheme(connect(
  ({ isPercentage }) => ({ isPercentage })
)(BarChart));
