import React, { useContext, useState } from 'react'

import "./css/CreateTournamentPopup.css"
import "./css/CreateTeam.css"
import { useForm } from 'react-hook-form'
import { GameContext, UserContext } from '../App'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '../firebase'
import { v4 } from 'uuid'
import { useMutation } from 'react-query'
import { createTournament } from '../apis/tournament/tournament-querie'
import LoadingPage from '../pages/LoadingPage'
import { generatePath, useNavigate } from 'react-router-dom'
import { ClientRounteKey } from '../path/coverPath'


const CreateTournamentPopup = (props) => {
    const user = useContext(UserContext);
    const games = useContext(GameContext);
    const navigate = useNavigate();
    const [coverUpload, setCoverUpload] = useState(null);

    const{
        register,
        handleSubmit,
        formState: {error}
    } = useForm(
        {
            defaultValues:{
                tourName: "",
                prize: "",
                gameId: "",
                regStartTime: "",
                regEndTime: "",
                tourStartTime: "",
                tourEndTime: "",
                ownerId: user[0].id
            }
        }
    )

    const {isLoading: isCreateTournamentLoading, mutateAsync: mutateAsynceCreateTournament} = useMutation(
        createTournament,
        {
            onError(){

            },
            onSuccess(){

            }
        }
    )

    function coverChange(event){
        setCoverUpload(prev => prev = event.target.files[0])
    }

    function closeTourPopup(){
        props.setPopup(prev => prev = false)
    }

    async function uploadCoverImage() {
        let coverUrl = "";

        if(coverUpload == null) return coverUrl;  

        const coverimageRef = ref(storage, `Tournament/${coverUpload.name + v4()}`)

        const snapshot =  await uploadBytes(coverimageRef, coverUpload);
        coverUrl = await getDownloadURL(snapshot.ref);

        return coverUrl;
    };

    async function sentForm(data){
        const coverUrl = await uploadCoverImage();
        data.prize = Number(data.prize)
        data = {...data, coverUrl}
        console.log(data);
        const createTournament = await mutateAsynceCreateTournament(data);
        props.setPopup(prev => prev = false)
        navigate(generatePath(ClientRounteKey.tournamentEach, {id: createTournament.id}))
    }

    const gamesList = games.map((game) =>
        <option key={game.id} value={game.id}>{game.gameName}</option>
    );

    if(isCreateTournamentLoading) return (<div className="loadingPage"><LoadingPage/></div>)

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
                    
                    <select className='inputBox' name="gameSel" {...register("gameId")}>
                        <option value="">Please choose your game</option>
                        {gamesList}
                    </select>

                    <div className="dateBox">
                        <label>Register Time :</label>
                        <div className="dateSelect">
                            <input className='inputBox-date' type="date" name="registerStartTime" {...register("regStartTime")}/>
                            <span>to</span>
                            <input className='inputBox-date' type="date" name="regEndTime" {...register("regEndTime")}/>
                        </div>
                    </div>

                    <div className="dateBox">
                        <label>Start Time :</label>
                        <div className="dateSelect">
                            <input className='inputBox-date' type="date" name="tourStartTime" {...register("tourStartTime")}/>
                            <span>to</span>
                            <input className='inputBox-date' type="date" name="tourEndTime" {...register("tourEndTime")}/>
                        </div>
                    </div>

                    <div className="uploadWrape" >
                            <label>Tournament Cover (1600px x 300px)</label>
                            <input type="file" name="tourCover" id="tourCover"  onChange={(event) => coverChange(event)}/>
                    </div>

                    <input className='submit' type="submit" value="Create Tournament" />
                </form>
            </div>
        </div>
    )
}

export default CreateTournamentPopup