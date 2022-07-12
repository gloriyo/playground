import React, { useState } from 'react';
import TBoard from './tic-tac-toe/Board';
import BBoard from './bricks/Board';
import XBoard from './xonix/Board';

interface props {
	game: string;

}

const Game = ({ game } : props ) => {


	const [gameName, setGameName] = useState(game);
	return (
		<div>
			{gameName == "tic-tac-toe" && <TBoard />}
			{gameName == "bricks" && <BBoard />}
			{gameName == "xonix" && <XBoard />}
		</div>
		
	
	)
};

export default Game;
