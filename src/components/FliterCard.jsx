import "./css/FliterCard.css"
import { CardGame } from "."

import React from 'react'

const FliterCard = () => {
    const coverImg = {
        allGames : "/asset/all.png",
        dotaImg : "/asset/dota2.jpg",
        rovImg : "/asset/rov.webp",
        pubgImg : "/asset/pubg.jpg",
        valoImg : "/asset/valo.jpg"
    };

    return (
        <div className="fliterContrainer">
            <div className="selGame"><h1>Select Game</h1></div>
            <div className="fliterCardWrape">
            <CardGame coverImg={coverImg.allGames}/>
            <CardGame coverImg={coverImg.dotaImg}/>
            <CardGame coverImg={coverImg.rovImg}/>
            <CardGame coverImg={coverImg.pubgImg}/>
            <CardGame coverImg={coverImg.valoImg}/>
            </div>
        </div>
  )
}

export default FliterCard