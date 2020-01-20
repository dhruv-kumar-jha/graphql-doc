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
              <Link to="/introspect?endpoint=https://graphql.anilist.co/">AniList - Anime and manga datum, including character, staff, and live airing data.</Link>
              <br/>
              <Link to="/introspect?endpoint=https://metaphysics-production.artsy.net/">Artsy - free online platform for collecting and discovering art</Link>
              <br/>
              <Link to="/introspect?endpoint=https://countries.trevorblades.com/">Countries - Information about countries, continents, and languages, based on Countries List</Link>
              <br/>
              <Link to="/introspect?endpoint=https://api.graphql.jobs/">GraphQL Jobs - GraphQL jobs in modern startups</Link>
              <br/>
              <Link to="/introspect?endpoint=https://api.graphloc.com/graphql">GraphLoc - Find a geolocation of an IP address including latitude, longitude, city, country, time zone and area code. Free to use, SSL supported</Link>

              <br/>
              <br/>
              <a href="https://github.com/APIs-guru/graphql-apis" target="_blank" rel="noopener noreferrer">More endpoints available at: https://github.com/APIs-guru/graphql-apis</a>

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
