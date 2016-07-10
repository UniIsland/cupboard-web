import React from 'react';
import { Dropdown } from 'react-toolbox';
import $ from 'jquery';

import style from './style';

class DimensionDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dimensionGroups: [{
        value: 0,
        label: 'Select Dimension'
      }],
      selected: 0,
    };
    this.currentMetric = null;
    this.handleChange = this.handleChange.bind(this);
  }

  getSelectedDimensionGroupValue(dimensionGroup, dimensionGroups = this.state.dimensionGroups) {
    let value = 0;
    if (dimensionGroup) {
      // TODO: handle invalid dimesionGroup
      const selected = dimensionGroups.find((dg) => dg.name == dimensionGroup);
      if (selected) value = selected.value;
    }
    return value;
  }
  handleChange (value) {
    if (value == this.state.selected) return;
    const location = {
      pathname: this.context.route_location.pathname,
    };
    if (value != 0) {
      const dimensionGroup = this.state.dimensionGroups.find((dg) => dg.value == value);
      location.query = {
        dimensionGroup: dimensionGroup.name
      }
    }
    this.context.router.push(location);
  }
  loadDimensionGroups() {
    if (this.currentMetric == this.props.metric) return;
    this.currentMetric = this.props.metric;
    this.ajax = $.ajax({
      url: '//cupboard.net:3000/data/dimension_groups.json',
      data: {
        namespace: this.context.route_params.namespace,
        metric: this.props.metric
      },
      success: (data) => {
        this.setState({
          dimensionGroups: data,
          selected: this.getSelectedDimensionGroupValue(this.props.dimensionGroup, data)
        });
      }
    });
  }

  componentDidMount() {
    this.loadDimensionGroups();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.metric != this.props.metric) {
      this.currentMetric = null;
      this.setState({
        selected: 0,
        dimensionGroups: [{
          value: 0,
          label: 'Select Dimension'
        }]
      });
    } else {
      this.setState({selected: this.getSelectedDimensionGroupValue(nextProps.dimensionGroup)});
    }
  }
  componentDidUpdate() {
    this.loadDimensionGroups();
  }
  componentWillUnmount() {
    this.ajax && this.ajax.abort();
  }
  render() {
    return (
      <Dropdown
        auto
        className={style.dropdown}
        onChange={this.handleChange}
        source={this.state.dimensionGroups}
        value={this.state.selected}
      />
    );
  }
}

DimensionDropdown.contextTypes = {
  route_location: React.PropTypes.object.isRequired,
  route_params: React.PropTypes.object.isRequired,
  router: React.PropTypes.object.isRequired,
}

DimensionDropdown.propTypes = {
  dimensionGroup: React.PropTypes.string,
  metric: React.PropTypes.string.isRequired,
}

export default DimensionDropdown;
