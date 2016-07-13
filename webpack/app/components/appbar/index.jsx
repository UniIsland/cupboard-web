import { AppBar } from 'react-toolbox';

import Namespaces from './namespaces.jsx';

import style from './style';

const MainAppBar = (props) => {
  let className = style.appbar;
  if (props.className) className += ` ${props.className}`;

  return (
    <AppBar className={className} flat>
      <Namespaces activeClassName={style.active} className={style.namespaces} namespaces={props.namespaces}/>
    </AppBar>
  );
};

MainAppBar.propTypes = {
  className: React.PropTypes.string,
  namespaces: React.PropTypes.array.isRequired
};

MainAppBar.defaultProps = {
  className: '',
};

export default MainAppBar;
