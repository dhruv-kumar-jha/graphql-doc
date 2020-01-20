import React, { Component } from 'react';
import { Button, Input, Spin, message, Alert } from 'antd';
import Helper from 'global/Helper';
import QueryString from 'query-string';
import { withRouter } from 'react-router-dom';
import IntrospectionQuery from 'global/IntrospectionQuery';
import { CopyToClipboard } from 'react-copy-to-clipboard';


class URLEntryForm extends Component {

  constructor() {
    super();
    this.state = {
      url: '',
      loading: false,
      loadingIR: false,
      error: false,
      errMessage: '',
      response: '',
      response_error: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchSchema = this.fetchSchema.bind(this);
    this.handleErrorClose = this.handleErrorClose.bind(this);

    this.handleChangeResponse = this.handleChangeResponse.bind(this);
    this.handleSubmitResponse = this.handleSubmitResponse.bind(this);
    this.handleResponseErrorClose = this.handleResponseErrorClose.bind(this);
  }


  handleChange(e) {
    this.setState({ url: e.target.value });
  }

  handleSubmit() {
    let query = QueryString.parse( this.props.location.search );
    const url = this.state.url || query.endpoint;

    if ( ! url ) {
      message.info('Please Enter A Valid GraphQL URL Endpoint');
    } else {
      this.setState({ loading: true });
      this.fetchSchema( url );
    }
  }


  fetchSchema(url) {
    const response = Helper.fetch( url );
          response
            .then( res => {
              this.setState({ loading: false });
              this.props.onSubmit({ schema: true });
            })
            .catch( err => {
              this.setState({ loading: false, error: true, errMessage: err })
            });

  }



  handleErrorClose() {
    this.setState({ error: false, errMessage: '', })
  }
  handleResponseErrorClose() {
    this.setState({ response_error: false })
  }



  handleChangeResponse(e) {
    this.setState({ response: e.target.value });
  }

  handleSubmitResponse() {
    this.setState({ loadingIR: true });

    try {
      const response = JSON.parse(this.state.response);
      Helper.fetchFromResponse( response );
      this.setState({ loadingIR: false });
      this.props.onSubmit({ schema: true });
    } catch (e) {
      this.setState({ loadingIR: false, response_error: true });
    }

  }








  render() {

    let query = QueryString.parse( this.props.location.search );

    return (
      <div>
      <Spin spinning={ this.state.loading }>
      <div className="component--dashboard-container">
        <div className="inner">
          <h1>Please enter a valid GraphQL Server Endpoint Below</h1>

          { this.state.error &&
            <div style={{ marginTop: 25, marginBottom: 25 }}>
              <Alert
                message="Error Occoured"
                description={ this.state.errMessage.message }
                type="error"
                closable
                onClose={ this.handleErrorClose }
              />
            </div>
          }

          <div style={{ marginTop: 25 }}>
            <input name="url" placeholder="https://graphql.api.com" defaultValue={ query.endpoint } onChange={ this.handleChange } className="url" />
            <div style={{ marginTop: 5 }}>
              <Button type="primary" ghost size="large" icon="check" onClick={ this.handleSubmit }>Generate Documentation</Button>
            </div>
          </div>

        </div>
      </div>
      </Spin>


      <div style={{ marginTop: 20 }}>
      <Spin spinning={ this.state.loadingIR }>
      <div className="component--dashboard-container">
        <div className="inner">
          <h1>Please enter The Response Of Introspection Query below</h1>

          <div style={{ marginTop: 15, marginBottom: 15 }}>
          <CopyToClipboard text={ IntrospectionQuery.query } onCopy={ () => message.info('Copied!') }>
            <Button type="primary">Copy Introspection Query to Clipboard</Button>
          </CopyToClipboard>
          <p>Feel free to update the query if needed!</p>
          </div>


          { this.state.response_error &&
            <div style={{ marginTop: 25, marginBottom: 25 }}>
              <Alert
                message="Error Occoured"
                description="Invalid JSON Detected. Please enter valid JSON response."
                type="error"
                closable
                onClose={ this.handleResponseErrorClose }
              />
            </div>
          }

          <Input type="textarea" name="url" placeholder="Run this query and enter response here" onChange={ this.handleChangeResponse } autosize={{ minRows: 4, maxRows: 10 }} />
          <div style={{ marginTop: 5 }}>
            <Button type="primary" ghost size="large" icon="check" onClick={ this.handleSubmitResponse }>Generate Documentation</Button>
          </div>

        </div>
      </div>
      </Spin>
      </div>

      </div>
    );
  }


}


export default withRouter(URLEntryForm);
