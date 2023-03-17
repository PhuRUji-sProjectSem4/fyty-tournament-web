import React from 'react'
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { deleteTour } from '../apis/tournament/tournament-querie';
import { ClientRounteKey } from '../path/coverPath';
import { delTourFail, delTourSuc } from '../toasts/tournament-toasts/toast';

import "./css/ConfirmDelete.css"

const ConfirmDelete = (props) => {
  const navigate = useNavigate()
  const {isLoading, mutateAsync} = useMutation(
    deleteTour,
    {
      onError(){
        delTourFail()
        props.setShowPopup(prev => prev = false);

      },
      onSuccess(){
        delTourSuc()
        props.setShowPopup(prev => prev = false);
        navigate(ClientRounteKey.home)
      }
    }
  )
  async function confim(){
    await mutateAsync(props.tourId);
  }

  function cancel(){
    props.setShowPopup(prev => prev = false);
  }
  return (
    <div className="conDelTourOuter">
        <div className="conDelTourInner">
            <div className="condelTourQes">
                Do you want to <span className='red'> delete </span> this tournament ?
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

export default ConfirmDelete