import React from 'react';
import Box from './Box';
import "./style.css";

const Board = () => {
  return (
    <div>
    <div className="board-row">
        <Box />
        <Box />
        <Box />
    </div>
    <div className="board-row">
        <Box />
        <Box />
        <Box />
    </div>
    <div className="board-row">
        <Box />
        <Box />
        <Box />
    </div>
  </div>
  )
};

export default Board;