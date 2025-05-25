import React from 'react';
import Card from '../Card/Card';
import './GameBoard.css';

// PUBLIC_INTERFACE
/**
 * GameBoard component that displays a grid of cards
 *
 * @param {Object} props - Component props
 * @param {Array} props.cards - Array of card objects
 * @param {Function} props.onCardClick - Function to handle card clicks
 * @param {number} props.numPairs - Number of pairs in the current game
 * @returns {React.Component} GameBoard component
 */
const GameBoard = ({ cards, onCardClick, numPairs }) => {
  // Determine the number of columns based on the number of pairs
  // Aims for a somewhat square layout
  let columns = 4; // Default for 8 pairs (16 cards)
  if (numPairs <= 4) { // 8 cards or less
    columns = Math.ceil(Math.sqrt(numPairs * 2)); // e.g. 4 pairs (8 cards) -> 3 cols, 2 pairs (4 cards) -> 2 cols
    if (numPairs * 2 === 6) columns = 3; // Special case for 6 cards (3x2)
    if (numPairs * 2 === 2) columns = 2; // Special case for 2 cards (2x1)
  } else if (numPairs <= 6) { // 10 or 12 cards
    columns = Math.ceil((numPairs * 2) / 3); // Try to fit in 3 rows e.g. 12 cards -> 4 cols
    if (numPairs === 5) columns = 5; // 10 cards (5x2)
  } else if (numPairs <= 8) { // 16 cards
    columns = 4;
  } else if (numPairs <= 10) { // 20 cards
    columns = 5;
  } else if (numPairs <= 12) { // 24 cards
    columns = 6;
  }


  const gameBoardStyle = {
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
  };

  return (
    <div className="game-board" style={gameBoardStyle} role="grid" aria-label="Memory Match Game Board">
      {cards.map((card, index) => (
        <div
          key={card.id}
          className="board-cell"
          style={{ animationDelay: `${index * 0.05}s` }}
          role="gridcell"
        >
          <Card
            id={card.id}
            animal={card.animal} // Pass the animal object to the Card
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
