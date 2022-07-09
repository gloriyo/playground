import React from 'react';
import { Button } from 'react-bootstrap';

interface props {
  result: string;

}

const handleClick = () => {
  window.location.reload();
}

const Alert = ({ result } : props ) => {
  return (
    <div className="alert">
        <span> You {result}! </span>
        <Button variant="outline" className="play-button" onClick={() => handleClick()} > Play again? </Button>
       
    </div>
  )
};

export default Alert;