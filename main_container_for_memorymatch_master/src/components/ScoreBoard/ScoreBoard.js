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
  return (
    <div className="score-board">
      <div className="score-item">
        <div className="score-label">Score</div>
        <div className="score-value">{score}</div>
      </div>
      
      <div className="score-item">
        <div className="score-label">Moves</div>
        <div className="score-value">{moves}</div>
      </div>
      
      <div className="score-item">
        <div className="score-label">Matches</div>
        <div className="score-value">{matches}/{totalPairs}</div>
      </div>
      
      <button className="btn restart-btn" onClick={onRestart}>
        Restart Game
      </button>
    </div>
  );
};

export default ScoreBoard;
