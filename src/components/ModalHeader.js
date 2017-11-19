import React from 'react';
import { Icon, Tag } from 'antd';
import { Link } from 'react-router-dom';

const Header = (props) => {

  return (
    <header>
      <Icon type={ props.icon || 'laptop' } />
      <div className="info">
        <div className="title">{ props.title }</div>
        <div className="subtitle">
          { props.type.kind && <span>Kind: <Tag color="blue">{props.type.kind}</Tag></span> }
          { props.type.name && <span>Type: <Tag color="#607D8B"><Link to={`/introspect/info?name=${props.type.name}`}>{props.type.name}</Link></Tag></span> }
        </div>
      </div>
    </header>
  );

}


export default Header;
