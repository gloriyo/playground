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
					<Route path="/" element={<Game />} />
					<Route path="game" element={<Game />} />
				</Routes>
			</BrowserRouter>
    </div>
  );
}

export default App;
