import React from 'react';
import Card from '../Card/Card';
import './GameBoard.css';

/**
 * GameBoard component that displays a grid of cards
 * 
 * @param {Object} props - Component props
 * @param {Array} props.cards - Array of card objects
 * @param {Function} props.onCardClick - Function to handle card clicks
 * @returns {React.Component} GameBoard component
 */
const GameBoard = ({ cards, onCardClick }) => {
  return (
    <div className="game-board" role="grid" aria-label="Memory Match Game Board">
      {cards.map((card, index) => (
        <div 
          key={card.id} 
          className="board-cell" 
          style={{ animationDelay: `${index * 0.05}s` }}
          role="gridcell"
        >
          <Card
            id={card.id}
            value={card.value}
            isFlipped={card.isFlipped}
            isMatched={card.isMatched}
            onClick={onCardClick}
          />
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
