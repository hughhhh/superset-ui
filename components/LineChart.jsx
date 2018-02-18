import React from 'react';

import { LineSeries, XAxis, YAxis } from '@data-ui/xy-chart';
import XYChart from './ResponsiveXYChart';
import SupersetChart from './SupersetChart';

export default class LineChart extends SupersetChart {
  render() {
    return (
      <div style={{ backgroundColor: 'white' }}>
        <XYChart
          xScale={{ type: 'time' }}
          yScale={{ type: 'linear' }}
        >
          <XAxis label="Time" numTicks={5} />
          <YAxis label="Stock price ($)" numTicks={4} />
          {this.state.data.map(props => (
            <LineSeries {...props} disableMouseEvents={false} />
        ))}
        </XYChart>
      </div>
    );
  }
}
