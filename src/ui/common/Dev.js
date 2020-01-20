import React, { Component } from 'react';
import { OutboundLink } from 'react-ga';

class Dev extends Component {


  render() {

    const resources = [
      { url: 'https://github.com/ant-design/ant-design', name: 'Ant Design - A UI Design Language' },
      { url: 'https://github.com/ReactTraining/react-router', name: 'React Router' },
      { url: 'https://gist.github.com/craigbeck/b90915d49fda19d5b2b17ead14dcd6da', name: 'Introspection Query', extra: 'modified to suit this app' },
      { url: 'https://github.com/nkbt/react-copy-to-clipboard', name: 'React Copy To Clipboard' },
      { url: 'https://github.com/lodash/lodash/', name: 'Lodash' },
      { url: 'https://github.com/axios/axios', name: 'Axios' },
    ];


    return(
      <div className="component--dashboard-container">
        <div className="inner">

           <h1>Hi, My Name is Dhruv Kumar Jha.</h1>
           <p>Full Stack Architect Located in Bangalore, India.</p>

           <div style={{ marginTop: 20 }}>
              <p>You can read some of the tutorials written by me on my website <strong><OutboundLink eventLabel="https://www.dhruvkumarjha.com/" to="https://www.dhruvkumarjha.com/articles" target="_blank" rel="noopener noreferrer">https://www.dhruvkumarjha.com/</OutboundLink></strong> And you can find my open source projects at <OutboundLink eventLabel="https://github.com/dhruv-kumar-jha" to="https://github.com/dhruv-kumar-jha" target="_blank" rel="noopener noreferrer">GitHub</OutboundLink></p>
           </div>

           <div style={{ marginTop: 20 }}>
            <p>Looking for GraphQL & React JS Developers? Feel free to email me at <a href="mailto:dhruv@infiniti7.com">dhruv@infiniti7.com</a></p>
           </div>


           <div style={{ marginTop: 20 }}>
            <p><strong>Awesome Resources Used to Build this App</strong></p>
            <div className="dev--resources">
              { resources.map( project => {
                return <p key={project.url}><OutboundLink eventLabel={project.url} to={project.url} target="_blank" rel="noopener noreferrer">{`${project.name} ${ project.extra ? project.extra : '' }`}</OutboundLink></p>
              }) }
            </div>

            <p>If you encounter any <strong>errors</strong> or if you have some good <strong>ideas and suggestions</strong> for the app, Just let me know. <strong><a href="https://twitter.com/dhruv_kumar_jha" target="_blank" rel="noopener noreferrer">@dhruv_kumar_jha</a></strong></p>

           </div>

        </div>
      </div>
    );

  }

}


export default Dev;
