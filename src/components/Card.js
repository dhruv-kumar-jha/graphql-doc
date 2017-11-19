import React from 'react';
import { Tag } from 'antd';
import { withRouter } from 'react-router-dom';


const Card = (props) => {

  const showModal = (event) => {
    if ( event.target.parentNode.target === '_blank' ) { return null; }
    props.history.push(`/introspect/info?name=${ props.URL || props.data.name }`);
  }

  const { data, extra } = props;

  return(
    <div className="card" onClick={ showModal }>
      <div className="card-content">
        <div className="title"><strong>{ data.name }</strong></div>

        { data.description && <div className="description">{ data.description }</div> }
        { extra && <div style={{ marginTop: 10 }}>{ extra }</div> }


        { data.fields && data.fields.length > 0 &&
          <div style={{ marginTop: 5 }}>
          { data.fields.map( field => {
            return <Tag key={field.name} color="green">{ field.name }</Tag>
          }) }
          </div>
        }

        { data.args && data.args.length > 0 &&
          <div style={{ marginTop: 5 }}>
          { data.args.map( arg => {
            return <Tag key={arg.name} color="blue">{ arg.name }</Tag>
          }) }
          </div>
        }

      </div>
    </div>
  )

}

export default withRouter(Card);
