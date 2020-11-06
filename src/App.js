import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Home from './Home';
import "react-multi-carousel/lib/styles.css";
import './App.css';

function App() {
  
  return (
    <div className="App">
      <Header />
      <Home />

    </div>
  );
}

export default App;