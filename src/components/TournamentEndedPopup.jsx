import React from 'react'

import "./css/TournamentConfrimPopup.css"

const TournamentEndedPopup = (props) => {
    function onConfrimClick(){
        props.confrimEnd(props.tourId)
        props.setClosePopup(false);
    }
  return (
    <div className="tourPopOuter">
        <div className="tourPopInner">
            <div className="question">
                Are you sure to <span className='fytyColor'> END </span> your tournament ?
            </div>

            <div className="tourConBtn">
                <div className="accept" onClick={onConfrimClick}>
                    Yes, Do it.
                </div>
                <div className="cancel" onClick={() => props.setClosePopup(false)}>
                    No, Cancel it.
                </div>
            </div>
        </div>
    </div>
  )
}

export default TournamentEndedPopup