import React, { useEffect, useState } from 'react';


interface props {
    boxType: string;
}

let colorScheme: { [boxType: string]: string } = {none: '#d0f7ff', player: 'white'};

// colorScheme.none = "d0f7ff";
// colorScheme.player = "white";


const Box = ({ boxType }  : props) => {

    // const [backgroundColor, setBackgroundColor] = useState("");

    // console.log(colorScheme);



    const handleBoxClick = () => {
        console.log("clicked");

    }


    return (
        <button className="box" style={{ background: colorScheme[boxType] }} >

        </button>
    )
};

export default Box;
