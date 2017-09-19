import React, { PureComponent } from 'react';
import { withTheme } from 'styled-components';
import { maxs } from './util.js';

class Plot extends PureComponent {
  componentWillMount() {
    this.propsToState({}, this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.propsToState(this.props, nextProps);
  }

  propsToState(props, nextProps) {
    const { values, w, h, projectionTheme: { size } } = nextProps;
    if(props.values !== values || props.w !== w
        || props.h !== h || props.size !== size) {
      const [ maxX, maxY ] = maxs(values);
      const s = size * 1.5;
      const scaleX = (x) => +x * (w - s * 2) / maxX + s;
      const scaleY = (y) => h - +y * (h - s * 2) / maxY + s;
      this.setState({ scaleX, scaleY });
    }
  }

  draw() {
    const { ctx, values, projectionTheme: { size, color } } = this.props;
    const { scaleX, scaleY } = this.state;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    let px = null;
    let py = null;
    values.forEach((vals) => {
      const [ rx, ry ] = vals;
      const x = scaleX(rx);
      const y = scaleY(ry);
      if(px !== null && py !== null) {
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.arc(x, y, size, 0, 2 * Math.PI, false);
      ctx.fill();
      px = x;
      py = y;
    });
  }

  render() {
    const { ctx, w, h, upscale } = this.props;
    if(!ctx) return null;
    ctx.save();

    ctx.scale(upscale, upscale);

    ctx.save();
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeRect(0, 0, w, h);
    ctx.restore();

    ctx.save();
    this.draw();
    ctx.restore();

    ctx.restore();
    return null;
  }
} // Plot

class Scatterplot extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ctx: null,
    };
  }

  setRef = (ref) => {
    this.setState({
      ctx: ref && ref.getContext("2d", {
        alpha: false,
      }),
    });
  }

  render() {
    const { theme: { width, height, projection }, values } = this.props;
    const { ctx } = this.state;
    const upscale = 2;
    const uw = width * upscale;
    const uh = height * upscale;
    return (
      <canvas width={uw} height={uh} style={{
            width: `${width}px`,
            height: `${height}px`,
            display: "block",
            overflow: "hidden",
          }} ref={this.setRef}>
        <Plot ctx={ctx} values={values} projectionTheme={projection}
          w={width} h={height} upscale={upscale} />
      </canvas>
    );
  }
} // Scatterplot

export default withTheme(Scatterplot);
