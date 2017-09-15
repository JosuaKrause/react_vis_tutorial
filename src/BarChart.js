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

class Bars extends PureComponent {
  render() {
    const { values, w, h } = this.props;
    return (
      <text x={w * 0.5} y={h * 0.5}>{values.length}</text>
    );
  }
} // Bars

class BarChart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      values: [],
    };
    this.unmounted = false;
  }

  componentDidMount() {
    fetch(`${window.PUBLIC_URL}/data.json`).then((data) => {
      // TODO do error checking etc.
      return data.json();
    }).then((data) => {
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
    const { theme: { width, height } } = this.props;
    const { values } = this.state;
    return (
      <Svg width={width} height={height}>
        <Rect x={0} y={0} width={width} height={height} />
        <Bars values={values} w={width} h={height} />
      </Svg>
    );
  }
} // BarChart

export default withTheme(BarChart);
