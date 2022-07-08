import React, { useEffect, useState } from 'react';

import "./bricks-style.css";


import Alert from './Alert';
import Box from './Box';


let rows = 20;
let columns = 20;

let playerRow = columns - 2;
let playerWidth = 3;

let playerColInit = Math.floor(columns/2 - playerWidth/2);


let board:string[][] = Array.from(Array(rows), () => Array(columns).fill("none"));

for (let i = playerColInit; i <= + playerColInit + playerWidth; i++) {
    board[playerRow][i] = "player";
}


const Board = () => {

    const [gameStatus, setGameStatus] = useState("ongoing");
    const [boardStatus, setBoardStatus] = useState(board);

    const [playersTurn, setPlayerTurn] = useState(true);

    const [playerColumn, setPlayerLocation] = useState(playerColInit);


    // console.log(board);

    useEffect(() => {
        // console.log(boardStatus);
    }, [boardStatus])

  // onKeyDown handler function
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      console.log(event);
    if (event.code === "ArrowLeft") {
    //   alert(`You have typed "${enteredText}"`);
        console.log("ArrowLeft pressed");

        let updatedBoardStatus = [...boardStatus];
        updatedBoardStatus[playerRow][playerColumn - 1] = "player";
        updatedBoardStatus[playerRow][playerColumn + playerWidth] = "none";

        setBoardStatus(updatedBoardStatus);
        setPlayerLocation(playerColumn - 1);
        
        console.log("player is at ", playerColumn)

    } else if (event.code === "ArrowRight") {
        console.log("ArrowRight pressed");
        let updatedBoardStatus = [...boardStatus];
        updatedBoardStatus[playerRow][playerColumn + playerWidth] = "player";
        updatedBoardStatus[playerRow][playerColumn - 1] = "none";

        setBoardStatus(updatedBoardStatus);
        setPlayerLocation(playerColumn + 1);
    }



  };
    const checkGameOver = () => {

    }

    return (
        <div className="board-cnt" onKeyDown={(e) => handleKeyDown(e)} >
            <div className="board" >

                {boardStatus.map((row, i) => 
                    <div className="board-row" key={i}>
                        {row.map((col, j) => {
                            if(col == "player") {
                                return <Box key={j} boxType="player"/>
                            } else {
                                return <Box key={j} boxType="none"/>
                                
                            }
                            
                        })}
                    </div>    
                )}

            </div>
            { gameStatus !== "ongoing" && <Alert result ={gameStatus} />}
        </div>

    )
};

export default Board;



// {[...Array(rows)].map((x, i) =>
//     <div className="board-row" key={i}>
//         {[...Array(columns)].map((y, j) => {
//             if(j >= playerColumn && j <= playerColumn + playerWidth && i == playerRow) {
//                 return <Box key={j} boxType="player"/>
//             }
//             return <Box key={j} boxType="none"/>
//         })}   
    
// )}