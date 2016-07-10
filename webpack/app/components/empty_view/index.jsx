import React from 'react';

class EmptyView extends React.Component {
  render() {
    return (
      <div>
        <h1>Placeholder</h1>
        <h2>
          {this.props.params.namespace}
        </h2>
        <p>Please select metric from the list on the left.</p>
      </div>
    );
  }
}

export default EmptyView;
