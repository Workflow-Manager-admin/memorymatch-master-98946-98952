import React from 'react';
import MemoryGame from './components/MemoryGame/MemoryGame';
import './App.css';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> MemoryMatch Master
            </div>
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
}

export default App;
