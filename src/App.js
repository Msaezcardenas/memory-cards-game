import { useEffect, useState } from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [cardsInformation, setCardsInformation] = useState(null);
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);

  useEffect(() => {
    if (cardsInformation) {
      shuffledCards(cardsInformation);
    } else {
      fetch(
        'https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=5',
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
      .map((card) => ({ card, id: Math.random() }));
    setCards(cardList);
    setTurns(0);
  };

  return (
    <div className='App' variant='dark'>
      <h1> Memory Cards Game</h1>
      <Button className='btn' onClick={shuffledCards}>
        {' '}
        Restart Game
      </Button>
      <Container className='mt-4 '>
        {cards &&
          cards.map((card) => (
            <div className='card' key={card.id}>
              <img src={card.card} />
            </div>
          ))}

        <Row>
          <Col sm={8}>sm=8</Col>
          <Col sm={4}>sm=4</Col>
        </Row>
        <Row>
          <Col sm>sm=true</Col>
          <Col sm>sm=true</Col>
          <Col sm>sm=true</Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
