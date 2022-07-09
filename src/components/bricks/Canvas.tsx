// React adaptation of: https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript


import React, { useCallback, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import useState from 'react-usestateref';
import Alert from './Alert';


const defaultCanvasWidth = 460;
const defaultCanvasHeight = 400;


const ballRadius = 8;

const paddleHeight = 10;
const paddleWidth = 70;


const brickRows = 5;
const brickColumns = 7;
const brickWidth = 60;
const brickHeight = 20;
const brickPadding = 5;
const brickOffsetTop = 25; 
const brickOffsetLeft = 5;

type coords = { [value: string]: number }

let origin: coords = {x: 0, y: 0, count: 1};

let brickCoords:coords[][] = Array.from(Array(brickRows), () => Array(brickColumns).fill({ x: 0, y: 0, count: 1 }));

const defaultSpeed = 5;

const defaultSpeedx = 3
const defaultSpeedy = -4




brickCoords.forEach((row, i) => {
    row.forEach((b, j) => {
        let brickX = (j*(brickWidth+brickPadding))+brickOffsetLeft;
        let brickY = (i*(brickHeight+brickPadding))+brickOffsetTop;
        console.log(`i ${i} j ${j}`)
        console.log(`x ${brickX} y ${brickY}`)
        // b.x = brickX;
        // b.y = brickY;

        brickCoords[i][j] = {x: brickX, y: brickY, count: 1};
        

        console.log(b)
    });
});

// console.log("lol " , brickCoords)

const Canvas = () => {





    

    // console.log(brickCoords);
    


    const [gameStatus, setGameStatus] = useState("ongoing");

    const [gameScore, setGameScore, gameScoreRef] = useState(0);


    const [canvasWidth, setCanvasWidth] = useState(defaultCanvasWidth);
    const [canvasHeight, setCanvasHeight] = useState(defaultCanvasHeight);


    // const [bricks, setBricks, bricksRef] = useState(brickCoords);


    const [ballx, setBallx, ballxRef] = useState(canvasWidth/2);
    const [bally, setBally, ballyRef] = useState(canvasHeight-30);


    const [ballSpeed, setBallSpeed, ballSpeedRef] = useState(defaultSpeed);
    const [balldx, setBalldx, balldxRef] = useState(defaultSpeedx);
    const [balldy, setBalldy, balldyRef] = useState(defaultSpeedy);

    const [paddlex, setPaddlex, paddlexRef] = useState((canvasWidth-paddleWidth)/2);
    const [paddley, setPaddley, paddleyRef] = useState(canvasHeight-(2*paddleHeight));

    // const [paddley, setPaddley, paddleyRef] = useState(-2);


    const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D | null>(null);
    const [canvasInterval, setCanvasInterval, canvasIntervalRef] = useState<NodeJS.Timer>();



    const [rightPressed, setRightPressed, rightPressedRef] = useState(false);
    const [leftPressed, setLeftPressed, leftPressedRef] = useState(false);

    useEffect(() => {
        

        // console.log("x ", ballx, "y ", bally);

        if(canvasContext) {
            canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);

            // draw the ball
            canvasContext.beginPath();
            canvasContext.arc(ballx, bally, ballRadius, 0, Math.PI*2);
            canvasContext.fillStyle = "#0095DD";
            canvasContext.fill();
            canvasContext.closePath();

            // draw the paddle
            canvasContext.beginPath();
            canvasContext.rect(paddlex, paddley, paddleWidth, paddleHeight);
            canvasContext.fillStyle = "#0095DD";
            canvasContext.fill();
            canvasContext.closePath();

            // draw the bricks
            brickCoords.forEach((row, i) => 
                row.forEach((b, j) => {
                    if (b.count > 0) {
                        canvasContext.beginPath();
                        canvasContext.rect( b.x, b.y, brickWidth, brickHeight);
                        canvasContext.fillStyle = "#0095DD";
                        canvasContext.fill();
                        canvasContext.closePath();
                    }

                })
            );

            // display the score
            canvasContext.font = "16px Arial";
            canvasContext.fillStyle = "#0095DD";
            canvasContext.fillText("Score: "+gameScore, 8, 18);


        }
    }, [canvasContext, ballx, bally])

    const draw = (ctx: CanvasRenderingContext2D) => {

        // console.log("drawing");

        if(ctx) {
            let currentBalldx = balldxRef.current;
            let currentBalldy = balldyRef.current;


            setBallx(prevBallx => prevBallx + currentBalldx);

            setBally(prevBally => prevBally + currentBalldy);


            let currentBallx = ballxRef.current;
            let nextBallx = ballxRef.current + currentBalldx
            let nextBally = ballyRef.current + currentBalldy
            
            let currentPaddlex = paddlexRef.current;
            let currentPaddley = paddleyRef.current;

            // check if ball hit the bricks
            for(let row=0; row<brickRows; row++) {
                for(let col=0; col<brickColumns; col++) {
                    // console.log(brickCoords)
                    let b = brickCoords[row][col];
                    if (b.count > 0) {
                        
                        if(nextBallx > b.x && nextBallx < b.x+brickWidth && nextBally > b.y && nextBally < b.y+brickHeight) {
                            setBalldy(prevBalldy => -prevBalldy);
                            b.count--;

                            setGameScore(prevGameScore => prevGameScore + 1);

                            if(gameScoreRef.current == brickRows*brickColumns) {
                                alert("YOU WIN, CONGRATULATIONS!");
                                document.location.reload();
                                // clearInterval(canvasInterval); // Needed for Chrome to end game
                            }


                        }
                        

                    }
                
                }
            }


            // check if ball hit the side walls
            if (nextBallx > canvasWidth-ballRadius ||
                nextBallx < ballRadius) {
                setBalldx(prevBalldx => -prevBalldx);
            } 
            
            // check if ball hit the top wall
            if (nextBally < ballRadius) {    
                setBalldy(prevBalldy => -prevBalldy);
            }

            // check if ball is hit the ground`
            else if (nextBally > canvasHeight-ballRadius) {

                    // Game Over
                    setGameStatus("lost");
                    console.log("gameover")

                    // console.log(canvasIntervalRef.current)

                    clearInterval(canvasIntervalRef.current);
            }
            // check if ball hit the paddle
            else if (nextBally > currentPaddley-ballRadius &&
                currentBallx > currentPaddlex &&
                currentBallx < currentPaddlex + paddleWidth) {

                let paddleCenter = currentPaddlex + (paddleWidth/2);
                
                // angle of the ball increases towards the edge of the paddle
                let distFromCenter = Math.abs(paddleCenter-currentBallx)
                let percentFromCenter = distFromCenter / (paddleWidth/2);
                
                let speedx = ballSpeedRef.current*percentFromCenter
                
                // if the ball hit left side of the paddle, ball bounces left  
                speedx = (currentBallx < paddleCenter) ? -speedx : speedx 

                // using Pythagorean theorem
                let speedy = ((ballSpeedRef.current**2) - (speedx**2))**0.5
                speedy = (currentBalldy > 0) ? -speedy : speedy;
                
                
                setBalldx(speedx);
                setBalldy(speedy);

                console.log(percentFromCenter)
            
            }

            // if right key is pressed, move paddle right
            if (rightPressedRef.current) {
                setPaddlex(prevPaddlex => prevPaddlex+7)


                if(paddlexRef.current+paddleWidth > canvasWidth) {
                    setPaddlex(canvasWidth-paddleWidth)
                }

            }
    
            // if left key is pressed, move paddle left
            else if (leftPressedRef.current) {
                setPaddlex(prevPaddlex => prevPaddlex-7)

                if(paddlexRef.current < 0) {
                    setPaddlex(0)
                }
            }
        }
    };

  
    useEffect(() => {

        console.log("hi begin");


        let canvasCnt = document.getElementById("canvas-cnt") as HTMLDivElement;
        canvasCnt.focus();


        let canvas = document.getElementById("bricks-canvas") as HTMLCanvasElement;

        let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

        setCanvasContext(ctx);

        const intervalId = setInterval(() => draw(ctx), 15);

        console.log("INTERVAL", intervalId)
        setCanvasInterval(intervalId)

        // requestAnimationFrame(() => draw(ctx));

    }, []);


    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {

        if (gameStatus === "ongoing") {

            if (event.code === "ArrowLeft") {
                setLeftPressed(true);
                // console.log("ArrowLeft pressed");

            
            } else if (event.code === "ArrowRight") {
                // console.log("ArrowRight pressed");
                
                setRightPressed(true);
            }
        }    
    }

    const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {

        if (gameStatus === "ongoing") {
            if (event.code === "ArrowLeft") {
                //   alert(`You have typed "${enteredText}"`);
                    // console.log("ArrowLeft lifted");
                    
                    setLeftPressed(false);
        
            
                } else if (event.code === "ArrowRight") {
                    // console.log("ArrowRight lifted");
                    
                    setRightPressed(false);
                }
        }

    }
  
    return (
    <div id="canvas-cnt" className="canvas-cnt" 
        tabIndex={-1} 
        onKeyDown={(e) => handleKeyDown(e)}
        onKeyUp={(e) => handleKeyUp(e)} >
        <canvas id="bricks-canvas" 
                className="canvas" 
                width={canvasWidth} height={canvasHeight} 
                style={{ border: "1px solid #d3d3d3" }}>

        </canvas>
        { gameStatus !== "ongoing" && <Alert result ={gameStatus} />}
    </div>
  )
};

export default Canvas;