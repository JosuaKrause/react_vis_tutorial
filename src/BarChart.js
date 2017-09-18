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

const BarRect = styled.rect`
  stroke: black;
  stroke-width: 0.5;
  fill: ${({ theme: { colors }, ix }) => colors[ix % colors.length]};
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

class Stack extends PureComponent {
  render() {
    const { x, dx, ys, h } = this.props;
    let lastY = h;
    return (
      <g>
      {
        ys.map((y, ix) => {
          const prevY = lastY;
          lastY = y;
          return (
            <BarRect key={ix} ix={ix} x={x} width={dx}
              y={y} height={prevY - y} />
          );
        })
      }
      </g>
    );
  }
}

class Bars extends PureComponent {
  componentWillMount() {
    this.propsToState({}, this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.propsToState(this.props, nextProps);
  }

  propsToState(props, nextProps) {
    const { values, w, h } = nextProps;
    if(props.values !== values || props.w !== w) {
      const dx = w / values.length;
      const xs = values.map((_, ix) => ix * dx);
      this.setState({ dx, xs });
    }
    if(props.values !== values || props.h !== h) {
      const max = values.reduce((p, vals) =>
        Math.max(p, vals.reduce((pp, v) => pp + +v, 0)), 0);
      const yss = values.map((vals) => {
        let sum = 0;
        return vals.map((v) => {
          sum += +v;
          return h - sum * h / max;
        });
      });
      this.setState({ yss });
    }
  }

  render() {
    const { h } = this.props;
    const { dx, xs, yss } = this.state;
    return (
      <g>
      {
        xs.map((x, ix) => (
          <Stack key={ix} x={x} dx={dx} ys={yss[ix]} h={h} />
        ))
      }
      </g>
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
