// Refs:
//   https://github.com/react-toolbox/react-toolbox/blob/dev/docs/app/components/markdown/index.js

import style from './style';

const Markdown = (props) => {
  const html = {
    __html: props.markdown
  };

  return <article className={style.markdown} dangerouslySetInnerHTML={html} />;
};

Markdown.propTypes = {
  markdown: React.PropTypes.string.isRequired
};

export default Markdown;
