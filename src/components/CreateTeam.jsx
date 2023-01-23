import React, { useState } from 'react'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from "../firebase"

import "./css/CreateTeam.css"
import { v4 } from 'uuid'
import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import { GameContext, UserContext } from '../App'

const CreateTeam = (props) => {
    const [coverUrl, setCoverUrl] = useState("")
    const [logoUrl, setLogoUrl] = useState("https://firebasestorage.googleapis.com/v0/b/fyty-tournament.appspot.com/o/Public%2FDefaultPicture%2Fdefault%20pic.png?alt=media&token=7301ec3d-ee0b-4aa8-a6c9-ab194d714275")

    const games = useContext(GameContext);
    const user = useContext(UserContext);

    const [coverUpload, setCoverUpload] = useState(null);
    const [logoUpload, setLogoUpload] = useState(null);

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

    function coverChange(event){
        setCoverUpload(prev => prev = event.target.files[0])
    }

    
    function logoChange(event){
        setLogoUpload(prev => prev = event.target.files[0])
    }

    async function uploadCoverImage() {
        if(coverUpload == null) return;  
        const coverimageRef = ref(storage, `Team/${coverUpload.name + v4()}`)

        await uploadBytes(coverimageRef, coverUpload).then((snaphsot) => {
            getDownloadURL(snaphsot.ref).then((coverLink) => setCoverUrl(coverLink))
        })
    };

    async function uploadLogoImage() {
        if(logoUpload == null) return;  
        const logoimageRef = ref(storage, `Team/${logoUpload.name + v4()}`)

        await uploadBytes(logoimageRef, logoUpload).then((snaphsot) => {
            getDownloadURL(snaphsot.ref).then((logoLink) => setLogoUrl(logoLink))
        })
    };


    async function createTeam(data){
        let payload = {}
        uploadLogoImage()
        uploadCoverImage()
        payload = {...data, coverUrl, logoUrl}
        console.log(payload);
        //await createTeam(payload)
        props.setCreateTrigle(prev => prev=false)
    }

    return (props.createTrigle) ? (
        <div className="createTeamOuter">
            <div className="createTeamPopup">
                <div className="close" onClick={() => props.setCreateTrigle(prev => prev=false)}>x</div>
                <h1>Create <span className='fytyColor'>Team</span></h1>
                <div >
                    <form className="formWrape" onSubmit={handleSubmit(createTeam)}>
                        <div className="uploadWrape">
                            <label>Team Logo (optional)</label>
                            <input className='logoUpload' type="file" onChange={(event) => logoChange(event)}/>
                        </div>
                        <input className='textInput' type="text" name="teamName" placeholder='Team Name' {...register("teamName", {require: true, minLength:1, maxLength: 32, pattern: /^[A-Za-z0-9]+$/i })}/>
                        {errors.teamName && <p className='errors' role="alret">Team name is required</p> }
                        <input className='textInput' type="text" name="Game" placeholder='Game'/>
                        <input className='textInput' type="text" name="slogan" placeholder='Slogan' {...register("slogan", {require: true, minLength:1, maxLength: 32, pattern: /^[A-Za-z0-9]+$/i })}/>
                        <input className='textInput' type="text" name="Description" placeholder='Description' {...register("description", {require: true, minLength:1, maxLength: 32, pattern: /^[A-Za-z0-9]+$/i })}/>
                        <div className="uploadWrape">
                            <label>Team Cover (optional)</label>
                            <input className='coverUpload' type="file" onChange={(event) => coverChange(event)}/>
                        </div>
                        <input className='submit' type="submit" value="Create Your Team" />
                    </form>
                </div>
            </div>
        </div>
    ): "";
}

export default CreateTeam