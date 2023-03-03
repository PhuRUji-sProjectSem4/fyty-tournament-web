import React, { useContext, useState } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getUserEach, getUserHistory, getUserTeam } from '../apis/user/user-queries';
import { UserContext } from '../App';

import "./css/UserEach.css"
import "./css/TeamEach.css"
import ErrorPage from './ErrorPage';
import LoadingPage from './LoadingPage';
import TournamentList from '../components/TournamentList';
import TeamRoleList from '../components/TeamRoleList';
import UploadPictureBtn from '../components/UploadPictureBtn';

const UserEach = () => {
    const { id } = useParams();

    const [user, setUser] = useContext(UserContext);
    const [showTour, setShowTour] = useState(true);

    const {data: userData={}, isError: isUserError, isLoading: isUserLoading} = useQuery(
      "userEach",
      () => getUserEach(id)
    )

    const {data: userHistory=[], isError: isUserHistoryError, isLoading: isUserHistoryLoading} = useQuery(
      "userHistory",
      () => getUserHistory(id)
    )

    const {data: userTeam=[], isError: isUserTeanError, isLoading: isUserTeamLoading} = useQuery(
      "userTeam",
      () => getUserTeam(id)
    )

    function tourShow(){
      setShowTour(prev => prev = true)
    }

    function memberShow(){
      setShowTour(prev => prev = false)
    }

    const teamList = userTeam.map((team) =>
      <TeamRoleList key={team.id} {...team} />
    );

    const tourList = userHistory.map((tour) =>
      <TournamentList key={tour.id} {...tour} />
    );


  if(isUserLoading || isUserHistoryError || isUserTeanError) return( <LoadingPage/>)
  if(isUserError || isUserHistoryLoading || isUserTeamLoading) return( <ErrorPage/>)

  return (
    <div className="userEachPage">
      <div className="userHead">{userData.id = user.id ? <>My Profile</> : <>User Profile</>}</div>
      <img className='cover' src={userData.coverUrl} alt="cover" />
      {user.id === id ? <div className="changeCover"><UploadPictureBtn/></div> : <></>}


      <div className="userContent">
          <div className="userLogo">
              <div className="imgChangWrape">
                <img className='logo' src={userData.protraitUrl} alt="protraitUrl"/>
                {user.id === id ? <div className="changeLogo"><UploadPictureBtn/></div> : <></>}
              </div>

              
              <div className="name-des-user">
                <h1>{userData.username}</h1>
                <div className="userDes">
                  {userData.slogan}
                </div>
              </div>
          </div>

      </div>

      {/* team detail box tournament / team member */}
            
      <div className="team-detail-box">
              <div className="select-detail">
                <div className={showTour ? "tour-sel" : "tour-not-sel" }onClick={tourShow}>
                  Tournament History
                </div>
                <div className={showTour ? "mem-not-sel" : "mem-sel" } onClick={memberShow}>
                  Team
                </div>
              </div>
              {
                showTour ? 
                  <div className="tourList">
                    {tourList}
                  </div> 
                  : 
                  <div className="memberList">
                    {teamList}
                  </div>
              }
      </div>



    </div>
  )
}

export default UserEach