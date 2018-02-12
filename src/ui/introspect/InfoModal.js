import React, { Component } from 'react';
import ModalLayout from '../layouts/ModalLayout';
import Store from '../../global/Store';
import { Tag, Spin } from 'antd';
import _ from 'lodash';
import QueryString from 'query-string';
import { Link } from 'react-router-dom';


class InfoModal extends Component {


  // this will find the record from the data by using name
  findRecord() {
    const schema = Store.get('raw');
    let record = {};

    let query = QueryString.parse( this.props.location.search );
    const queryName = query.name;

    if ( _.includes(queryName, '/') ) {
      let parts = _.split( queryName, '/' );
      let current = _.find( schema.types, { name: parts[0] } );
      record = _.find( current.fields, { name: parts[1] } );
    }
    else {
      record = _.find( schema.types, { name: queryName } );
      if ( ! record ) {
        record = _.find( schema.directives, { name: queryName } );
      }
    }

    if ( ! record ) { record = schema[queryName]; }

    // if the record is still empty, Handle the error here.
    return record;
  }



  findTypeKind( record ) {
    let record_kind = '';
    if ( record.kind ) { record_kind = record.kind; }
    else if ( record.type && record.type.kind ) { record_kind = record.type.kind; }
    return record_kind;
  }

  findTypeName( record ) {
    let typeName = '';
    if ( record.type && record.type.name ) { typeName = record.type.name; }
    else if ( record.type && record.type.ofType ) { typeName = record.type.ofType.name; }
    return typeName;
  }


  showTypeKindDescription( data ) {
    return (
      <div>
        { data.description && <p>{ data.description }</p> }

        { data.type.kind &&
          <span>
            Kind: { data.type.kind && <Tag color="#2db7f5">{ data.type.kind }</Tag> }
            { data.type.ofType && data.type.ofType.kind && <Tag color="#2db7f5">{ data.type.ofType.kind }</Tag> }
            { data.type.ofType && data.type.ofType.ofType && data.type.ofType.ofType.kind && <Tag color="#2db7f5">{ data.type.ofType.ofType.kind }</Tag> }
            { data.type.ofType && data.type.ofType.ofType && data.type.ofType.ofType.ofType && data.type.ofType.ofType.ofType.kind && <Tag color="#2db7f5">{ data.type.ofType.ofType.ofType.kind }</Tag> }
          </span>
        }
        <span>
          Type: { data.type.name && <Tag color="#607D8B"><Link to={`/introspect/info?name=${data.type.name}`}>{ data.type.name }</Link></Tag> }
          { data.type.ofType && data.type.ofType.name && <Tag color="#607D8B"><Link to={`/introspect/info?name=${data.type.ofType.name}`}>{ data.type.ofType.name }</Link></Tag> }
          { data.type.ofType && data.type.ofType.ofType && data.type.ofType.ofType.name && <Tag color="#607D8B"><Link to={`/introspect/info?name=${data.type.ofType.ofType.name}`}>{ data.type.ofType.ofType.name }</Link></Tag> }
          { data.type.ofType && data.type.ofType.ofType && data.type.ofType.ofType.ofType && data.type.ofType.ofType.ofType.name && <Tag color="#607D8B"><Link to={`/introspect/info?name=${data.type.ofType.ofType.ofType.name}`}>{ data.type.ofType.ofType.ofType.name }</Link></Tag> }
        </span>
      </div>
    );

  }




  render() {

    const record = this.findRecord();
    // console.log('record',record);

    if ( ! record ) {
      setTimeout( () => {
        this.props.history.push('/introspect');
      }, 100);
      return <Spin size="large" tip="Trying to load the data..." />
    }


    return (
      <ModalLayout
        title={ record.name }
        type={{
          kind: this.findTypeKind(record),
          name: this.findTypeName(record)
        }}
      >
        <div className="modal__container">

          <div className="content">

            { record.description &&
            <div style={{ marginBottom: 20 }}>
              <div className="heading">Description</div>
              <div className="main-description">{ record.description }</div>
            </div>
            }


            {/* this will find all the possible types from the given data */}
            { record.possibleTypes && record.possibleTypes.length > 0 &&
            <div style={{ marginBottom: 20 }}>
              <div className="heading">Possible Types</div>
              { record.possibleTypes.map( type => {
                return (
                  <div className="list--item" key={ type.name }>
                    { type.name && <div className="key"><Link to={`/introspect/info?name=${type.name}`}>{ type.name }</Link></div> }
                    { type.kind && <div className="value">{ type.kind }</div> }
                  </div>
                )
              } ) }
            </div>
            }




            {/* this will find all the fields from the given data */}
            { record.fields && record.fields.length > 0 &&
            <div style={{ marginBottom: 20 }}>
              <div className="heading">Fields</div>
              { record.fields.map( field => {
                return (
                  <div className="list--item" key={ field.name }>
                    <div className="key">{ field.name }</div>
                    <div className="value">
                      { this.showTypeKindDescription( field ) }
                    </div>
                  </div>
                )
              } ) }
            </div>
            }



            { record.inputFields && record.inputFields.length > 0 &&
            <div style={{ marginBottom: 20 }}>
              <div className="heading">Input Fields</div>
              { record.inputFields.map( field => {
                return (
                  <div className="list--item" key={ field.name }>
                    <div className="key">{ field.name }</div>
                    <div className="value">
                      { field.defaultValue && <p>Defaullt Value: { field.defaultValue }</p> }
                      { this.showTypeKindDescription( field ) }
                    </div>
                  </div>
                )
              } ) }
            </div>
            }




            { record.enumValues && record.enumValues.length > 0 &&
            <div style={{ marginBottom: 20 }}>
              <div className="heading">Enum Values</div>
              { record.enumValues.map( field => {
                return (
                  <div className="list--item" key={ field.name }>
                    <div className="key">{ field.name }</div>
                    <div className="value">{ field.description }</div>
                  </div>
                )
              } ) }
            </div>
            }




            { record.args && record.args.length > 0 &&
            <div style={{ marginBottom: 20 }}>
              <div className="heading">Arguements</div>
              { record.args.map( arg => {
                return (
                  <div className="list--item" key={ arg.name }>
                    <div className="key">{ arg.name }</div>
                    <div className="value">
                      { this.showTypeKindDescription( arg ) }
                    </div>
                  </div>
                )
              } ) }
            </div>
            }




          </div>

        </div>

      </ModalLayout>
    );

  }

}


export default InfoModal;
