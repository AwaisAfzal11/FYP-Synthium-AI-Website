import { useEffect, useRef } from 'react';
import ReactSpeedometer from 'react-d3-speedometer';
import * as d3 from 'd3';

const CustomSpeedometer = ({ value }) => (
  <div style={{ textAlign: 'center' }}>
    <ReactSpeedometer
      value={Number(value)}
      minValue={0}
      maxValue={100}
      segments={5}
      segmentColors={['#FF0000', '#FFA500', '#FFD700', '#90EE90', '#008000']}
      needleColor="steelblue"
      needleTransitionDuration={3333}
      needleTransition="easeElastic"
      currentValueText={`Score: ${value}`}
      textColor="white"
    />
  </div>
);

const D3Speedometer = ({ score }) => {
  const ref = useRef();

  useEffect(() => {
    const width = 200;
    const height = 100;
    const innerRadius = 70;
    const outerRadius = 90;
    
    const svg = d3.select(ref.current)
      .attr('width', width)
      .attr('height', height);

    const arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .startAngle(-Math.PI / 2)
      .endAngle(d => -Math.PI / 2 + (d / 100) * Math.PI);

    svg.append('path')
      .datum(100)
      .style('fill', 'grey')
      .attr('d', arc)
      .attr('transform', `translate(${width / 2},${height})`);

    svg.append('path')
      .datum(score)
      .style('fill', d => d > 70 ? 'green' : d > 50 ? 'yellow' : 'red')
      .attr('d', arc)
      .attr('transform', `translate(${width / 2},${height})`);

    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height / 2)
      .attr('text-anchor', 'middle')
      .attr('font-size', '20px')
      .attr('fill', 'white')
      .text(score);

  }, [score]);

  return (
    <svg ref={ref}></svg>
  );
};

export { CustomSpeedometer, D3Speedometer };
