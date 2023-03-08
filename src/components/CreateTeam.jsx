import React, { useState } from 'react'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from "../firebase"
import { createTeam } from '../apis/team/team-queries';

import "./css/CreateTeam.css"
import { v4 } from 'uuid'
import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import { GameContext, UserContext } from '../App'
import { useMutation } from 'react-query'
import LoadingPage from '../pages/LoadingPage'
import { generatePath, useNavigate } from 'react-router-dom';
import { ClientRounteKey } from '../path/coverPath';

const CreateTeam = (props) => {
    const navigate = useNavigate();

    const [gameSel, setGameSel] = useState("");
    const [teamError, setTeamError] = useState("");

    const games = useContext(GameContext);
    const user = useContext(UserContext);

    const [coverUpload, setCoverUpload] = useState(null);
    const [logoUpload, setLogoUpload] = useState(null);

    const [isCreateLoading, setIsCreateTeamLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm(
        {
            defaultValues:{
                teamName: "",
                slogan:"",
                description:"",
                gameId:"",
                ownerId: user[0].id,
            }
        }
    )

    const { isLoading: isCreateTeamLoading, mutateAsync: mutateAsyncCreateTeam} = useMutation(
        createTeam,
        {
          onError() {
            setTeamError("Your's Team Name is Duplicate");
            setIsCreateTeamLoading(false)
          },
          onSuccess(){
            setIsCreateTeamLoading(false)
          }
        }
    );

    function gameSelect(event){
        setGameSel(prev => prev=event.target.value);
    }

    function coverChange(event){
        setCoverUpload(prev => prev = event.target.files[0])
    }

    
    function logoChange(event){
        setLogoUpload(prev => prev = event.target.files[0])
    }

    async function uploadCoverImage() {
        let coverUrl = "";

        if(coverUpload == null) return "";  


        const coverimageRef = ref(storage, `Team/${coverUpload.name + v4()}`)

        const snapshot =  await uploadBytes(coverimageRef, coverUpload);
        coverUrl = await getDownloadURL(snapshot.ref);

        return coverUrl;
    };

    async function uploadLogoImage() {
        
        let logoUrl = "https://firebasestorage.googleapis.com/v0/b/fyty-tournament.appspot.com/o/Public%2FDefaultPicture%2Fdefault%20pic.png?alt=media&token=7301ec3d-ee0b-4aa8-a6c9-ab194d714275"
        if(logoUpload == null) return logoUrl;  

        const logoimageRef = ref(storage, `Team/${logoUpload.name + v4()}`);

        const snapshot = await uploadBytes(logoimageRef, logoUpload);
        logoUrl = await getDownloadURL(snapshot.ref);
        
        return logoUrl;
    };

    async function onCreateTeamClick(data){
        let payload = {};
        setIsCreateTeamLoading(true)
        const logoUrl = await uploadLogoImage();
        const coverUrl = await uploadCoverImage();
        payload = {...data, coverUrl, logoUrl, gameId: gameSel};
        const createdTeam = await mutateAsyncCreateTeam(payload);
        props.setCreateTrigle(prev => prev=false);
        navigate(generatePath(ClientRounteKey.getTeamEach, {id: createdTeam.id}));
    }

    const gamesList = games.map((game) =>
        <option key={game.id} value={game.id}>{game.gameName}</option>
    );
    
    if(isCreateTeamLoading) return(<LoadingPage />);

    return (props.createTrigle) ? (
        <div className="createTeamOuter">
            <div className="createTeamPopup">
                { isCreateTeamLoading ? <div className='teamLoad'><LoadingPage /></div>:
                <>
                <div className="close" onClick={() => props.setCreateTrigle(prev => prev=false)}>x</div>
                <h1>Create <span className='fytyColor'>Team</span></h1>
                <div >
                    <form className="formWrape" onSubmit={handleSubmit(onCreateTeamClick)}>
                        <div className="uploadWrape">
                            <label>Team Logo (90px x 90px)</label>
                            <input className='logoUpload' type="file" accept="image/png, image/gif, image/jpeg" onChange={(event) => logoChange(event)}/>
                        </div>
                        <input className='textInput' type="text" name="teamName" placeholder='Team Name' {...register("teamName", {require: true, minLength:1, maxLength: 32, pattern: /^[A-Za-z0-9]+$/i })}/>
                        {errors.teamName && <p className='errors'>Team name is required</p> }
                        <div className="errors">{teamError}</div>

                        <select name="games" id="game-select" onChange={(event) => gameSelect(event)}>
                            <option value="">Please choose your game</option>
                            {gamesList}
                        </select>

                        <input className='textInput' type="text" name="slogan" placeholder='Slogan' {...register("slogan", {require: true, minLength:1, maxLength: 32, pattern: /^[A-Za-z0-9]+$/i })}/>
                        <input className='textInput' type="text" name="Description" placeholder='Description' {...register("description", {require: true, minLength:1, maxLength: 32, pattern: /^[A-Za-z0-9]+$/i })}/>
                        <div className="uploadWrape">
                            <label>Team Cover (1600px x 300px)</label> 
                            <input className='coverUpload' type="file" accept="image/png, image/gif, image/jpeg" onChange={(event) => coverChange(event)}/>
                        </div>
                        <input className='submit' type="submit" value="Create Your Team" />
                    </form>
                </div>
                </>
                }
            </div>
        </div>
    ): "";
}

export default CreateTeam