import { useEffect, useState } from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from './Card';
import useFetch from './useFetch';
import ModalName from './ModalName';

const App = () => {
  const [cards, setCards] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [name, setName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [successes, setSuccesses] = useState(0);
  const [mistakes, setMistakes] = useState(0);

  const { data, loading, error } = useFetch(
    'https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=6',
  );

  useEffect(() => {
    setShowModal(true);
  }, []);

  //first load and shuffle
  useEffect(() => {
    if (!loading) shuffledCards(data);
  }, [loading]);

  //shuffled
  const shuffledCards = async () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    let test = await Promise.all(
      data?.map(async (card) => {
        const imagenObject = card?.fields?.image?.url;
        return imagenObject;
      }),
    );

    const cardList = [...test, ...test]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ card, id: Math.random(), matched: false }));
    setCards(cardList);
    setSuccesses(0);
    setMistakes(0);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  //compare chosen cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.card === choiceTwo.card) {
        setSuccesses((prevTurns) => prevTurns + 1);
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
        setMistakes((prevTurns) => prevTurns + 1);
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  //reset turns and increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
  };

  return (
    <div className='App' variant='dark'>
      <h1> Memory Cards Game</h1>
      <br />
      <h3> Hola {name} comencemos a jugar !</h3>
      <div className='score'>
        <p> Aciertos: {successes} </p>
        <p> - </p>
        <p> Errores: {mistakes} </p>
      </div>

      <Button className='btn' onClick={shuffledCards}>
        Restart Game
      </Button>
      <Container className='mt-4  card-grid'>
        {cards?.map((card) => (
          <Card
            card={card}
            key={card.id}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </Container>
      <ModalName
        name={name}
        setName={setName}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  );
};

export default App;
