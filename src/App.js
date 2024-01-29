import { useEffect, useState } from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from './Card';

const App = () => {
  const [cardsInformation, setCardsInformation] = useState(null);
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  useEffect(() => {
    if (cardsInformation) {
      shuffledCards(cardsInformation);
    } else {
      fetch(
        'https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=6',
      )
        .then((response) => response.json())
        .then((data) => {
          setCardsInformation(data?.entries);
        });
    }
  }, [cardsInformation]);

  const shuffledCards = async () => {
    let test = await Promise.all(
      cardsInformation &&
        cardsInformation.map(async (card) => {
          const imagenObject = card?.fields?.image;
          return imagenObject.url;
        }),
    );
    const cardList = [...test, ...test]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ card, id: Math.random(), matched: false }));
    setCards(cardList);
    setTurns(0);
  };

  const handleChoice = (card) => {
    console.log(card);
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.card === choiceTwo.card) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.card === choiceOne.card) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
  };

  return (
    <div className='App' variant='dark'>
      <h1> Memory Cards Game</h1>
      <Button className='btn' onClick={shuffledCards}>
        Restart Game
      </Button>
      <Container className='mt-4  card-grid'>
        {cards &&
          cards.map((card) => (
            <Card
              card={card}
              key={card.id}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
            />
          ))}
      </Container>
    </div>
  );
};

export default App;
