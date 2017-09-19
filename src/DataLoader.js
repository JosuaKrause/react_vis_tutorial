import React, { PureComponent } from 'react';
import { doFetch } from './util.js';

class DataLoader extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      values: [],
    };
    this.unmounted = false;
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  componentDidMount() {
    doFetch("/data.json", (data) => {
      if(this.unmounted) return;
      this.setState({
        values: data["values"],
      });
    });
  }

  render() {
    const { children } = this.props;
    const { values } = this.state;
    return (
      <div>
        {
          React.Children.map(children, (child) => React.cloneElement(child, {
            values
          }))
        }
      </div>
    );
  }
} // DataLoader

export default DataLoader
