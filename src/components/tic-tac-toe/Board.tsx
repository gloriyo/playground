import React, { useState } from 'react';
import Box from './Box';
import "./style.css";

import boardImg from "./img/board.png";


const Board = () => {

    const [boxStatus, setBoxStatus] = useState(["none", "none", "none",
                                                "none", "none", "none",
                                                "none", "none", "none"]);

    return (
        <div className="board" style={{ backgroundImage: `url(${boardImg})` }}>

        {/* <img className="pieces" src={boardImg} alt="my image" /> */}

        <div className="board-row">
            <Box boxStatus={boxStatus[0]}/>
            <Box boxStatus={boxStatus[1]}/>
            <Box boxStatus={boxStatus[2]}/>
        </div>
        <div className="board-row">
            <Box boxStatus={boxStatus[3]}/>
            <Box boxStatus={boxStatus[4]}/>
            <Box boxStatus={boxStatus[5]}/>
        </div>
        <div className="board-row">
            <Box boxStatus={boxStatus[6]}/>
            <Box boxStatus={boxStatus[7]}/>
            <Box boxStatus={boxStatus[8]}/>
        </div>
    </div>
    )
};

export default Board;