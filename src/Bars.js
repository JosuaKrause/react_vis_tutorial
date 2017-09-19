import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import AnimatedRect from './AnimatedRect.js';
import { columnSum, registerSetAction } from './util.js';

const BarRect = styled.rect`
  stroke: black;
  stroke-width: 0.5;
  fill: ${({ theme: { colors }, ix }) => colors[ix % colors.length]};
`

const MouseRect = styled.rect`
  pointer-events: all;
  fill: none;
  cursor: pointer;
  &:hover {
    fill: black;
    opacity: 0.1;
  }
`

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
            <AnimatedRect key={ix} x={x} width={dx} y={y} height={prevY - y}>
              <BarRect ix={ix} />
            </AnimatedRect>
          );
        })
      }
      </g>
    );
  }
} // Stack

class Bars extends PureComponent {
  componentWillMount() {
    this.propsToState({}, this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.propsToState(this.props, nextProps);
  }

  propsToState(props, nextProps) {
    const { values, w, h, setPercentage, isPercentage } = nextProps;
    if(props.setPercentage !== setPercentage) {
      const that = this;
      const onClick = () => setPercentage(!that.props.isPercentage);
      this.setState({ onClick });
    }
    if(props.values !== values || props.w !== w) {
      const dx = w / values.length;
      const xs = values.map((_, ix) => ix * dx);
      this.setState({ dx, xs });
    }
    if(props.values !== values || props.h !== h
        || props.isPercentage !== isPercentage) {
      const isp = isPercentage;
      const amax = isp ? 0 : values.reduce((p, vals) =>
        Math.max(p, columnSum(vals)), 0);
      const yss = values.map((vals) => {
        const cmax = isp ? columnSum(vals) : 0;
        const max = isp ? cmax : amax;
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
    const { dx, xs, yss, onClick } = this.state;
    return (
      <g>
        {
          xs.map((x, ix) => (
            <g key={ix}>
              <Stack x={x} dx={dx} ys={yss[ix]} h={h} />
              <MouseRect x={x} width={dx} y={0} height={h}
                onClick={onClick} />
            </g>
          ))
        }
      </g>
    );
  }
} // Bars

export default connect(
  null,
  (dispatch) => ({
    setPercentage: registerSetAction("isPercentage", dispatch),
  })
)(Bars);
