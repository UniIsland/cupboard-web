import React from 'react';
import $ from 'jquery';

import AppBar from './components/appbar';

import _config from '_config';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      namespaces: []
    };
  }
  getChildContext() {
    return {
      route_location: this.props.location,
      route_params: this.props.params,
    };
  }

  loadNamespaces() {
    this.ajax = $.ajax({
      url: `//${_config.API_HOST}/namespaces.json`,
      success: (data) => {
        this.setState({namespaces: data});
      }
    });
  }
  componentDidMount() {
    this.loadNamespaces();
  }
  componentWillUnmount() {
    this.ajax && this.ajax.abort();
  }
  render() {
    return (
      <div>
        <AppBar namespaces={this.state.namespaces}/>
        {this.props.children}
      </div>
    );
  }
}

App.childContextTypes = {
  route_location: React.PropTypes.object.isRequired,
  route_params: React.PropTypes.object.isRequired,
}

export default App;
