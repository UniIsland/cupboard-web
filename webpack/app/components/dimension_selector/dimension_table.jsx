import { ProgressBar, Table } from 'react-toolbox';

import style from './style';

class DimensionTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
    this.onSelect = this.onSelect.bind(this);
  }

  getSelectedIndex() {
    const selected = [];
    this.props.selected.forEach((d) => {
      const index = this.props.dimensions.findIndex((e) => e.key == d);
      if (index >= 0) selected.push(index);
    });
    return selected;
  }
  onSelect(selected) {
    const location = {
      pathname: this.context.route_location.pathname,
      query: {}
    };
    if (this.props.dimensionGroup)
      location.query.dimensionGroup = this.props.dimensionGroup;
    if (selected.length > 0)
      location.query.dimensions = selected.map((i) => this.props.dimensions[i].key);
    this.context.router.push(location);
  }
  showLoading() {
    this.setState({loading: true});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ loading: false });
  }
  render() {
    if (this.state.loading)
      return (
        <ProgressBar type="circular" mode="indeterminate" />
      );
    if (this.props.dimensions.length > 0) {
      const model = {};
      this.props.dimensionGroup.split('|').forEach((d) => {
        model[d] = { type: String };
      });
      return (
        <Table
          className={style.dimensionTable}
          model={model}
          onSelect={this.onSelect}
          selected={this.getSelectedIndex()}
          source={this.props.dimensions.map((d) => d.data)}
        />
      );
    } else {
      return false;
    }
  }
}

DimensionTable.contextTypes = {
  route_location: React.PropTypes.object.isRequired,
  router: React.PropTypes.object.isRequired,
};

DimensionTable.propTypes = {
  dimensionGroup: React.PropTypes.string,
  dimensions: React.PropTypes.array.isRequired,
  selected: React.PropTypes.arrayOf(React.PropTypes.string),
}

export default DimensionTable;
