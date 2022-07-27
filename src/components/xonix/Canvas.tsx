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



type coords = { [filled: string]: number }
const defaultSpeed = 5 * scaleFactor;

const defaultSpeespeedX = ((defaultSpeed**2)/2)**0.5;
const defaultSpeeSpeedY = defaultSpeespeedX;

// box status
const EMPTY_BOX = -1;
const CLAIMING_BOX = 0; // player is drawing a new li 
const FILLED_BOX = 1;

// player status
const DRAWING = 0; // player is drawing a new line
const NOT_DRAWING = 1; // player is in a claimed tile

interface XYcoords {
    x: number;
    y: number;
}


let defualtTilesRemaining = boardRows * boardColumns;






let boardCoords:coords[][] = Array.from(Array(boardRows), () => Array(boardColumns).fill({ filled: EMPTY_BOX }));

for (let i=0; i<boardRows; i++) {

    if (i == 0 || i == boardRows-1) {
        // fill entire row
        boardCoords[i] = Array(boardColumns).fill({ filled: FILLED_BOX })
        defualtTilesRemaining -= boardColumns;

    } else {
        // file first and last element in row 
        boardCoords[i][0] = { filled: FILLED_BOX };
        boardCoords[i][boardColumns-1] = { filled: FILLED_BOX };
        defualtTilesRemaining -= 2;

    }
}

console.log(boardCoords)



const Canvas = () => {

    const [gameStatus, setGameStatus, gameStatusRef] = useState("ongoing");

    const [gameScore, setGameScore, gameScoreRef] = useState(0);


    const [canvasWidth, setCanvasWidth] = useState(defaultCanvasWidth);
    const [canvasHeight, setCanvasHeight] = useState(defaultCanvasHeight);

    const [boxCoords, setBoxCoords, boxCoordsRef] = useState(boardCoords);
    const [prevCoords, setPrevCoords, prevCoordsRef] = useState<XYcoords>({x: -1, y: -1});

    const [lineCoords, setLineCoords, lineCoordsRef] = useState<{ x: number, y: number, direction: String }[]>([]);

    const [tilesRemaining, setTilesRemaining, tilesRemainingRef] = useState(defualtTilesRemaining);

    const [ballX, setBallX, ballXRef] = useState((canvasWidth-ballDiameter)/2);
    const [ballY, setBallY, ballYRef] = useState((canvasHeight-ballDiameter)/2);


    const [ballSpeed, setBallSpeed, ballSpeedRef] = useState(defaultSpeed);
    const [ballSpeedX, setBallSpeedX, ballSpeedXRef] = useState(defaultSpeespeedX);
    const [ballSpeedY, setBallSpeedY, ballSpeedYRef] = useState(defaultSpeeSpeedY);

    const [playerX, setPlayerX, playerXRef] = useState((canvasWidth-playerWidth)/2);
    const [playerY, setPlayerY, playerYRef] = useState(canvasHeight-(2*playerHeight));
    const [playerSpeed, setPaddleSpeed, playerSpeedRef] = useState(defaultSpeed);

    const [playerStatus, setPlayerStatus, playerStatusRef] = useState(NOT_DRAWING);

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

            let currentBoxCoords = boxCoordsRef.current;
            // console.log(currentBoxCoords)

            // draw the background boxes
            currentBoxCoords.forEach((row, i) => {
                row.forEach((b, j) => {
                    if (b.filled != EMPTY_BOX) {
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

            let currentCol = Math.round(currentPlayerX/playerWidth)
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
                            setPlayerX(currentCol*playerWidth)
                        }
                        setPlayerY(prevPlayerY => prevPlayerY-playerSpeed)
                    }
                    break;
                case "down":
                    if(currentPlayerY+playerHeight >= canvasHeight) {
                        setPlayerY(canvasHeight-playerHeight)
                    } else {
                        if (previousKeyPressed !== "down") {
                            setPlayerX(currentCol*playerWidth)
                        }
                        setPlayerY(prevPlayerY => prevPlayerY+playerSpeed)
                    }
                    break;
            }

            let updatedBoxCoords = boxCoordsRef.current;
            let currentCoords = updatedBoxCoords[currentRow][currentCol];

            
            let currPlayerStatus = playerStatusRef.current;

            

            let prevRow = prevCoordsRef.current.x;
            let prevCol = prevCoordsRef.current.y;

            // check if new box has been reached
            if ((currentRow !== prevRow || currentCol !== prevCol) && currentKeyPressed !== 'none') {


                // check if current tile is not filled
                if (currentCoords.filled == EMPTY_BOX) {
                    
                    let updatedLineCoords = lineCoordsRef.current;

                    // console.log(updatedLineCoords);

                    // add current coords to lineCoords
                    updatedLineCoords.push({ x: currentCol, y: currentRow, direction: currentKeyPressed})


                    setPlayerStatus(DRAWING);
                    // updatedBoxCoords[currentRow][currentCol] = { filled: CLAIMING_BOX };
                    updatedBoxCoords[currentRow][currentCol] = { filled: CLAIMING_BOX };
                    
                    setBoxCoords(updatedBoxCoords);

                    setLineCoords(updatedLineCoords);


                    // console.log("line coords:");

                    // console.log(updatedLineCoords);

                    // console.log(updatedBoxCoords)
                    // console.log("i: " + currentRow + "j: " + currentCol)
                    // console.log(currentCoords.filled)

                    console.log("drawing");


                
                // if the the player is drawing & has created a closed shape
                } else if (currPlayerStatus === DRAWING && currentCoords.filled != EMPTY_BOX) {
                    setPlayerStatus(NOT_DRAWING);

                    console.log("not drawing");

                    // find coords in shapes created
                    let seedCoords = findShapeCoords();
                    console.log(seedCoords);



                    console.log("current tile: x: " + currentCol + " y: " + currentRow);

                    // fill smaller closed shape
                    floodFillShape(seedCoords);

                    // empty lineCoords list
                    // setLineCoords([]);
                }


                // update prevCoords
                setPrevCoords({x: currentRow, y: currentCol})
            }


            setKeyPressed({ previous: currentKeyPressed, current: currentKeyPressed });

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



    const findShapeCoords = () => {



        let currLineCoords = lineCoordsRef.current;
        
        
        console.log("Line Coords: ");
        console.log(currLineCoords);
        
        
        let currBoxCoords = boxCoordsRef.current;

        // let shapeCoords = {
        //     left: { x: -1, y: -1 },
        //     right: { x: -1, y: -1 },
        // }; 

        let shapeCoords: XYcoords[] = [];

        let leftCoordsFound = false; // coords to the 'left' of player movement
        let rightCoordsFound = false; // coords to the 'right' of player movement

        currLineCoords.forEach((tile, i) => {

            // travelling vertically
            if (tile.direction == "up" || tile.direction == "down") {

                // if player is going down, right is left
                let playerFlipped = (tile.direction == "down") ? true : false; 

                // check the left side of the board
                if ((!leftCoordsFound && !playerFlipped) || (!rightCoordsFound && playerFlipped)) {
                    let leftCol = tile.x - 1;
                    if (leftCol >= 0) {
                        let leftTile = currBoxCoords[tile.y][leftCol];
                        if (leftTile.filled === EMPTY_BOX) {

                            if (!playerFlipped) {
                                leftCoordsFound = true;
                                // shapeCoords.left = { x: leftCol, y: tile.y };
                            } else {
                                rightCoordsFound = true;
                                // shapeCoords.right = { x: leftCol, y: tile.y };
                            }
                            shapeCoords.push({ x: leftCol, y: tile.y });
                        }
                    }
                }

                // check the right side of the board
                if ((!rightCoordsFound && !playerFlipped) || (!leftCoordsFound && playerFlipped)) {

                    let rightCol = tile.x + 1;
                    if (rightCol < boardColumns) {
                        let rightTile = currBoxCoords[tile.y][rightCol];
                        if (rightTile.filled === EMPTY_BOX) {

                            if (!playerFlipped) {
                                rightCoordsFound = true;
                                // shapeCoords.right = { x: rightCol, y: tile.y };
                            } else {
                                leftCoordsFound = true;
                                // shapeCoords.left = { x: rightCol, y: tile.y };
                            }
                            shapeCoords.push({ x: rightCol, y: tile.y });
                        }
                    }
                }

            // travelling horizontally
            } else {
                // if player is going left, right is up, if going right, right is down
                let playerGoingRight = (tile.direction == "right") ? true : false; 


                // check the upper side of the board
                if ((!rightCoordsFound && !playerGoingRight) || (!leftCoordsFound && playerGoingRight)) {

                    let upperRow = tile.x - 1;
                    if (upperRow >= 0) {
                        let rightTile = currBoxCoords[upperRow][tile.x];
                        if (rightTile.filled === EMPTY_BOX) {
                            
                            if (!playerGoingRight) {
                                rightCoordsFound = true;
                                // shapeCoords.right = { x: tile.x, y: upperRow };
                            } else {
                                leftCoordsFound = true;
                                // shapeCoords.left = { x: tile.x, y: upperRow };
                            }
                            shapeCoords.push({ x: tile.x, y: upperRow });
                        }
                    }
                }

                // check the bottom side of the board
                if ((!leftCoordsFound && !playerGoingRight) || (!rightCoordsFound && playerGoingRight)) {
                    let lowerRow = tile.x + 1;
                    if (lowerRow < boardRows) {
                        let leftTile = currBoxCoords[lowerRow][tile.x];
                        if (leftTile.filled === EMPTY_BOX) {
                            

                            if (!playerGoingRight) {
                                leftCoordsFound = true;
                                // shapeCoords.left = { x: tile.x, y: lowerRow };
                            } else {
                                rightCoordsFound = true;
                                // shapeCoords.right = { x: tile.x, y: lowerRow };
                            }
                            shapeCoords.push({ x: tile.x, y: lowerRow });
                        }
                    }
                }


            }
        });

        return shapeCoords;

    }

    const floodFillShape = (coordsInShape : XYcoords[]) => {

        let currBoxCoords = boxCoordsRef.current;
        // coordsInShape.forEach((tile, i) => {

        for (let i = 0; i < coordsInShape.length; i++) {
            // check if shape is smaller or equal to half of remaining area

            // make a copy of boardCoords
            let boxCoordsCopy = [];
            for (let j = 0; j < currBoxCoords.length; j++) {
                boxCoordsCopy[j] = currBoxCoords[j].slice();
            }

            let currTile = coordsInShape[i];
            let tileCount = floodFillTile(currTile.y, currTile.x, boxCoordsCopy, 0);
            let currTilesRemaining = tilesRemainingRef.current;
            // check if it is the smaller shape
            if (tileCount <= currTilesRemaining / 2) {
                // mark claiming tiles as filled tiles


                
                console.log("tiles to fill: " +  tileCount);

                // currBoxCoords.forEach((row, r) => {
                //     row.forEach((b, c) => {
                //         if (b.filled == CLAIMING_BOX) {
                //             b.filled = FILLED_BOX;
                //         }
                //     })
                // });

                for (let row = 0; row < boardRows; row++) {
                    for (let col = 0; col < boardColumns; col++) {
                        let tile = boxCoordsCopy[row][col];
                        if (tile.filled == CLAIMING_BOX) {
                            currBoxCoords[row][col] = { filled: FILLED_BOX };
                            // setBoxCoords(currBoxCoords);
                        }
                    }
                }

                setBoxCoords(currBoxCoords);
                setTilesRemaining(currTilesRemaining-tileCount);

                break;
            }
        }    
    }


    // https://www.codeguru.co.in/2021/10/flood-fill-algorithm-in-javascript.html
    const floodFillTile = (row : number, col: number, tileCoords:coords[][], fillCount: number) => {

        let currTile = tileCoords[row][col];

        tileCoords[row][col] = { filled: CLAIMING_BOX };


        console.log("flooding tile: row:" + row + " col: " + col);
        console.log(currTile);


        // check if border (filled tile) is reached
        if (currTile.filled !== EMPTY_BOX) {
            return 0;
        } 

        fillCount++;



        

        // // visit up
        // fillCount += floodFillTile(row-1, col, tileCoords, fillCount);
        // // visit right
        // fillCount += floodFillTile(row+1, col, tileCoords, fillCount);
        
        // // visit left
        // fillCount += floodFillTile(row, col-1, tileCoords, fillCount);
        // // visit down
        // fillCount += floodFillTile(row, col+1, tileCoords, fillCount);


        return fillCount;

    }

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