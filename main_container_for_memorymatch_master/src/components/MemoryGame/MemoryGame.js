import React, { useState, useEffect } from 'react';
import GameBoard from '../GameBoard/GameBoard';
import ScoreBoard from '../ScoreBoard/ScoreBoard';
import { generateCardData, checkForMatch, calculateScore } from '../../utils/gameUtils';
import './MemoryGame.css';

/**
 * Main container for the Memory Match game
 * 
 * @returns {React.Component} MemoryGame component
 */
const MemoryGame = () => {
  // Game configuration
  const pairsCount = 8; // Number of pairs in the game
  const flipDelay = 1000; // Time in ms before unmatched cards flip back

  // Game state
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // Initialize game
  useEffect(() => {
    startNewGame();
  }, []);

  // Check for game completion
  useEffect(() => {
    if (matches === pairsCount && cards.length > 0) {
      // Game over!
      setGameOver(true);
    }
  }, [matches, pairsCount, cards.length]);

  // Update score when moves or matches change
  useEffect(() => {
    setScore(calculateScore(matches, moves, pairsCount));
  }, [matches, moves, pairsCount]);

  /**
   * Start a new game
   */
  const startNewGame = () => {
    setCards(generateCardData(pairsCount));
    setFlippedCards([]);
    setMatches(0);
    setMoves(0);
    setScore(0);
    setIsLocked(false);
    setGameOver(false);
  };

  /**
   * Handle card click
   * @param {string} cardId - ID of the clicked card
   */
  const handleCardClick = (cardId) => {
    // Ignore click if game is locked or already two cards flipped
    if (isLocked || flippedCards.length >= 2) return;

    // Find the clicked card
    const clickedCard = cards.find(card => card.id === cardId);
    
    // Ignore click if card is already flipped
    if (clickedCard.isFlipped) return;

    // Update cards state to flip the clicked card
    setCards(prevCards => 
      prevCards.map(card => 
        card.id === cardId ? { ...card, isFlipped: true } : card
      )
    );

    // Add card to flippedCards
    setFlippedCards(prevFlipped => [...prevFlipped, clickedCard]);
    
    // If two cards are flipped, check for a match
    if (flippedCards.length === 1) {
      setMoves(prevMoves => prevMoves + 1);
      setIsLocked(true);
      
      setTimeout(() => {
        const firstCard = flippedCards[0];
        
        // Check if cards match
        if (checkForMatch(firstCard, clickedCard)) {
          // Match found!
          setMatches(prevMatches => prevMatches + 1);
          setCards(prevCards =>
            prevCards.map(card =>
              (card.id === firstCard.id || card.id === cardId)
                ? { ...card, isMatched: true, isFlipped: true }
                : card
            )
          );
        } else {
          // No match, flip cards back
          setCards(prevCards =>
            prevCards.map(card =>
              (card.id === firstCard.id || card.id === cardId)
                ? { ...card, isFlipped: false }
                : card
            )
          );
        }
        
        setFlippedCards([]);
        setIsLocked(false);
      }, flipDelay);
    }
  };

  return (
    <div className="memory-game">
      <h1 className="game-title">MemoryMatch Master</h1>
      
      <ScoreBoard
        score={score}
        moves={moves}
        matches={matches}
        totalPairs={pairsCount}
        onRestart={startNewGame}
      />
      
      <GameBoard 
        cards={cards}
        onCardClick={handleCardClick}
      />
      
      {gameOver && (
        <div className="game-over">
          <h2>Congratulations!</h2>
          <p>You completed the game in {moves} moves with a score of {score}!</p>
          <button className="btn" onClick={startNewGame}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
