import React, { useState } from 'react';

import oimg from "./img/o-piece.png";
import ximg from "./img/x-piece.png";


interface props {
    boxStatus: string;

  }


const Box = ({ boxStatus } : props) => {

    const [piece, setPiece] = useState('none');

    const handleBoxClick = () => {
        console.log("clicked");
    }


    return (
        <button className="box" onClick={() => handleBoxClick()}>
            
            <img className="pieces" src={oimg} alt="my image" />
        </button>
    )
};

export default Box;
