import React, { useEffect, useState } from 'react';
import Box from './Box';
import "./style.css";

import boardImg from "./img/board.png";
import Alert from './Alert';


const Board = () => {

    const [gameStatus, setGameStatus] = useState("ongoing");
    const [boardStatus, setBoardStatus] = useState(["none", "none", "none",
                                                "none", "none", "none",
                                                "none", "none", "none"]);




    useEffect(() => {
        console.log(boardStatus, '- Has changed');
        checkGameOver();

    }, [boardStatus]);
                                                    
    const respondToBoxClick = () => {
        // our move >:)

        setBoardStatus([...boardStatus]);

        let indices = boardStatus.map((e, i) => e === "none" ? i : -1).filter(i => i >= 0);

        if (indices.length == 0) {
            console.log("game over");

            setGameStatus("draw");
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

    const checkGameOver = () => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (boardStatus[a] !== "none") {
                if (boardStatus[a] && boardStatus[a] === boardStatus[b] && boardStatus[a] === boardStatus[c]) {
                    // return boardStatus[a];
                    if (boardStatus[a] === "o") {
                        setGameStatus("win");
                    } else {
                        setGameStatus("lose");
                    }
                    
                }
            }
        }
        //   return null;
    }

    return (
        <div className="board-cnt">
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
            { gameStatus !== "ongoing" && <Alert result ={gameStatus} />}
        </div>

       
    )
};

export default Board;