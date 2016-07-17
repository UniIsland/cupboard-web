// Refs:
//   https://github.com/luqin/react-echarts/blob/master/src/ECharts.js
//   https://github.com/zillding/react-echarts-component/blob/master/src/index.js

import Echarts from 'echarts';

class Echart extends React.Component {
  constructor(props) {
    super(props);
  }
  showLoading() {
    this.chart.showLoading();
  }
  setOption() {
    // this.showLoading();
    let noMerge = true;
    this.chart.setOption(this.props.option, noMerge);
    this.chart.hideLoading();
  }
  componentDidMount() {
    const chartDom = this.refs.echart;
    this.chart = Echarts.getInstanceByDom(chartDom) || Echarts.init(chartDom);
    this.setOption();
  }
  componentDidUpdate() {
    this.setOption();
  }
  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
      this.chart = null;
    }
  }
  render() {
    return (
      <div ref="echart" style={{height: '400px'}}></div>
    );
  }
}

Echart.propTypes = {
  option: React.PropTypes.object
};

export default Echart;
