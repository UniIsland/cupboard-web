import React from 'react';
import { Link } from 'react-router';

const Namespaces = (props) => {
  let nsNodes = props.namespaces.map((ns) => (
    <li key={ns.name}><Link activeClassName={props.activeClassName} to={ns.path}>{ns.label}</Link></li>
  ));

  return (
    <nav className={props.className}>
      <ul>
        <li><Link to='/'>知 | Cupboard</Link></li>
        {nsNodes}
      </ul>
    </nav>
  );
};

Namespaces.propTypes = {
  activeClassName: React.PropTypes.string,
  className: React.PropTypes.string,
  namespaces: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    path: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired
  })).isRequired
};


Namespaces.defaultProps = {
  activeClassName: '',
  className: '',
};

export default Namespaces;
