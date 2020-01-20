import axios from 'axios';
import Store from './Store';
import IntrospectionQuery from './IntrospectionQuery';
import _ from 'lodash';


export default {

  fetch( url ) {
    return axios.post( url, IntrospectionQuery )
      .then( response => {
        Store.set( 'url', url );
        Store.set( 'raw', response.data.data.__schema );
        const processed = this.processSchema( response.data );
        Store.set( 'processed', processed );
        Store.persist();
        return response.data.data;
      });
      // .catch( error => {
      //   console.log('error',error);
      //   return error;
      // });
  },


  fetchFromResponse( response ) {
    Store.set( 'url', 'Introspection Response');
    Store.set( 'raw', response.data.__schema );
    console.log("response.data.__schema", response.data.__schema);
    const processed = this.processSchema( response );
    Store.set( 'processed', processed );
    console.log("processed", processed);
    Store.persist();
    return true;
  },


  processSchema( response ) {
    const schema = response.data.__schema;
    const output = {
      directives: schema.directives,
      schemaTypes: [],
      builtIn: [],
      others: [],
    };

    if ( schema.queryType && schema.queryType.name ) {
      const type = _.find( schema.types, { name: schema.queryType.name } )
      output.schemaTypes.push({ ...type, type: 'queryType' });
    }

    if ( schema.mutationType && schema.mutationType.name ) {
      const type = _.find( schema.types, { name: schema.mutationType.name } )
      output.schemaTypes.push({ ...type, type: 'mutationType' });
    }

    if ( schema.subscriptionType && schema.subscriptionType.name ) {
      const type = _.find( schema.types, { name: schema.subscriptionType.name } )
      output.schemaTypes.push({ ...type, type: 'subscriptionType' });
    }

    const builtin_includes = [ 'String', 'Int', 'ID', 'Float', 'Boolean', '__Schema', '__Type', '__TypeKind' , '__Field', '__InputValue', '__EnumValue', '__Directive', '__DirectiveLocation' ]
    const builtin = _.filter( schema.types, (record) => {
      if ( builtin_includes.includes( record.name ) ) {
        return true;
      }
      return false;
    });
    output.builtIn = builtin;

    const others = _.filter( schema.types, (record) => {
      if ( builtin_includes.includes( record.name ) ) {
        return false;
      }
      else if ( schema.queryType && schema.queryType.name === record.name ) { return false; }
      else if ( schema.mutationType && schema.mutationType.name === record.name ) { return false; }
      else if ( schema.subscriptionType && schema.subscriptionType.name === record.name ) { return false; }
      else { return true; }
    });
    output.others = others;

    return output;
  },


  filter( _value_ ) {
    const schema = Store.get('processed');
    let filtered = {};

    let value = _value_.toLowerCase();

    filtered.builtIn = _.filter( schema.builtIn, (record) => {
      return record.name.toLowerCase().includes(value);
    });

    filtered.others = _.filter( schema.others, (record) => {
      return record.name.toLowerCase().includes(value);
    });

    filtered.directives = _.filter( schema.directives, (record) => {
      return record.name.toLowerCase().includes(value);
    });

    if ( schema.schemaTypes && schema.schemaTypes.length > 0 ) {
      filtered.schemaTypes = _.cloneDeep(schema.schemaTypes);
      filtered.schemaTypes.map( record => {
        return record.fields = _.filter( record.fields, field => {
          return field.name.toLowerCase().includes( value );
        })
      })
    }

    return filtered;

  },


}
