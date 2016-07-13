import Markdown from '../markdown';
import aboutMD from './about';

class About extends React.Component {
  render() {
    return (
      <div>
        <Markdown markdown={aboutMD} />
      </div>
    );
  }
}

export default About;
