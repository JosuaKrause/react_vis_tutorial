import React, { PureComponent } from 'react';
import { withTheme } from 'styled-components';

class AnimatedRect extends PureComponent {
  constructor(props) {
    super(props);
    this.unmounted = false;
  }

  componentWillMount() {
    this.propsToState({}, this.props);
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  componentWillReceiveProps(nextProps) {
    this.propsToState(this.props, nextProps);
  }

  propsToState(props, nextProps) {
    const { x: fx=null, y: fy=null, width: fw=null, height: fh=null } = props;
    const { x: tx, y: ty, width: tw, height: th } = nextProps;
    if(fx !== tx || fy !== ty || fw !== tw || fh !== th) {
      const pos = {
        x: tx,
        y: ty,
        w: tw,
        h: th,
      };
      if(fx === null || fy === null || fw === null || fh === null) {
        this.setState({
          ...pos,
          initial: true,
        }, () => {
          if(this.unmounted) return;
          this.setState({
            initial: false,
          });
        });
      } else {
        this.setState(pos);
      }
    }
  }

  render() {
    const { theme, children } = this.props;
    const { initial, x, y, w, h } = this.state;
    const child = React.Children.only(children);
    return React.cloneElement(child, {
      x,
      y,
      width: w,
      height: h,
      style: !initial ? theme.transition : null,
    });
  }
} // AnimatedRect

export default withTheme(AnimatedRect);
