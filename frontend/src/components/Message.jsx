import React from 'react';
import Alert from 'react-bootstrap/Alert';

const Message = ({variant='info',children}) => {
  return (
    <Alert variant={variant} style={{fontSize:20,width:"40%",marginTop:"10px"}}>
    <strong>{children}</strong>
  </Alert>
  )
}

export default Message
