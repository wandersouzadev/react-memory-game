import React, { useState, useMemo, useEffect } from 'react';
import './style.css';

export default function App() {
  const cardsTemplate = [
    {
      name: 'Bulbasaur',
      image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
    },
    {
      name: 'Charmander',
      image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png',
    },
    {
      name: 'Squirtle',
      image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png',
    },
    {
      name: 'Caterpie',
      image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/010.png',
    },
    {
      name: 'Pidgey',
      image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/016.png',
    },
    {
      name: 'Rattata',
      image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/019.png',
    },
    {
      name: 'Pikachu',
      image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png',
    },
    {
      name: 'Psyduck',
      image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/054.png',
    },
  ];

  const [appState, setAppState] = useState(0);
  const [cards, setCards] = useState([]);
  const [turn, setTurn] = useState([]);
  const [allTurns, setAllTurns] = useState([]);

  const memoryGame = () => {
    if (appState < 2) return;

    if (turn[0]?.innerHTML === turn[1]?.innerHTML) {
      new Audio('https://files.catbox.moe/47tq74.wav').play();
      setAllTurns((prev) => {
        return [...prev, turn];
      });
      setTurn([]);
      setAppState(0);
    } else {
      setTimeout(() => {
        new Audio('https://files.catbox.moe/0tgsui.wav').play();
        setTurn([]);
        setAppState(0);
        turn[0]?.classList.toggle('selected');
        turn[0]?.classList.toggle('card-down');
        turn[1]?.classList.toggle('selected');
        turn[1]?.classList.toggle('card-down');
      }, 300);
    }
  };

  const handleClickCard = (e) => {
    if (appState >= 2) return;
    if (appState === 0) {
      new Audio('https://files.catbox.moe/0rx4ei.wav').play();
    }
    const isSelected = e.target.classList.contains('selected');

    if (isSelected) return;

    setTurn((prev) => {
      return [...prev, e.target];
    });
    setAppState((prev) => {
      return prev + 1;
    });

    e.target.classList.toggle('card-down');
    e.target.classList.toggle('selected');
  };

  const initCards = () => {
    setCards(() => {
      return [...cardsTemplate].concat(cardsTemplate).sort(() => {
        return Math.floor(Math.random() * cardsTemplate.length * 2);
      });
    });
  };

  const shuffle = () => {
    setCards((prevCards) => {
      return [
        ...prevCards.sort(() => {
          return Math.floor(Math.random() * cardsTemplate.length * 2);
        }),
      ];
    });
    setAppState(0);
  };

  const handleRestart = () => {
    const selectedCards = Array.from(document.querySelectorAll('.selected'));
    selectedCards.forEach((card) => {
      card.classList.add('card-down');
      card.classList.remove('selected');
    });
    setAppState(0);
    setAllTurns([]);
    shuffle();
  };

  useEffect(() => {
    initCards();
  }, []);

  useEffect(() => {
    memoryGame();
  }, [turn]);

  useEffect(() => {
    if (allTurns?.length === cardsTemplate.length) {
      setTimeout(() => {
        new Audio('https://files.catbox.moe/8ukzup.wav').play();
      }, 100);
    }
  }, [allTurns]);

  return (
    <div className="app">
      <div className="buttons">
        <button className="btn" onClick={handleRestart}>
          restart
        </button>
      </div>
      <div className="memory-game">
        {cards.map((card, i) => {
          return (
            <div
              key={i}
              className="card card-down"
              data-card={i}
              data-pokemon={card.name}
              style={{ backgroundImage: `url(${card.image})` }}
              onClick={handleClickCard}
            >
              <span>{card.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
