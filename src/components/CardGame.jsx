import React from 'react'
import "./css/CardGame.css"

const CardGame = (props) => {
  return (
    <div className="cardGame" onClick={() => props.onClick?.()}>
        <img src={props.coverImg} alt="imgCover" width = "250" height = "150"/>
    </div>
  )
}

export default CardGame