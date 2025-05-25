import React from 'react';
import './AnimalInfoModal.css';

// PUBLIC_INTERFACE
/**
 * AnimalInfoModal component displays educational facts about a matched animal.
 *
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the modal is currently open
 * @param {Function} props.onClose - Function to call when the modal should be closed
 * @param {Object} props.animal - The animal object containing name, image, and facts
 * @returns {React.Component|null} AnimalInfoModal component or null if not open
 */
const AnimalInfoModal = ({ isOpen, onClose, animal }) => {
  if (!isOpen || !animal) {
    return null;
  }

  return (
    <div className="animal-info-modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="animal-modal-title">
      <div className="animal-info-modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 id="animal-modal-title">{animal.name}</h2>
        
        <div className="animal-image-container">
          <img src={process.env.PUBLIC_URL + animal.image} alt={animal.name} />
        </div>

        <div className="animal-facts">
          <p><strong>Habitat:</strong> {animal.facts.habitat}</p>
          <p><strong>Diet:</strong> {animal.facts.diet}</p>
          <p><strong>Unique Features:</strong> {animal.facts.uniqueFeatures}</p>
          <p><strong>Fun Fact:</strong> {animal.facts.funFact}</p>
        </div>

        <button className="close-modal-btn" onClick={onClose} aria-label="Close animal facts">
          Cool!
        </button>
      </div>
    </div>
  );
};

export default AnimalInfoModal;
