import React from 'react';
import './ScoreBoard.css';

/**
 * ScoreBoard component for displaying game statistics and controls
 * 
 * @param {Object} props - Component props
 * @param {number} props.score - Current game score
 * @param {number} props.moves - Number of moves made
 * @param {number} props.matches - Number of matches found
 * @param {number} props.totalPairs - Total number of pairs in the game
 * @param {Function} props.onRestart - Function to handle restart button clicks
 * @returns {React.Component} ScoreBoard component
 */
const ScoreBoard = ({ score, moves, matches, totalPairs, onRestart }) => {
  // Calculate progress percentage
  const progressPercentage = totalPairs > 0 ? (matches / totalPairs) * 100 : 0;
  
  return (
    <div className="score-board-container">
      <div className="score-panel">
        <div className="stats-container">
          <div className="stat-item score-stat" title="Your current game score">
            <div className="stat-label">Score</div>
            <div className="stat-value">{score}</div>
          </div>
          
          <div className="stat-item" title="Number of moves you've made">
            <div className="stat-label">Moves</div>
            <div className="stat-value">{moves}</div>
          </div>
          
          <div className="stat-item" title="Pairs matched out of total">
            <div className="stat-label">Matches</div>
            <div className="stat-value">{matches}/{totalPairs}</div>
          </div>
        </div>
        
        <div className="game-actions">
          <button 
            className="restart-button"
            onClick={onRestart}
            aria-label="Restart Game"
            title="Restart the game"
          >
            <span className="restart-icon">⟳</span>
            Restart Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
