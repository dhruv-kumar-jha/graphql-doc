import React from 'react';
import { withRouter } from 'react-router'
import { Modal } from 'antd';
import ModalHeader from '../../components/ModalHeader';


const ModalLayout = (props) => {


  const handleCancel = () => {
    if ( props.close ) {
      return props.history.push( props.close );
    }
    return props.history.push('/introspect');
    // return props.history.goBack();
  }


  return (
    <Modal
      wrapClassName="modal__primary"
      visible={ true }
      onOk={ props.onOk }
      onCancel={ handleCancel }
      maskClosable={ false }
    >
      <div>

        <ModalHeader
          title={ props.title }
          type={ props.type }
          icon={ props.icon }
        />

        <div>
          { props.children }
        </div>

      </div>
    </Modal>
  );


}

export default withRouter(ModalLayout);
