import React from 'react';
import './Card.css';

/**
 * Card component representing a single card in the memory game
 * 
 * @param {Object} props - Component props
 * @param {string} props.id - Unique identifier for the card
 * @param {string} props.value - The value/symbol on the card
 * @param {boolean} props.isFlipped - Whether the card is currently flipped
 * @param {boolean} props.isMatched - Whether the card has been matched
 * @param {Function} props.onClick - Click handler function
 * @returns {React.Component} Card component
 */
const Card = ({ id, value, isFlipped, isMatched, onClick }) => {
  /**
   * Handle click on the card
   */
  const handleClick = () => {
    // Only allow clicking if the card is not already flipped or matched
    if (!isFlipped && !isMatched) {
      onClick(id);
    }
  };

  // Determine card classes based on state
  const cardClasses = `card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`;

  return (
    <div className={cardClasses} onClick={handleClick}>
      <div className="card-inner">
        <div className="card-back">
          <span>?</span>
        </div>
        <div className="card-front">
          <span className="card-value">{value}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
