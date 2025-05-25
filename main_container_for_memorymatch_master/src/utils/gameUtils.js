import { getAnimalSet } from './animalData';

/**
 * Game utility functions for Memory Match game
 */

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

/**
 * Generate card data for the game with pairs of matching cards
 * @param {number} pairsCount - Number of pairs to generate (default 8)
 * @returns {Array} - Array of card objects with id, animal data, and status
 */
export const generateCardData = (pairsCount = 8) => {
  const selectedAnimals = getAnimalSet(pairsCount);
  
  // Create pairs of cards
  let cards = [];
  selectedAnimals.forEach((animal, index) => {
    // Create two cards with the same animal (a matching pair)
    cards.push(
      {
        id: `card-${animal.name.toLowerCase()}-${index}-1`, // Ensure unique ID
        animal: animal, // Store the whole animal object
        value: animal.name, // The 'value' for matching logic will be the animal's name
        isFlipped: false,
        isMatched: false
      },
      {
        id: `card-${animal.name.toLowerCase()}-${index}-2`, // Ensure unique ID
        animal: animal, // Store the whole animal object
        value: animal.name, // The 'value' for matching logic will be the animal's name
        isFlipped: false,
        isMatched: false
      }
    );
  });
  
  // Shuffle the cards
  return shuffleArray(cards);
};

/**
 * Check if two cards match based on their values
 * @param {Object} cardOne - First card object
 * @param {Object} cardTwo - Second card object
 * @returns {boolean} - True if cards match, false otherwise
 */
export const checkForMatch = (cardOne, cardTwo) => {
  return cardOne.value === cardTwo.value;
};

/**
 * Calculate score based on matches and moves
 * @param {number} matches - Number of matches found
 * @param {number} moves - Number of moves made
 * @param {number} totalPairs - Total number of pairs in the game
 * @returns {number} - Calculated score
 */
export const calculateScore = (matches, moves, totalPairs) => {
  if (moves === 0) return 0;
  
  // Base score: percentage of pairs found
  const baseScore = Math.floor((matches / totalPairs) * 100);
  
  // Efficiency bonus: reward fewer moves
  // Perfect game would be totalPairs * 2 moves
  const perfectMoves = totalPairs * 2;
  const efficiency = perfectMoves / Math.max(moves, perfectMoves);
  const efficiencyBonus = Math.floor(efficiency * 50); // Up to 50 bonus points
  
  return baseScore + efficiencyBonus;
};
