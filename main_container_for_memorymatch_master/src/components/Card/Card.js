import React from 'react';
import './Card.css';

// PUBLIC_INTERFACE
/**
 * Card component representing a single card in the memory game
 *
 * @param {Object} props - Component props
 * @param {string} props.id - Unique identifier for the card
 * @param {Object} props.animal - The animal object associated with this card
 * @param {string} props.value - The animal name (used for accessibility and as fallback)
 * @param {boolean} props.isFlipped - Whether the card is currently flipped
 * @param {boolean} props.isMatched - Whether the card has been matched
 * @param {Function} props.onClick - Click handler function
 * @returns {React.Component} Card component
 */
const Card = ({ id, animal, value, isFlipped, isMatched, onClick }) => {
  /**
   * Handle click on the card
   */
  const handleClick = () => {
    // Only allow clicking if the card is not already flipped or matched
    if (!isFlipped && !isMatched) {
      onClick(id);
    }
  };

  /**
   * Handle keyboard navigation for accessibility
   */
  const handleKeyDown = (e) => {
    // Activate card on Enter or Space
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  // Determine card classes based on state
  const cardClasses = `card-container ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`;

  return (
    <div 
      className={cardClasses} 
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Card ${isFlipped ? 'showing ' + value : 'face down'} ${isMatched ? ', matched' : ''}`}
      aria-pressed={isFlipped}
    >
      <div className="card-inner">
        <div className="card-back">
          <span className="card-back-symbol">🐾</span> {/* Paw print for animal theme */}
        </div>
        <div className="card-front">
          {animal && animal.image ? (
            <img src={process.env.PUBLIC_URL + animal.image} alt={animal.name} className="card-animal-image" />
          ) : (
            <span className="card-value">{value}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
