import React from 'react';
import MemoryGame from './components/MemoryGame/MemoryGame';
import './App.css';

/**
 * Main App component for the MemoryMatch Master game
 * 
 * @returns {React.Component} App component
 */
const App = () => {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div className="logo">
            <div className="logo-icon">
              <span>M</span>
            </div>
            <span className="logo-text">MemoryMatch Master</span>
          </div>
        </div>
      </nav>

      <main>
        <div className="container">
          <MemoryGame />
        </div>
      </main>
    </div>
  );
};

export default App;
