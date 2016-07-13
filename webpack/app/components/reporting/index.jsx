import { Layout, NavDrawer, ListSubHeader, Panel, Sidebar } from 'react-toolbox';

import MetricList from '../metric_list';

import style from './style';

class Reporting extends React.Component {
  render() {
    return (
      <Layout className={style.layout}>
        <NavDrawer pinned>
          <ListSubHeader caption={`Metrics for ${this.props.params.namespace}`} />
          <MetricList namespace={this.props.params.namespace} />
        </NavDrawer>
        <Panel className={style.panel}>
          {this.props.children}
        </Panel>
      </Layout>
    );
  }
}

export default Reporting;
