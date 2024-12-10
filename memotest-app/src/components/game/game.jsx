import React, { useState } from 'react';
import CardGrid from '../galeriaImagenes/cardGrid';


const Game = () => {

    const [startGame, setStartGame] = useState(false);

    const handleStartGame = () => {
        setStartGame(true);
    };


    return (
        <div className="h-screen">
        {!startGame ? (
            <button
                onClick={handleStartGame}
                className="bg-customPink text-white font-bold py-2 px-4 rounded"
            >
                Start Game
            </button>
        ) : (
            <CardGrid />
        )
        }
        </div>
    );
}

export default Game;