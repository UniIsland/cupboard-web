import React from 'react';
import { FontIcon, List, ListItem } from 'react-toolbox';
import classnames from 'classnames';
import $ from 'jquery';

import _config from '_config';

import style from './style';

class MetricList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      metrics: [],
      expandedMetricRoot: null
    };
  }

  loadMetrics() {
    if (this.state.metrics.length > 0) return;
    this.ajax = $.ajax({
      url: `//${_config.API_HOST}/metrics.json`,
      data: {
        namespace: this.props.namespace
      },
      success: (data) => {
        this.metricsByName = {};
        data.forEach((m) => this.metricsByName[m.name] = m);
        this.setState({metrics: data});
      }
    });
  }
  matchSelectedMetricRoot(m) {
    return this.context.route_params.metric && m.root == this.metricsByName[this.context.route_params.metric].root;
  }
  onClick(m) {
    if (m.dummy) {
      this.setState({expandedMetricRoot: m.root});
      return;
    } else {
      this.setState({expandedMetricRoot: null});
      this.context.router.push(`${this.props.namespace}/${m.name}`);
    }
  }

  componentDidMount() {
    this.loadMetrics();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.namespace != this.props.namespace)
      this.setState({metrics: [], expandedMetricRoot: null});
  }
  componentDidUpdate() {
    this.loadMetrics();
  }
  componentWillUnmount() {
    this.ajax && this.ajax.abort();
  }
  render() {
    const metricNodes = this.state.metrics.filter((m) => {
      return (m.depth == 1 || this.matchSelectedMetricRoot(m) || m.root == this.state.expandedMetricRoot);
    }).map((m) => {
      const icon = (m.has_children ? 'arrow_drop_down' : null);
      const classNames = classnames({
        [style.active]: (m.name == this.context.route_params.metric),
        [style.listItem]: true,
        [style.indentListItem]: (! m.has_children),
        [style.indentListItemText]: (m.depth > 1)
      });
      return (
        <ListItem
          key={m.name}
          caption={m.label}
          className={classNames}
          leftIcon={icon}
          selectable
          onClick={() => this.onClick(m)}
        />
      )
    });
    return (
      <List selectable ripple className={style.list}>
        {metricNodes}
      </List>
    )
  }
}

MetricList.contextTypes = {
  route_params: React.PropTypes.object.isRequired,
  router: React.PropTypes.object.isRequired,
};

MetricList.propTypes = {
  namespace: React.PropTypes.string.isRequired,
}

export default MetricList
