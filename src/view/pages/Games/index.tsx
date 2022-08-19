import React from 'react';
import { GameCard } from '../../../components/gamecard/GameCard';
import './games.styles.css'

const Games = () => {
  return (
    <div className="games-page">
      <div className="games">
        <h1>Выберите игру</h1>
        <div className="games__container">
          <GameCard title="Аудиовызов" classname="audiocall" url="audiocall">
            <p>
              Описание игры или картинка
            </p>            
          </GameCard>
          <GameCard title="Спринт" classname="sprint" url="sprint">
            <p>
              Описание игры или картинка
            </p>            
          </GameCard>
        </div>
      </div>
    </div>
  );
};

export default Games;
