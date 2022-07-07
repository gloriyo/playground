import React from 'react';

interface props {
  result: string;

}

const Alert = ({ result } : props ) => {
  return (
    <div className="alert">
        <span> You {result}! </span>
       
    </div>
  )
};

export default Alert;