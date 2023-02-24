import React from 'react'

import "./css/TournamentConfrimPopup.css"

const TournamentStartPopup = (props) => {
    function onConfrimClick(){
        props.confrimStart(props.tourId);
        props.setClosePopup(false);
    }
  return (
    <div className="tourPopOuter">
        <div className="tourPopInner">
            <div className="question">
                Are you sure to <span className='fytyColor'> START</span> your tournament ?
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

export default TournamentStartPopup