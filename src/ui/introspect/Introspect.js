import React, { Component } from 'react';
import URLEntryForm from './URLEntryForm';
import Documentation from './Documentation';
import Store from '../../global/Store';


class Introspect extends Component {

  constructor() {
    super();
    this.state = {
      schema: Store.get('schema') || false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStateUpdate = this.handleStateUpdate.bind(this);
  }


  handleSubmit(data) {
    if ( data.schema ) {
      Store.setAndPersist( 'schema', true);
      this.setState({ schema: true });
    }
  }

  handleStateUpdate( data ) {
    this.setState(data);
  }


  render() {

    if ( ! this.state.schema ) {
      return <URLEntryForm onSubmit={ this.handleSubmit } />;
    }

    return(
      <div>

        <Documentation update={ this.handleStateUpdate } />;

        { this.props.children &&
          <div>{ React.cloneElement( this.props.children, { data: this.props.data, setParentState: this.setParentState } ) }</div>
        }

      </div>
    )

  }

}


export default Introspect;
