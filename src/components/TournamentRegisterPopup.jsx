import React from 'react'

import "./css/TournamentConfrimPopup.css"

const TournamentRegisterPopup = (props) => {

    function onConfrimClick(){
        props.comfrimReg(props.tourId);
        props.setClosePopup(false);
    }

  return (
    <div className="tourPopOuter">
        <div className="tourPopInner">
            <div className="question">
                Are you sure to open to <span className='fytyColor'>REGISTER</span> your tournament ?
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

export default TournamentRegisterPopup