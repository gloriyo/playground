import React from 'react';

import oimg from "./img/o-piece.png";

const Box = () => {
  return (
    <button className="box">
        <img className="pieces" src={oimg} alt="my image" />
    </button>
  )
};

export default Box;
