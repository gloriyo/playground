// React adaptation of: https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript


import React, { useEffect, useState } from 'react';

interface props {
  result: string;

}

const Canvas = () => {




    const [canvasWidth, setCanvasWidth] = useState(300);
    const [canvasHeight, setCanvasHeight] = useState(300);


    const [ballx, setBallx] = useState(canvasWidth/2);
    const [bally, setBally] = useState(canvasHeight-30);


    const [balldx, setBalldx] = useState(2);
    const [balldy, setBalldy] = useState(-2);

    const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D | null>(null);

    useEffect(() => {
        

        console.log("x ", ballx, "y ", bally);

        if(canvasContext) {
            canvasContext.beginPath();
            canvasContext.arc(ballx, bally, 10, 0, Math.PI*2);
            canvasContext.fillStyle = "#0095DD";
            canvasContext.fill();
            canvasContext.closePath();
        }

    }, [ballx, bally])

    const draw = (ctx: CanvasRenderingContext2D) => {


        console.log("drawing");
        console.log("x ", ballx, "y ", bally);

        let updatedBallx = ballx + balldx;
        let updatedBally = bally + balldy;

        setBallx(prevBallx => prevBallx + balldx);
        setBally(prevBally => prevBally + balldy);


        console.log("x ", ballx, "y ", bally);
    }

    // const drawIntervals = (ctx: CanvasRenderingContext2D) => {
    //     setInterval(() => draw(ctx), 500);
    // }


    // componentDidMount() {

    // }


    // const useMountEffect = () => useEffect(() => {

    //     // console.log(canvasWidth/2);
    //     // setBallx(canvasWidth/2);
    //     // setBally(canvasHeight/2);



    //     let canvas = document.getElementById("bricks-canvas") as HTMLCanvasElement;
    //     let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    //     // draw(ctx);

    //     drawIntervals(ctx);

    // }, []);
  
    useEffect(() => {

        // console.log(canvasWidth/2);
        // setBallx(canvasWidth/2);
        // setBally(canvasHeight/2);



        let canvas = document.getElementById("bricks-canvas") as HTMLCanvasElement;
        let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

        setCanvasContext(ctx);

        // draw(ctx);

        // drawIntervals(ctx);

        const intervalId = setInterval(() => draw(ctx), 100);

        return () => clearInterval(intervalId);


    }, []);


  
    return (
    <div className="canvas-cnt">
        <canvas id="bricks-canvas" className="canvas" width={canvasWidth} height={canvasHeight} style={{ border: "1px solid #d3d3d3" }}>

        </canvas>
       
    </div>
  )
};

export default Canvas;