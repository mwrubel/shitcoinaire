import React from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Signup from "./components/Signup"
import Login from "./components/Login"
import Portfolio from "./components/Portfolio"
// import Navbar from "./components/Navbar"
import { UserProvider } from "./context/user"
import Search from './components/Search';
import Coin from './containers/Coin'
import Coins from './containers/Coins';
import Positions from './containers/Positions';
import Position from './containers/Position';
/**
 * 
Views:

Login/signup - Takes you to home
Home - A landing page with tips to get started, useEffect updates coin values, portfolio
Coins - Allows a user to search coins various ways (by ticker, by market cap etc.)
Coins show page - allows to view chart of a coin, buy/ sell a coin plus extra info 
Portfolio show page - All the details on a given portfolio and its coins
Position show page - with info, can add to position, close position
Search - find coins to add to /coins, can add positions from search/ticker
*/

function App() {
  return (
    <div className="App">
      <UserProvider> 
       
        <Router>
          {/* <Navbar />  */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/portfolio" element={<Portfolio />} /> 
          <Route exact path="/positions" element={<Positions />} /> 
          <Route exact path="/positions/:id" element={<Position />} /> 
          <Route exact path="/coins" element={<Coins />} />
          <Route exact path="/coins/:id" element={<Coin />} />
          <Route exact path="/search" element={<Search />} />
        </Routes>
  
      </Router>
      </UserProvider>
    </div>
  );
}

export default App;
