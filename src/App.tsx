import React from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Game from './components/Game';
import TopNav from './components/TopNav';

function App() {
  return (
    <div className="App">
      <TopNav />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Game game="tic-tac-toe" />} />
					<Route path="tic-tac-toe" element={<Game game="tic-tac-toe" />} />
					<Route path="bricks" element={<Game game="bricks"/>} />
					<Route path="xonix" element={<Game game="xonix"/>} />
				</Routes>
			</BrowserRouter>
    </div>
  );
}

export default App;
