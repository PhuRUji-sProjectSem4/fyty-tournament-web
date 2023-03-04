import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react'
import { v4 } from 'uuid';
import { storage } from '../firebase';
import "./css/UploadPicturePopup.css"

const UploadPicturePopup = (props) => {
  const [picture, setPicture] = useState(null);
  
  function onUploadChange(event){
    setPicture(event.target.files[0])
  }

  async function uploadImage() {
    let pictureUrl = "";

    if(pictureUrl == null) return;  

    const PictureRef = ref(storage, `${props.storage}/${picture.name + v4()}`)

    const snapshot =  await uploadBytes(PictureRef, picture);
    pictureUrl = await getDownloadURL(snapshot.ref);

    return pictureUrl;
  };

  async function changePicture(){
    const firebasePictureUrl = await uploadImage();
    if(props.payload === "coverUrl"){
      await props.mutateFunc({coverUrl : firebasePictureUrl})
    }
    else if(props.payload === "protraitUrl"){
      await props.mutateFunc({protraitUrl : firebasePictureUrl})
    }
    else if(props.payload === "logoUrl"){
      await props.mutateFunc({logoUrl : firebasePictureUrl})
    }
    else{
      console.log("Wrong Property");
    }
  }

  return (
    <div className="uploadPictureOuter">
        <div className="uploadPictureInner">
            <div className="closeUploadPictureInner" onClick={() => props.closePopup(false)}>x</div>
            <div className="uploadHead"><h1>Change Your <span className='fytyColor'>{props.head}</span></h1></div>
            <div className="uploadWrape">
              <label>Choose Your Image</label>
              <input type="file" name="imgUp" id="imgUp" aaccept="image/png, image/gif, image/jpeg" onChange={(event) => onUploadChange(event)}/>
            </div>
            <input className={props.isLoading ? "submitLoading" : 'submit'} type="button" value="Change Your Picture" onClick={changePicture} />
        </div>
    </div>
  )
}

export default UploadPicturePopup