import React, { Component } from 'react';
import Helper from 'global/Helper';
import Store from 'global/Store';
import { Button, Tag, AutoComplete } from 'antd';
import { withRouter } from 'react-router-dom';

import Card from 'components/Card';
const Option = AutoComplete.Option;


class Documentation extends Component {


  constructor() {
    super();
    this.state = {
      schema: null,
      filter: '',
    }
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleOnSearch = this.handleOnSearch.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.resetEndpoint = this.resetEndpoint.bind(this);
  }



  resetEndpoint() {
    Store.reset();
    this.props.update({ schema: false });
    this.props.history.push('/introspect');
  }


  handleFilterChange(e) {
    const value = e.target.value;
    const filteredSchema = Helper.filter( value );
    this.setState({ schema: filteredSchema });
  }


  onSelect( value ) {
    this.props.history.push(`/introspect/info?name=${ value }`)
  }

  handleOnSearch( value ) {
    const filteredSchema = Helper.filter( value );
    this.setState({ schema: filteredSchema });
  }


  render() {

    let schema = null;
    const endpoint = Store.get('url');

    if ( this.state.schema ) {
      schema = this.state.schema;
    } else {
      schema = Store.get('processed');
    }



    return(
      <div>

        <header className="sub_heading">
          <div className="title"><strong>Endpoint: </strong>{ endpoint }</div>
          <div className="filter--container">
            <AutoComplete placeholder="Enter Search Term..." onSearch={ this.handleOnSearch } onSelect={ this.onSelect } allowClear={true} className="filter">
            { schema.builtIn.map( type => <Option key={type.name}>{ type.name }</Option> ) }
            { schema.others.map( type => <Option key={type.name}>{ type.name }</Option> ) }
            { schema.directives.map( type => <Option key={type.name}>{ type.name }</Option> ) }
            { schema.schemaTypes.map( type => {
              return type.fields.map( field => <Option key={`${type.name}/${field.name}`}>{`${ type.name }/${ field.name }`}</Option> )
            } ) }
            </AutoComplete>
          </div>
          <div className="nav">
            <Button type="danger" onClick={ this.resetEndpoint }>Document New Endpoint</Button>
          </div>
        </header>


        <div className="sections-container-wrapper">
        <div className="sections_wrapper">

          <section>
          <div className="content">
            <header><div className="title">GraphQL Types</div></header>
            <div className="cards-list">
              { schema.schemaTypes.map( type => {
                let name = '';
                if ( type.type === 'queryType' ) { name = "Query Type" }
                else if ( type.type === 'mutationType' ) { name = "Mutation Type" }
                else if ( type.type === 'subscriptionType' ) { name = "Subscription Type" }
                return <Card key={ type.name } data={{...type, name: name, fields: [], args: []}} extra={ <Tag color="#108ee9">Name: { type.name }</Tag> } URL={ type.name } />
              } ) }
            </div>
          </div>
          </section>


          <section>
          <div className="content">
            <header><div className="title">Built-in Types</div></header>
            <div className="cards-list">
              { schema.builtIn.map( type => <Card key={ type.name } data={type} /> ) }
            </div>
          </div>
          </section>


          <section>
          <div className="content">
            <header><div className="title">User Defined Types</div></header>
            <div className="cards-list">
              { schema.others.map( type => <Card key={ type.name } data={type} /> ) }
            </div>
          </div>
          </section>


          {
            schema.schemaTypes.map( schemaType => {
              return (
              <section key={ schemaType.name }>
              <div className="content">
                <header><div className="title">{ schemaType.name }</div></header>
                <div className="cards-list">
                  { schemaType.description &&
                  <div className="card section-description">
                    <div className="card-content">
                      <div>{ schemaType.description }</div>
                    </div>
                  </div>
                  }
                  { schemaType.fields && schemaType.fields.length > 0 && schemaType.fields.map( field => <Card key={ field.name } URL={`${schemaType.name}/${field.name}`} data={field} /> ) }
                </div>
              </div>
              </section>
              )
            })
          }


          <section>
          <div className="content">
            <header><div className="title">Directives</div></header>
            <div className="cards-list">
              { schema.directives.map( directive => <Card key={ directive.name } data={directive} /> ) }
            </div>
          </div>
          </section>

        </div>
        </div>


      </div>
    );

  }


}


// export default Documentation;
export default withRouter(Documentation);

/*

            <Input type="text" placeholder="Enter Search Term..." className="filter" onChange={ this.handleFilterChange } />

*/
