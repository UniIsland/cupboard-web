import React from 'react';

import Chart from '../chart';
import DimensionSelector from '../dimension_selector';

class MetricView extends React.Component {
  selectedDimensions() {
    const selected = this.props.location.query.dimensions;
    if (! selected) return [];
    if (Array.isArray(selected))
      return selected;
    else
      return [selected];
  }

  render() {
    return (
      <div>
        <h2>{this.props.params.namespace} - {this.props.params.metric}</h2>
        <Chart dimensions={this.selectedDimensions()}/>
        <DimensionSelector
          dimensionGroup={this.props.location.query.dimensionGroup}
          selected={this.selectedDimensions()}
          metric={this.props.params.metric}
        />
      </div>
    );
  }
}

export default MetricView;
