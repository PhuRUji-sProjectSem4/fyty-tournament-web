import React, { useContext } from 'react'
import { CardGame } from "."
import { GameContext } from '../App'
import { coverImg } from '../path/coverPath'

import "./css/FliterCard.css"

const FliterCard = (props) => {
    const games = useContext(GameContext);

    const gameList = games.map((game) =>
        <CardGame key={game.id} coverImg={game.coverUrl}  onClick={() => props.onSelect(game?.id)}/>
    );

    return (
        <div className="fliterContrainer">
            <div className="selGame"><h1>Select Game</h1></div>
            <div className="fliterCardWrape">
                <CardGame coverImg={coverImg.allGames} onClick={() => props.onSelect("all")}/>
                { gameList }
            </div>
        </div>
  )
}

export default FliterCard