import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Loader = ({size=100}) => {
  return (
    <div stle={{display:"flex",
    justifyContent:"center",
    alignItems:"center",
    width:"100%",
    height:"100%"}}>
       <Spinner style={{
            width:size,
            height:size
         }} animation="border" role="status">
      <span className="visually-hidden"></span>
    </Spinner>
    </div>
  )
}

export default Loader
