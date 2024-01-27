import { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [cardsInformation, setCardsInformation] = useState(null);

  useEffect(() => {
    fetch(
      'https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=5',
    )
      .then((response) => response.json())
      .then((data) => {
        setCardsInformation(data?.entries);
      });
  }, []);

  const shuffledCards = async () => {
    const test = await Promise.all(
      cardsInformation.map(async (card) => {
        const imagenObject = card?.fields?.image;
        return imagenObject.url;
      }),
    );

    const cardList = [...test, ...test];
    console.log(cardList);
  };

  shuffledCards();

  return (
    <div className='App'>
      <h1> Memory Cards Game</h1>
    </div>
  );
};

export default App;
