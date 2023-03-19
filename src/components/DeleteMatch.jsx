import React from 'react'
import { useMutation } from 'react-query';
import { deleteMatch, deleteTour } from '../apis/tournament/tournament-querie';
import { delMatchFail, delMatchSuc } from '../toasts/tournament-toasts/toast';

import "./css/ConfirmDelete.css"

const DeleteMatch = (props) => {
  const {isLoading, mutateAsync} = useMutation(
    deleteMatch,
    {
      onError(){
        delMatchFail()
        props.setShowPopup(prev => prev = false);

      },
      onSuccess(){
        props.re()
        delMatchSuc()
        props.setShowPopup(prev => prev = false);
      }
    }
  )
  async function confim(){
    await mutateAsync(props.matchId);
  }

  function cancel(){
    props.setShowPopup(prev => prev = false);
  }
  return (
    <div className="conDelTourOuter">
        <div className="conDelTourInner">
            <div className="condelTourQes">
                Do you want to <span className='red'> delete </span> this Match ?
            </div>
            <div className="acc-del">
                <div className="cancel" onClick={cancel}>
                    No, Cancel It.
                </div>
                <div className="accept-tour" onClick={confim}>
                    Yes, Delete It.
                </div>
            </div>
        </div>
    </div>
  )
}

export default DeleteMatch