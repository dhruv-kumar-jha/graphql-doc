

export default {
  __store__: {},

  get( key ) {
    return this.__store__[key];
  },

  set( key, val ) {
    this.__store__[key] = val;
  },

  setAndPersist( key, val ) {
    this.__store__[key] = val;
    this.persist();
  },

  delete( key ) {
    delete this.__store__[key];
  },

  reset() {
    this.__store__ = {};
    localStorage.removeItem('__store__');
  },


  persist() {
    localStorage.setItem( '__store__', JSON.stringify(this.__store__) );
  },

  hydrate() {
    const retrieved = localStorage.getItem('__store__');
    if ( retrieved ) {
      const data = JSON.parse(retrieved);
      this.__store__ = data;
    }
  },


}


/*
export default {

  __rawSchema: null,
  __processedSchema: null,
  __url : 'https://api.github.com/graphql',
  __schema: false,


  hasSchema() {
    return this.__schema;
  },
  setSchema(status) {
    this.__schema = status;
  },



  setRAWSchema( schema ) {
    this.__rawSchema = schema;
  },
  getRAWSchema() {
    return this.__rawSchema;
  },


  setProcessedSchema( schema ) {
    this.__processedSchema = schema;
  },
  getProcessedSchema() {
    return this.__processedSchema;
  },

  setURL(url) {
    this.__url = url;
  },
  getURL(url) {
    return this.__url;
  },





  resetStore() {
    this.__rawSchema = null;
    this.__processedSchema = null;
    this.__url = null;
    this.__schema = null;
  },



};



*/



