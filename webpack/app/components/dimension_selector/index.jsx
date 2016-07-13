import DimensionDropdown from './dimension_dropdown.jsx';
import DimensionTable from './dimension_table.jsx';

import _config from '_config';

class DimensionSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dimensions: []
    };
  }

  loadDimensions() {
    if (this.currentDimensionGroup == this.props.dimensionGroup) return;
    this.currentDimensionGroup = this.props.dimensionGroup;
    this.refs.table.showLoading();
    this.ajax = $.ajax({
      url: `//${_config.API_HOST}/data/dimensions.json`,
      data: {
        namespace: this.context.route_params.namespace,
        metric: this.props.metric,
        group: this.props.dimensionGroup
      },
      success: (data) => {
        this.setState({ dimensions: data });
      }
    });
  }

  componentDidMount() {
    this.loadDimensions();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.metric == this.props.metric && nextProps.dimensionGroup == this.props.dimensionGroup) return;
    this.currentDimensionGroup = null;
    this.setState({ dimensions: [] });
  }
  componentDidUpdate() {
    this.loadDimensions();
  }
  componentWillUnmount() {
    this.ajax && this.ajax.abort();
  }

  render() {
    return (
      <div>
        <DimensionDropdown
          dimensionGroup={this.props.dimensionGroup}
          metric={this.props.metric}
        />
        <DimensionTable
          ref='table'
          dimensionGroup={this.props.dimensionGroup}
          dimensions={this.state.dimensions}
          selected={this.props.selected}
        />
      </div>
    );
  }
}

DimensionSelector.contextTypes = {
  route_params: React.PropTypes.object.isRequired,
}
DimensionSelector.propTypes = {
  dimensionGroup: React.PropTypes.string,
  selected: React.PropTypes.arrayOf(React.PropTypes.string),
  metric: React.PropTypes.string.isRequired,
}

export default DimensionSelector;
