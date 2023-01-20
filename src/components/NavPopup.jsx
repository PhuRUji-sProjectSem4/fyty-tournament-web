import React, { useContext } from 'react'
import { generatePath, useNavigate } from 'react-router-dom'
import { UserContext } from '../App';
import { ClientRounteKey } from '../path/coverPath';
import "./css/NavPopup.css"

const NavPopup = (prop) => {
    const navigate = useNavigate();
    
    const [user, setUser] = useContext(UserContext);

    function profile(){
        navigate(generatePath(ClientRounteKey.profile))
        prop.toggleNavPopup(prev => prev=false)
    }

    function schedule(){
        navigate(generatePath(ClientRounteKey.schedule))
        prop.toggleNavPopup(prev => prev=false)
    }

    function logOut(){
        setUser(null)
        navigate(generatePath(ClientRounteKey.home))
        localStorage.removeItem("token")
    }

    return (
        <div className="nav-pop-contrianer">
                <div className='pop-list' onClick={profile}><span><img src="/asset/profile.svg"  /></span> Profile</div>
                <div className='pop-list'   onClick={schedule}><span><img src="/asset/calendar.svg"  /></span> Schedule</div>
                <div className='pop-list' onClick={logOut}><span><img src="/asset/logout.svg"  /></span> Logout</div>
        </div>
)
}

export default NavPopup