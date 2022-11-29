import React, { useState } from 'react'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from "../firebase"

import "./css/CreateTeam.css"
import { v4 } from 'uuid'

const CreateTeam = (props) => {
    let url = "";
    const [imageUpload, setImageUpload] = useState(null);

    async function uploadImage() {
        if(imageUpload == null) return;  
        const imageRef = ref(storage, `Team/${imageUpload.name + v4()}`)
        await uploadBytes(imageRef, imageUpload).then((snaphsot) => {
            getDownloadURL(snaphsot.ref).then((uploadLink) => url = uploadLink).then(() => console.log(url))
        })
    };

    return (props.createTrigle) ? (
        <div className="createTeamOuter">
            <div className="createTeamPopup">
                <div className="close" onClick={() => props.setCreateTrigle(prev => prev=false)}>x</div>
                <h1>Create <span className='fytyColor'>Team</span></h1>
                <div className="formWrape">
                    <input type="file" onChange={(event) => {setImageUpload(prev => prev = event.target.files[0])}}/>
                    <input type="button" value="upload" onClick={uploadImage}/>
                </div>
            </div>
        </div>
    ): "";
}

export default CreateTeam