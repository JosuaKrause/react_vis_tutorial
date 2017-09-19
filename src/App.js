import React, { PureComponent } from 'react';
import styled from 'styled-components';
import BarChart from './BarChart.js';
import Scatterplot from './Scatterplot.js';
import DataLoader from './DataLoader.js';

const CenterV = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
`

const CenterH = styled.div`
  display: flex;
  justify-content: center;
`

class App extends PureComponent {
  render() {
    return (
      <CenterV>
        <CenterH>
          <DataLoader>
            <BarChart />
            <Scatterplot />
          </DataLoader>
        </CenterH>
      </CenterV>
    );
  }
} // App

export default App;
