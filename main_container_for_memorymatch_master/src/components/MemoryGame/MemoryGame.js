import React, { useState, useEffect, useCallback } from 'react';
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
  const [confetti, setConfetti] = useState([]);

  // Initialize game
  useEffect(() => {
    startNewGame();
  }, []);

  // Check for game completion
  useEffect(() => {
    if (matches === pairsCount && cards.length > 0) {
      // Game over!
      setTimeout(() => {
        setGameOver(true);
        createConfetti();
      }, 800);
    }
  }, [matches, pairsCount, cards.length]);

  // Update score when moves or matches change
  useEffect(() => {
    setScore(calculateScore(matches, moves, pairsCount));
  }, [matches, moves, pairsCount]);

  /**
   * Generate confetti elements for celebration
   */
  const createConfetti = useCallback(() => {
    // Create confetti pieces with random positions, colors and delays
    const colors = [
      'var(--primary)', 
      'var(--primary-light)', 
      'var(--secondary)', 
      'var(--secondary-light)',
      '#22C55E',
      '#F59E0B'
    ];
    
    const pieces = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: -20 - Math.random() * 100,
      rotation: Math.random() * 360,
      size: Math.random() * 8 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 2
    }));
    
    setConfetti(pieces);
  }, []);

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
    setConfetti([]);
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

  // Calculate perfect moves (the minimum possible)
  const perfectMoves = pairsCount * 2;
  
  // Determine performance message
  let performanceMessage = "Great job completing the game!";
  if (moves <= perfectMoves) {
    performanceMessage = "Wow! Perfect memory! You couldn't have done better!";
  } else if (moves <= perfectMoves * 1.5) {
    performanceMessage = "Excellent memory skills! That was impressive!";
  } else if (moves <= perfectMoves * 2) {
    performanceMessage = "Great performance! Your memory is quite strong!";
  }

  return (
    <div className="memory-game-container">
      <div className="game-header">
        <h1 className="game-title">MemoryMatch Master</h1>
        <p className="game-subtitle">
          Find matching pairs of cards to test your memory skills. The fewer moves, the higher your score!
        </p>
      </div>
      
      <ScoreBoard
        score={score}
        moves={moves}
        matches={matches}
        totalPairs={pairsCount}
        onRestart={startNewGame}
      />
      
      <div className="game-wrapper">
        <GameBoard 
          cards={cards}
          onCardClick={handleCardClick}
        />
      </div>
      
      {gameOver && (
        <div className="game-over-modal" role="dialog" aria-labelledby="game-over-title">
          <div className="celebration-icon">🏆</div>
          
          {confetti.map(piece => (
            <div 
              key={piece.id}
              className="confetti"
              style={{
                left: `${piece.x}px`,
                top: `${piece.y}px`,
                width: `${piece.size}px`,
                height: `${piece.size}px`,
                backgroundColor: piece.color,
                transform: `rotate(${piece.rotation}deg)`,
                animation: `confetti-fall ${2 + Math.random()}s linear ${piece.delay}s forwards`
              }}
            />
          ))}
          
          <div className="game-over-content">
            <h2 id="game-over-title" className="game-over-title">Congratulations!</h2>
            
            <div className="game-over-stats">
              <div className="game-over-stat">
                <div className="stat-circle">
                  <span className="stat-number">{score}</span>
                </div>
                <span className="stat-caption">Score</span>
              </div>
              
              <div className="game-over-stat">
                <div className="stat-circle">
                  <span className="stat-number">{moves}</span>
                </div>
                <span className="stat-caption">Moves</span>
              </div>
            </div>
            
            <p className="game-over-message">{performanceMessage}</p>
            
            <div className="game-over-actions">
              <button 
                className="btn play-again-btn"
                onClick={startNewGame}
                aria-label="Play again"
              >
                <span>🎮</span> Play Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
