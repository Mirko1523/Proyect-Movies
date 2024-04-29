import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/movies';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
     <Route path='/' element={<Home/>}></Route>
     </Routes>
    </div>
    </Router>
  );
}

export default App;
