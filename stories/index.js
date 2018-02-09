import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import fetch from 'node-fetch';

import LineSeriesExamples from '../components/LineSeriesExamples'
import LineGraph from '../components/LineGraph'

import {
  Sparkline,
  LineSeries,
  HorizontalReferenceLine,
  BandLine,
  PatternLines,
  PointSeries } from '@data-ui/sparkline';

import { allColors } from '@data-ui/theme'; // open-color colors

const data = Array(25).fill().map(Math.random);

storiesOf('Button', module)
  .add('Superset Graph', () => (
    <LineGraph/>
  ))
  .add('Data UI Mock Line Series', () => (
    <LineSeriesExamples/>
  ))
  .add('Test Sparkline', () => (
    <Sparkline
      ariaLabel="A line graph of randomly-generated data"
      margin={{
 top: 24, right: 64, bottom: 24, left: 64,
}}
      width={500}
      height={100}
      data={data}
      valueAccessor={datum => datum}
    >
      {/* this creates a <defs> referenced for fill */}
      <PatternLines
        id="unique_pattern_id"
        height={6}
        width={6}
        stroke={allColors.grape[6]}
        strokeWidth={1}
        orientation={['diagonal']}
      />
      {/* display innerquartiles of the data */}
      <BandLine
        band="innerquartiles"
        fill="url(#unique_pattern_id)"
      />
      {/* display the median */}
      <HorizontalReferenceLine
        stroke={allColors.grape[8]}
        strokeWidth={1}
        strokeDasharray="4 4"
        reference="median"
      />
      {/* Series children are passed the data from the parent Sparkline */}
      <LineSeries
        showArea={false}
        stroke={allColors.grape[7]}
      />
      <PointSeries
        points={['min', 'max']}
        fill={allColors.grape[3]}
        size={5}
        stroke="#fff"
        renderLabel={val => val.toFixed(2)}
      />
    </Sparkline>
  ));
