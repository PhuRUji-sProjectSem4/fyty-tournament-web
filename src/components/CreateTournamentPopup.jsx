import React, { useContext } from 'react'

import "./css/CreateTournamentPopup.css"
import "./css/CreateTeam.css"
import { useForm } from 'react-hook-form'
import { UserContext } from '../App'


const CreateTournamentPopup = (props) => {
    const user = useContext(UserContext);

    const{
        register,
        handleSubmit,
        formState: {error}
    } = useForm(
        {
            defaultValues:{
                tourName: "",
                prize: 0,
                gameId: "",
                regStartTime: "",
                regEndTime: "",
                tourStartTime: "",
                tourEndTime: "",
                owenerId: user[0].id
            }
        }
    )

    function closeTourPopup(){
        props.setPopup(prev => prev = false)
    }

    function sentForm(data){
        data.prize = Number(data.prize)
        console.log(data);
    }
  return (
        <div className="createTourOuter">
            <div className="createTourInner">
                <div className="closeCreateTourBtn" onClick={closeTourPopup}>
                    x
                </div>
                <div className="createTourPopHead">
                    <h1>Create <span className='fytyColor'>Tour</span></h1>
                </div>
                <form onSubmit={handleSubmit(sentForm)}>
                    <input className='textInput' type="text" name="tourName" placeholder='Tournament Name' {...register("tourName", {require: true, minLength:1, maxLength: 32, pattern: /^[A-Za-z0-9]+$/i })}/>
                    <input className='textInput' type="text" name="prize" placeholder='Prize' {...register("prize", {require: true, minLength:1, maxLength: 32, pattern: /^[0-9]+$/i })}/>
                    <input type="datetime-local" name="registerStartTime" {...register("regzstartTime")}/>
                    <input type="datetime-local" name="regEndTime" {...register("regEndTime")}/>
                    <input type="datetime-local" name="tourStartTime" {...register("tourStartTime")}/>
                    <input type="datetime-local" name="tourEndTime" {...register("tourEndTime")}/>
                    <div className="uploadWrape">
                            <label>Tournament Cover (optional)</label>
                            <input type="file" name="tourCover" id="tourCover" />
                    </div>

                    <input className='submit' type="submit" value="Create Tournament" />
                </form>
            </div>
        </div>
    )
}

export default CreateTournamentPopup