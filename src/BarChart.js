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

function doFetch(url, cb) {
  fetch(`${window.PUBLIC_URL}${url}`).then((data) => {
    if(data.status !== 200 || !data.ok) {
      throw new Error(`server returned ${data.status}${data.ok ? " ok" : ""}`);
    }
    const ct = data.headers.get("content-type");
    if(ct && ct.includes("application/json")) {
      return data.json();
    }
    throw new TypeError("response not JSON encoded");
  }).then(cb);
} // doFetch

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
