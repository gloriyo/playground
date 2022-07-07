// React adaptation of: https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript


import React, { useCallback, useEffect } from 'react';

import useState from 'react-usestateref';


interface props {
  result: string;

}

const Canvas = () => {


    const ballRadius = 10;

    const paddleHeight = 10;
    const paddleWidth = 75;




    const [canvasWidth, setCanvasWidth] = useState(300);
    const [canvasHeight, setCanvasHeight] = useState(300);


    const [ballx, setBallx, ballxRef] = useState(canvasWidth/2);
    const [bally, setBally, ballyRef] = useState(canvasHeight-30);


    const [balldx, setBalldx, balldxRef] = useState(2);
    const [balldy, setBalldy, balldyRef] = useState(-2);

    const [paddlex, setPaddlex, paddlexRef] = useState((canvasWidth-paddleWidth)/2);
    // const [paddley, setPaddley, paddleyRef] = useState(-2);


    const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D | null>(null);

    useEffect(() => {
        

        console.log("x ", ballx, "y ", bally);

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
            canvasContext.rect(paddlex, canvasHeight-paddleHeight, paddleWidth, paddleHeight);
            canvasContext.fillStyle = "#0095DD";
            canvasContext.fill();
            canvasContext.closePath();

        }

    }, [canvasContext, ballx, bally])

    const draw = (ctx: CanvasRenderingContext2D) => {

        console.log("drawing");

        if(ctx) {
            // ctx.clearRect(0, 0, canvasWidth, canvasHeight);

            
            // check ball collision
            // setBallx(prevBallx => {
            //     if (prevBallx+balldx > canvasWidth-ballRadius) {

            //         console.log("balldx: ", balldx)


            //         console.log("ball collision")
            //         if(balldx > 0)
            //             setBalldx(-balldx);
            //     }
            //     console.log("ball colaaaaaaaaaaaaaaaaaaalision")

            //     return prevBallx + balldx});


            let currentBalldx = balldxRef.current;
            let currentBalldy = balldyRef.current;


            setBallx(prevBallx => prevBallx + currentBalldx);

            setBally(prevBally => prevBally + currentBalldy);

    



    
        }

    };

    useEffect(() => {

        let currentBalldx = balldxRef.current;
        let currentBalldy = balldyRef.current;


        if (ballxRef.current+currentBalldx > canvasWidth-ballRadius ||
            ballxRef.current+currentBalldx < ballRadius) {
            console.log("ball flip x")
            console.log("ball flip x")
            console.log("ball flip x")
            console.log("ball flip x")


            setBalldx(prevBalldx => -prevBalldx);
        }

        if (ballyRef.current+currentBalldy > canvasHeight-ballRadius ||
            ballyRef.current+currentBalldy < ballRadius) {
            console.log("ball flip y")
            console.log("ball flip y")
            console.log("ball flip y")
            console.log("ball flip y")


            setBalldy(prevBalldy => -prevBalldy);
        }



    }, [ballx, bally]);


    const drawIntervals = useCallback(() => {

        console.log("hi");



        


        
    }, []);

  
    useEffect(() => {

        console.log("hi begin");


        let canvasCnt = document.getElementById("canvas-cnt") as HTMLDivElement;
        canvasCnt.focus();


        let canvas = document.getElementById("bricks-canvas") as HTMLCanvasElement;



        let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

        setCanvasContext(ctx);

        const intervalId = setInterval(() => draw(ctx), 1000);

        return () => clearInterval(intervalId);

    }, []);


    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        console.log(event);
        if (event.code === "ArrowLeft") {
            //   alert(`You have typed "${enteredText}"`);
                console.log("ArrowLeft pressed");
        

        
            } else if (event.code === "ArrowRight") {
                console.log("ArrowRight pressed");

            }
    }

    const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
        console.log(event);
        if (event.code === "ArrowLeft") {
            //   alert(`You have typed "${enteredText}"`);
                console.log("ArrowLeft lifted");
        

        
            } else if (event.code === "ArrowRight") {
                console.log("ArrowRight lifted");

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
       
    </div>
  )
};

export default Canvas;