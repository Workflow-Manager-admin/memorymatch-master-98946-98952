import React, { useState, useEffect, useCallback } from 'react';
import GameBoard from '../GameBoard/GameBoard';
import ScoreBoard from '../ScoreBoard/ScoreBoard';
import AnimalInfoModal from '../AnimalInfoModal/AnimalInfoModal'; // Import the modal
import { generateCardData, checkForMatch, calculateScore } from '../../utils/gameUtils';
// animalData is not directly used here for generation but good to be aware of its role via gameUtils
import './MemoryGame.css';

// PUBLIC_INTERFACE
/**
 * Main container for the Memory Match game
 *
 * @returns {React.Component} MemoryGame component
 */
const MemoryGame = () => {
  // Game configuration
  const initialPairsCount = 8; // Default number of pairs
  const flipDelay = 1000; // Time in ms before unmatched cards flip back
  const availablePairOptions = [4, 6, 8, 10, 12]; // Available options for number of pairs

  // Game state
  const [numPairs, setNumPairs] = useState(initialPairsCount);
  const [gamePhase, setGamePhase] = useState('selection'); // 'selection', 'playing', 'gameOver'
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const [isAnimalModalOpen, setIsAnimalModalOpen] = useState(false);
  const [currentAnimalForModal, setCurrentAnimalForModal] = useState(null);

  // Initialize game when numPairs changes and gamePhase is 'playing'
  useEffect(() => {
    if (gamePhase === 'playing') {
      initializeGame(numPairs);
    }
  }, [numPairs, gamePhase]);

  // Check for game completion
  useEffect(() => {
    if (gamePhase === 'playing' && matches === numPairs && cards.length > 0) {
      // Game over!
      setTimeout(() => {
        setGamePhase('gameOver');
        createConfetti();
      }, 800);
    }
  }, [matches, numPairs, cards.length, gamePhase]);

  // Update score when moves or matches change
  useEffect(() => {
    if (gamePhase === 'playing' || gamePhase === 'gameOver') {
      setScore(calculateScore(matches, moves, numPairs));
    }
  }, [matches, moves, numPairs, gamePhase]);

  /**
   * Generate confetti elements for celebration
   */
  const createConfetti = useCallback(() => {
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
   * Initialize a new game with a specific number of pairs
   * @param {number} pairs - The number of pairs for the new game
   */
  const initializeGame = (pairs) => {
    setCards(generateCardData(pairs));
    setFlippedCards([]);
    setMatches(0);
    setMoves(0);
    setScore(0);
    setIsLocked(false);
    setConfetti([]);
  };

  /**
   * Handle card click
   * @param {string} cardId - ID of the clicked card
   */
  const handleCardClick = (cardId) => {
    if (isLocked || flippedCards.length >= 2 || gamePhase !== 'playing') return;

    const clickedCard = cards.find(card => card.id === cardId);
    if (clickedCard.isFlipped) return;

    setCards(prevCards =>
      prevCards.map(card =>
        card.id === cardId ? { ...card, isFlipped: true } : card
      )
    );

    setFlippedCards(prevFlipped => [...prevFlipped, clickedCard]);

    if (flippedCards.length === 1) {
      setMoves(prevMoves => prevMoves + 1);
      setIsLocked(true);

      setTimeout(() => {
        const firstCard = flippedCards[0];

        if (checkForMatch(firstCard, clickedCard)) {
          setMatches(prevMatches => prevMatches + 1);
          setCards(prevCards =>
            prevCards.map(card =>
              (card.id === firstCard.id || card.id === cardId)
                ? { ...card, isMatched: true, isFlipped: true }
                : card
            )
          );
        } else {
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
  
  /**
   * Handle selection of number of pairs
   * @param {number} selectedPairs - The selected number of pairs
   */
  const handleSelectPairs = (selectedPairs) => {
    setNumPairs(selectedPairs);
    setGamePhase('playing');
  };

  /**
   * Handle restart game (play again with same settings)
   */
  const handleRestartGame = () => {
    setGamePhase('playing');
    initializeGame(numPairs);
  };

  /**
   * Handle change difficulty (go back to selection screen)
   */
  const handleChangeDifficulty = () => {
    setGamePhase('selection');
  };


  const perfectMoves = numPairs * 2;
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
        {gamePhase === 'selection' && (
          <p className="game-subtitle">
            Select the number of pairs to start the game.
          </p>
        )}
        {(gamePhase === 'playing' || gamePhase === 'gameOver') && (
          <p className="game-subtitle">
            Find matching pairs of cards to test your memory skills. The fewer moves, the higher your score!
          </p>
        )}
      </div>

      {gamePhase === 'selection' && (
        <div className="difficulty-selection">
          <h2>Choose Difficulty</h2>
          <div className="difficulty-options">
            {availablePairOptions.map(option => (
              <button
                key={option}
                className="btn difficulty-btn"
                onClick={() => handleSelectPairs(option)}
              >
                {option} Pairs ({option * 2} Cards)
              </button>
            ))}
          </div>
        </div>
      )}

      {(gamePhase === 'playing' || gamePhase === 'gameOver') && (
        <>
          <ScoreBoard
            score={score}
            moves={moves}
            matches={matches}
            totalPairs={numPairs}
            onRestart={handleRestartGame}
          />
          <div className="game-wrapper">
            <GameBoard
              cards={cards}
              onCardClick={handleCardClick}
              numPairs={numPairs}
            />
          </div>
        </>
      )}

      {gamePhase === 'gameOver' && (
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
                onClick={handleRestartGame}
                aria-label="Play again"
              >
                <span>🎮</span> Play Again
              </button>
              <button
                className="btn btn-secondary play-again-btn"
                onClick={handleChangeDifficulty}
                aria-label="Change difficulty"
              >
                <span>⚙️</span> Change Difficulty
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
