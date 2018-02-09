/* eslint-disable */
import React from 'react';
import axios from 'axios';
import { LineSeries, XAxis, YAxis } from '@data-ui/xy-chart';
import { allColors } from '@data-ui/theme/build/color';
import XYChart, { formatYear } from './ResponsiveXYChart';
import mockResponse from './MockSupersetResponse';


const formattedData = mockResponse.data.map(d => ({
  data: d.values,
  key: d.key[0],
  stroke: allColors.blue[9],
  showPoints: false,
  dashType: 'solid',
  seriesKey: d.key[0],
}));

const seriesProps = formattedData;

export default class SupersetChart extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      form_data: {},
      cache_key: '',
      query: null,
      status: null,
      stackstrace: null,
      rowcount: null,
      cache_timeout: -1,
      cached_dttm: null,
      error: null,
      propData: null,
    };
  }

  componentDidMount() {
    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
          "TOM_ACCESS_KEY": 'some_key',
      }
    };
    axios.get('http://localhost:8088/superset/explore_json/table/2/?form_data=%7B%22datasource%22%3A%222__table%22%2C%22viz_type%22%3A%22line%22%2C%22slice_id%22%3A977%2C%22granularity_sqla%22%3Anull%2C%22time_grain_sqla%22%3Anull%2C%22since%22%3A%221960-01-01%22%2C%22until%22%3A%222014-01-02%22%2C%22metrics%22%3A%5B%22sum__SP_POP_TOTL%22%5D%2C%22groupby%22%3A%5B%22country_name%22%5D%2C%22limit%22%3A%2225%22%2C%22timeseries_limit_metric%22%3Anull%2C%22order_desc%22%3Atrue%2C%22color_scheme%22%3A%22bnbColors%22%2C%22show_brush%22%3Atrue%2C%22show_legend%22%3Atrue%2C%22rich_tooltip%22%3Atrue%2C%22show_markers%22%3Afalse%2C%22line_interpolation%22%3A%22linear%22%2C%22contribution%22%3Afalse%2C%22x_axis_label%22%3A%22%22%2C%22bottom_margin%22%3A%22auto%22%2C%22x_axis_showminmax%22%3Atrue%2C%22x_axis_format%22%3A%22smart_date%22%2C%22y_axis_label%22%3A%22%22%2C%22left_margin%22%3A%22auto%22%2C%22y_axis_showminmax%22%3Atrue%2C%22y_log_scale%22%3Afalse%2C%22y_axis_format%22%3A%22.3s%22%2C%22y_axis_bounds%22%3A%5Bnull%2Cnull%5D%2C%22rolling_type%22%3A%22None%22%2C%22time_compare%22%3Anull%2C%22num_period_compare%22%3A%2210%22%2C%22period_ratio_type%22%3A%22growth%22%2C%22resample_how%22%3Anull%2C%22resample_rule%22%3Anull%2C%22resample_fillmethod%22%3Anull%2C%22annotation_layers%22%3A%5B%5D%2C%22where%22%3A%22%22%2C%22having%22%3A%22%22%2C%22filters%22%3A%5B%5D%7D', {}, axiosConfig)
      .then(res => {
        const propData = res.data.data.map(d => ({
          data: d.values,
          key: d.key[0],
          stroke: allColors.blue[9],
          showPoints: false,
          dashType: 'solid',
          seriesKey: d.key[0],
        }));
        this.setState({ propData });
      });
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <XYChart
          xScale={{ type: 'time' }}
          yScale={{ type: 'linear' }}>
          <XAxis label="Time" numTicks={5} />
          <YAxis label="Stock price ($)" numTicks={4} />
          <LineSeries {...formattedData[0]} />
          {this.state.propData && <LineSeries {...this.state.propData[1]} />}
        </XYChart>
      </div>
    );
  }
}
