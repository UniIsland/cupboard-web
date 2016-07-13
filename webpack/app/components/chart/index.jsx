import React from 'react';
import $ from 'jquery';

import Echart from '../echart';

import _config from '_config';

function _arraysEqual(a1, a2) {
  return (a1.length == a2.length) && a1.every((e, i) => e === a2[i]);
}

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      echartOption: {}
    };

    this.currentMetric = null;
    this.currentDimensions = [];
    this.seriesData = {};
  }

  dataToSeries(data) {
    return {
      name: data.dimension || this.context.route_params.metric,
      type: 'line',
      data: data.data.map((d) => ({
        name: d.date,
        value: [d.date, d.value]
      }))
    };
  }
  dimensionsChanged() {
    return ! _arraysEqual(this.currentDimensions, this.props.dimensions);
  }
  echartOption() {
    const seriesData = [];
    const mainSeries = this.dataToSeries(this.seriesData['']);
    if (this.currentDimensions.length == 0) {
      seriesData.push(mainSeries);
    } else {
      mainSeries.lineStyle = {
        normal: {
          type: 'dotted',
          opacity: 0.5
        }
      };
      mainSeries.showSymbol = false;
      seriesData.push(mainSeries);
      this.currentDimensions.forEach((d) => {
        seriesData.push(this.dataToSeries(this.seriesData[d]));
      });
    }
    return {
      title: { text: this.context.route_params.metric },
      xAxis: { type: 'time', splitLine: { show: false }, splitNumber: 10 },
      yAxis: { type: 'value' },
      series: seriesData,
      tooltip: { trigger: 'axis' }
    };
  }
  loadData() {
    if (this.currentMetric != this.context.route_params.metric) {
      this.loadMainSeries();
    } else {
      if (! this.dimensionsChanged())
        return;
      this.loadDimensonSeries();
    }
  }
  loadDimensonSeries() {
    this.currentDimensions = this.props.dimensions;
    this.ajax = $.ajax({
      url: `//${_config.API_HOST}/data/daily.json`,
      data: {
        namespace: this.context.route_params.namespace,
        metric: this.context.route_params.metric,
        dimensions: this.props.dimensions
      },
      success: (data) => {
        this.storeData(data);
        this.setState({
          echartOption: this.echartOption()
        });
      }
    });

  }
  loadMainSeries() {
    this.currentMetric = this.context.route_params.metric;
    this.refs.chart.showLoading();
    this.seriesData = {};
    this.ajax = $.ajax({
      url: `//${_config.API_HOST}/data/daily.json`,
      data: {
        namespace: this.context.route_params.namespace,
        metric: this.context.route_params.metric
      },
      success: (data) => {
        this.storeData(data);
        if (this.dimensionsChanged()) {
          this.loadDimensonSeries();
        } else {
          this.setState({
            echartOption: this.echartOption()
          });
        }
      }
    });
  }
  storeData(data) {
    data.forEach((s) => {
      this.seriesData[s.dimension] = s;
    });
  }

  componentDidMount() {
    this.loadData();
  }
  componentDidUpdate() {
    this.loadData();
  }
  componentWillUnmount() {
    this.ajax && this.ajax.abort();
  }
  render() {
    return (
      <Echart ref='chart' option={this.state.echartOption}/>
    );
  }
}

Chart.contextTypes = {
  route_params: React.PropTypes.object.isRequired,
}

Chart.propTypes = {
  dimensions: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
};

export default Chart;
