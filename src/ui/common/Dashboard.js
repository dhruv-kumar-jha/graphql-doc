import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';


class Dashboard extends Component {


  render() {

    return(
      <div className="component--dashboard-container">
        <div className="inner">
           <h1>Welcome to GraphQL Server Documentation Generator</h1>
           <p>This app will generate documentation of any available GraphQL server based on it's endpoint or the Introspection response you provide.</p>
           <div style={{ marginTop: 20 }}>
            <p><strong>You can checkout sample documentation of the GraphQL servers listed below</strong></p>
             <p>
              <Link to="/introspect?endpoint=https://mpjk0plp9.lp.gql.zone/graphql">Starwars API</Link>
              <br/>
              <Link to="/introspect?endpoint=https://www.graphqlhub.com/graphql">GraphQL Hub</Link>
              <br/>
              <Link to="/introspect?endpoint=https://us-west-2.api.scaphold.io/graphql/graphql-world?">GraphQL World</Link>

             </p>
           </div>
           <div style={{ marginTop: 20 }}>
             <Button type="primary"><Link to="/introspect">Let's Get Started</Link></Button>
           </div>
        </div>
      </div>
    );

  }

}


export default Dashboard;
