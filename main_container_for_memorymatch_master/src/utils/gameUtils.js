import { getAnimalSet } from './animalData';

/**
 * Game utility functions for Memory Match game
 */

// PUBLIC_INTERFACE
/**
 * Fisher-Yates shuffle algorithm to randomize array elements
 * @param {Array} array - The array to shuffle
 * @returns {Array} - The shuffled array
 */
export const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

// PUBLIC_INTERFACE
/**
 * Generate card data for the game with pairs of matching cards
 * @param {number} pairsCount - Number of pairs to generate (default 8)
 * @returns {Array} - Array of card objects with id, animal data, and status
 */
export const generateCardData = (pairsCount = 8) => {
  const selectedAnimals = getAnimalSet(pairsCount);
  
  let cards = [];
  selectedAnimals.forEach((animal, index) => {
    cards.push(
      {
        id: `card-${animal.name.toLowerCase().replace(/\s+/g, '-')}-${index}-1`, // Ensure unique ID, handle spaces in names
        animal: animal, 
        value: animal.name, 
        isFlipped: false,
        isMatched: false
      },
      {
        id: `card-${animal.name.toLowerCase().replace(/\s+/g, '-')}-${index}-2`, // Ensure unique ID, handle spaces in names
        animal: animal, 
        value: animal.name, 
        isFlipped: false,
        isMatched: false
      }
    );
  });
  
  return shuffleArray(cards);
};

// PUBLIC_INTERFACE
/**
 * Check if two cards match based on their values (animal names)
 * @param {Object} cardOne - First card object
 * @param {Object} cardTwo - Second card object
 * @returns {boolean} - True if cards match, false otherwise
 */
export const checkForMatch = (cardOne, cardTwo) => {
  if (!cardOne || !cardTwo) return false;
  return cardOne.value === cardTwo.value;
};

// PUBLIC_INTERFACE
/**
 * Calculate score based on matches and moves
 * @param {number} matches - Number of matches found
 * @param {number} moves - Number of moves made
 * @param {number} totalPairs - Total number of pairs in the game
 * @returns {number} - Calculated score
 */
export const calculateScore = (matches, moves, totalPairs) => {
  if (totalPairs === 0) return 0; // Avoid division by zero
  if (moves === 0 && matches === 0) return 0; // No score if no moves/matches

  // Base score: percentage of pairs found, ensure it's not negative or over 100
  const baseScore = Math.max(0, Math.min(100, Math.floor((matches / totalPairs) * 100)));
  
  // Efficiency bonus: reward fewer moves
  const perfectMoves = totalPairs * 2;
  
  // Avoid division by zero for efficiency if moves is 0 but there are matches (should not happen with current logic)
  // or if perfectMoves is 0 (i.e. totalPairs is 0, handled above)
  if (moves === 0) return baseScore;

  const efficiency = perfectMoves / Math.max(moves, perfectMoves); // Ensure moves is at least perfectMoves to avoid bonus > 50
  const efficiencyBonus = Math.floor(efficiency * 50);
  
  return Math.max(0, baseScore + efficiencyBonus); // Ensure score is not negative
};
