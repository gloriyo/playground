// React adaptation of: https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript


import React, { useCallback, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import useState from 'react-usestateref';
import Alert from './Alert';

import ballSrc from "./img/ball.png";
import bricks1Src from "./img/bricks-1.png";
import bricks2Src from "./img/bricks-2.png";
import bricks3Src from "./img/bricks-3.png";
import bricks4Src from "./img/bricks-4.png";
import bricks5Src from "./img/bricks-5.png";

// import playerSrc from "./img/player.png";


const ballImg = new Image();
const bricks1Img = new Image();
const bricks2Img = new Image();
const bricks3Img = new Image();
const bricks4Img = new Image();
const bricks5Img = new Image();



const playerImg = new Image();


const scaleFactor = 2.5;

// const defaultCanvasWidth = 457 * scaleFactor;
// const defaultCanvasHeight = 400 * scaleFactor;


const ballDiameter = 15 * scaleFactor;

const playerHeight = 10 * scaleFactor;
const playerWidth = 10 * scaleFactor;

const boardColumns = 50;
const boardRows = 40;

const defaultCanvasWidth = playerWidth * boardColumns;
const defaultCanvasHeight = playerWidth * boardRows;



type coords = { [filled: string]: boolean }

const defaultSpeed = 5 * scaleFactor;

const defaultSpeespeedX = ((defaultSpeed**2)/2)**0.5;
const defaultSpeeSpeedY = defaultSpeespeedX;

let boardCoords:coords[][] = Array.from(Array(boardRows), () => Array(boardColumns).fill({ filled: false }));

for (let i=0; i<boardRows; i++) {

    if (i == 0 || i == boardRows-1) {
        // fill entire row
        boardCoords[i] = Array(boardColumns).fill({ filled: true })
    } else {
        // file first and last element in row 
        boardCoords[i][0] = { filled: true };
        boardCoords[i][boardColumns-1] = { filled: true };

    }
}

console.log(boardCoords)



const Canvas = () => {

    const [gameStatus, setGameStatus, gameStatusRef] = useState("ongoing");

    const [gameScore, setGameScore, gameScoreRef] = useState(0);


    const [canvasWidth, setCanvasWidth] = useState(defaultCanvasWidth);
    const [canvasHeight, setCanvasHeight] = useState(defaultCanvasHeight);

    const [boxCoords, setBoxCoords] = useState(boardCoords);

    const [ballX, setBallX, ballXRef] = useState((canvasWidth-ballDiameter)/2);
    const [ballY, setBallY, ballYRef] = useState((canvasHeight-ballDiameter)/2);


    const [ballSpeed, setBallSpeed, ballSpeedRef] = useState(defaultSpeed);
    const [ballSpeedX, setBallSpeedX, ballSpeedXRef] = useState(defaultSpeespeedX);
    const [ballSpeedY, setBallSpeedY, ballSpeedYRef] = useState(defaultSpeeSpeedY);

    const [playerX, setPlayerX, playerXRef] = useState((canvasWidth-playerWidth)/2);
    const [playerY, setPlayerY, playerYRef] = useState(canvasHeight-(2*playerHeight));
    const [playerSpeed, setPaddleSpeed, playerSpeedRef] = useState(defaultSpeed);

    // const [playerY, setPlayerY, playerYRef] = useState(-2);


    const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D | null>(null);
    const [canvasInterval, setCanvasInterval, canvasIntervalRef] = useState<NodeJS.Timer>();



    const [keyPressed, setKeyPressed, keyPressedRef] = useState({ previous: "none", current: "none" });
    // const [leftPressed, setLeftPressed, leftPressedRef] = useState(false);
    // const [upPressed, setUpPressed, upPressedRef] = useState(false);
    // const [downPressed, setDownPressed, downPressedRef] = useState(false);

    // useEffect(() => {
    //     if(canvasContext) {
    //         canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);

    //         // draw the ball
    //         canvasContext.beginPath();
    //         canvasContext.drawImage(ballImg, ballX, ballY, ballDiameter, ballDiameter);

    //         // draw the player
    //         canvasContext.beginPath();
    //         canvasContext.rect(playerX, playerY, playerWidth, playerHeight);
    //         canvasContext.fillStyle = "#0095DD";
    //         canvasContext.fill();
    //         canvasContext.closePath();
    //         // canvasContext.drawImage(playerImg, playerX, playerY, playerWidth, playerHeight);



    //         // display the score
    //         // canvasContext.font = "16pX Arial";
    //         // canvasContext.fillStyle = "#0095DD";
    //         // canvasContext.fillTeXt("Score: "+gameScore, 8, 18);

    //     }
    // }, [canvasContext, ballX, ballY])

    const draw = () => {

        if(canvasContext) {


            let currentBallX = ballXRef.current;
            let currentBallY = ballYRef.current;

            let currentPlayerX = playerXRef.current;
            let currentPlayerY = playerYRef.current;

            canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);


            // draw the background boxes
            boxCoords.forEach((row, i) => {
                row.forEach((b, j) => {
                    if (b.filled) {
                        canvasContext.beginPath();
                        canvasContext.rect(j*playerWidth, i*playerWidth, playerWidth, playerHeight);
                        canvasContext.fillStyle = "#AAEEFF";
                        canvasContext.fill();
                        canvasContext.closePath();
            
                    }
                })
            });


            // draw the ball
            canvasContext.beginPath();
            canvasContext.drawImage(ballImg, currentBallX, currentBallY, ballDiameter, ballDiameter);

            // draw the player
            canvasContext.beginPath();
            canvasContext.rect(currentPlayerX, currentPlayerY, playerWidth, playerHeight);
            canvasContext.fillStyle = "#0095DD";
            canvasContext.fill();
            canvasContext.closePath();


            let currentBallSpeedX = ballSpeedXRef.current;
            let currentBallSpeedY = ballSpeedYRef.current;


            let nextBallX = ballXRef.current + currentBallSpeedX
            let nextBallY = ballYRef.current + currentBallSpeedY
            
            setBallX(nextBallX);
            setBallY(nextBallY);

            // console.log("x: " + nextBallX + ", y: " + nextBallY)



            let ballCenterX = nextBallX + (ballDiameter/2)
            let ballCentery = nextBallY + (ballDiameter/2)

        

            // check if ball hit the side walls
            if (nextBallX > canvasWidth-ballDiameter ||
                nextBallX < 0) {
                setBallSpeedX(-currentBallSpeedX);
            } 
            
            // check if ball hit the top or bottom wall
            else if (nextBallY < 0 || nextBallY > canvasHeight-ballDiameter) {    
                setBallSpeedY(-currentBallSpeedY);
            }
            // // check if ball hit the player
            // else if ((nextBallY > currentPlayerY-ballDiameter &&
            //     nextBallY < currentPlayerY-ballDiameter) ||
            //     (ballCenterX > currentPlayerX &&
            //     ballCenterX < currentPlayerX + playerWidth)) {

            //     let playerCenter = currentPlayerX + (playerWidth/2);
                
            //     // angle of the ball increases towards the edge of the player
            //     let distFromCenter = Math.abs(playerCenter-ballCenterX)
            //     let percentFromCenter = distFromCenter / (playerWidth/2);
                
            //     let speespeedX = ballSpeedRef.current*percentFromCenter
                
            //     // if the ball hit left side of the player, ball bounces left  
            //     speespeedX = (ballCenterX < playerCenter) ? -speespeedX : speespeedX 

            //     // using Pythagorean theorem
            //     let speeSpeedY = ((ballSpeedRef.current**2) - (speespeedX**2))**0.5
            //     speeSpeedY = (currentBallSpeedY > 0) ? -speeSpeedY : speeSpeedY;
                
                
            //     setBallSpeedX(speespeedX);
            //     setBallSpeedY(speeSpeedY);

            //     console.log(percentFromCenter)
            
            // }

            let previousKeyPressed = keyPressedRef.current.previous;
            let currentKeyPressed = keyPressedRef.current.current;

            let currentColumn = Math.round(currentPlayerX/playerWidth)
            let currentRow = Math.round(currentPlayerY/playerHeight)

            switch (currentKeyPressed) {
                case "right":

                    if(currentPlayerX+playerWidth >= canvasWidth) {
                        setPlayerX(canvasWidth-playerWidth)
                    }
                    else {
                        if (previousKeyPressed !== "right") {
                            setPlayerY(currentRow*playerHeight)
                        }
                        setPlayerX(currentPlayerX+playerSpeed)
                    }
                    break;
                case "left":
                    if(currentPlayerX <= 0) {
                        setPlayerX(0)
                    } else {
                        if (previousKeyPressed !== "left") {
                            setPlayerY(currentRow*playerHeight)
                        }
                        setPlayerX(prevPaddleX => prevPaddleX-playerSpeed)
                    }
                    break;
                case "up":
                    if(currentPlayerY <= 0) {
                        setPlayerY(0)
                    } else {
                        if (previousKeyPressed !== "up") {
                            setPlayerX(currentColumn*playerWidth)
                        }
                        setPlayerY(prevPlayerY => prevPlayerY-playerSpeed)
                    }
                    break;
                case "down":
                    if(currentPlayerY+playerHeight >= canvasHeight) {
                        setPlayerY(canvasHeight-playerHeight)
                    } else {
                        if (previousKeyPressed !== "down") {
                            setPlayerX(currentColumn*playerWidth)
                        }
                        setPlayerY(prevPlayerY => prevPlayerY+playerSpeed)
                    }
                    break;
            }

            setKeyPressed({ previous: currentKeyPressed, current: currentKeyPressed });

            // // if right key is pressed, move player right
            // if (keyPressedRef.current === "right") {
                

            //     if(currentPlayerX+playerWidth >= canvasWidth) {
            //         setPlayerX(canvasWidth-playerWidth)
            //     } else {
            //         setPlayerX(prevPaddleX => prevPaddleX+playerSpeed)
            //     }

            // }
    
            // // if left key is pressed, move player left
            // else if (leftPressedRef.current) {
                

            //     if(currentPlayerX <= 0) {
            //         setPlayerX(0)
            //     } else {
            //         setPlayerX(prevPaddleX => prevPaddleX-playerSpeed)
            //     }
            // }

            // // if up key is pressed, move player up
            // if (upPressedRef.current) {
                
            //     if(currentPlayerY <= 0) {
            //         setPlayerY(0)
            //     } else {
            //         setPlayerY(prevPlayerY => prevPlayerY-playerSpeed)
            //     }

            // }
    
            // // if down key is pressed, move player down
            // else if (downPressedRef.current) {
                

            //     if(currentPlayerY+playerHeight >= canvasHeight) {
            //         setPlayerY(canvasHeight-playerHeight)
            //     } else {
            //         setPlayerY(prevPlayerY => prevPlayerY+playerSpeed)
            //     }

            // }
        }
        requestAnimationFrame(draw);
    };

  
    useEffect(() => {


        ballImg.src = ballSrc

        // playerImg.src = playerSrc

        let canvasCnt = document.getElementById("xonix-canvas-cnt") as HTMLDivElement;
        canvasCnt.focus();


        let canvas = document.getElementById("xonix-canvas") as HTMLCanvasElement;
        let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;


        setCanvasContext(ctx);

        // const intervalId = setInterval(() => draw(), 15);

        // console.log("INTERVAL", intervalId)
        // setCanvasInterval(intervalId)

        // draw();
        

    }, []);

    useEffect(() => {
        console.log("canvasContext", canvasContext);
        draw();
    }, [canvasContext])



    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {

        if (gameStatus === "ongoing") {

            let previousKeyPressed = keyPressedRef.current.current;
            if (event.code === "ArrowLeft") {

                setKeyPressed({ previous: previousKeyPressed, current: "left" });
            } else if (event.code === "ArrowRight") {
                setKeyPressed({ previous: previousKeyPressed, current: "right" });
            } else if (event.code === "ArrowUp") {
                setKeyPressed({ previous: previousKeyPressed, current: "up" });
            } else if (event.code === "ArrowDown") {
                setKeyPressed({ previous: previousKeyPressed, current: "down" });
            }
        }    
    }

    // const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {

    //     if (gameStatus === "ongoing") {
    //         if (event.code === "ArrowLeft") {
    //                 setLeftPressed(false);
    //             } else if (event.code === "ArrowRight") {
    //                 setRightPressed(false);
    //             } else if (event.code === "ArrowUp") {
    //                 setUpPressed(false);
    //             } else if (event.code === "ArrowDown") {
    //                 setDownPressed(false);
    //             }
    //     }
    // }
  
    return (
    <div id="xonix-canvas-cnt" className="canvas-cnt" 
        tabIndex={-1} 
        onKeyDown={(e) => handleKeyDown(e)}
        // onKeyUp={(e) => handleKeyUp(e)} 
        >
        <canvas id="xonix-canvas" 
                className="canvas" 
                width={canvasWidth} height={canvasHeight} 
                style={{ border: "1pX solid #d3d3d3" }}>

        </canvas>
        { gameStatus !== "ongoing" && <Alert result ={gameStatus} />}
    </div>
  )
};

export default Canvas;