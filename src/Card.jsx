import React from 'react';
import './App.css';
import backImage from './assets/zebra.png';

const Card = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className={`card ${flipped ? 'flipped' : ''}`}>
      <img src={card.card} className='front' />
      <img src={backImage} className='back' onClick={handleClick} />
    </div>
  );
};

export default Card;
