import React, { useEffect, useState } from 'react';
import Box from './Box';
import "./style.css";

import boardImg from "./img/board.png";


const Board = () => {

    const [boardStatus, setBoardStatus] = useState(["none", "none", "none",
                                                "none", "none", "none",
                                                "none", "none", "none"]);



    useEffect(() => {
        console.log(boardStatus, '- Has changed');
    }, [boardStatus]);
                                                    
    const respondToBoxClick = () => {
        // our move >:)


        let indices = boardStatus.map((e, i) => e === "none" ? i : -1).filter(i => i >= 0);

        if (indices.length == 0) {
            console.log("game over");
        } else {
            let chosenBox =  indices[Math.floor(Math.random() * indices.length)];
            let updatedBoardStatus = [...boardStatus];
            updatedBoardStatus[chosenBox] = "x";
            setBoardStatus(updatedBoardStatus);
        }

        
        // while (boardStatus[chosenBox] !== "none") {
        //     chosenBox =  Math.floor(Math.random() * 9);
        // }
        
    }


    return (
        <div className="board" style={{ backgroundImage: `url(${boardImg})` }}>

        {/* <img className="pieces" src={boardImg} alt="my image" /> */}

        <div className="board-row">
            {/* to-do: create models for props */}
            <Box boardStatus={boardStatus} setBoardStatus={setBoardStatus} index={0} respondToBoxClick={respondToBoxClick} />
            <Box boardStatus={boardStatus} setBoardStatus={setBoardStatus} index={1} respondToBoxClick={respondToBoxClick} />
            <Box boardStatus={boardStatus} setBoardStatus={setBoardStatus} index={2} respondToBoxClick={respondToBoxClick} />
        </div>
        <div className="board-row">
            <Box boardStatus={boardStatus} setBoardStatus={setBoardStatus} index={3} respondToBoxClick={respondToBoxClick} />
            <Box boardStatus={boardStatus} setBoardStatus={setBoardStatus} index={4} respondToBoxClick={respondToBoxClick} />
            <Box boardStatus={boardStatus} setBoardStatus={setBoardStatus} index={5} respondToBoxClick={respondToBoxClick} />
        </div>
        <div className="board-row">
            <Box boardStatus={boardStatus} setBoardStatus={setBoardStatus} index={6} respondToBoxClick={respondToBoxClick} />
            <Box boardStatus={boardStatus} setBoardStatus={setBoardStatus} index={7} respondToBoxClick={respondToBoxClick} />
            <Box boardStatus={boardStatus} setBoardStatus={setBoardStatus} index={8} respondToBoxClick={respondToBoxClick} />
        </div>
    </div>
    )
};

export default Board;