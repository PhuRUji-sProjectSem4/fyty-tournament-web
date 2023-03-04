import React, { useContext, useState } from 'react'
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getUserEach, getUserHistory, getUserTeam, updateUserProfile } from '../apis/user/user-queries';
import { UserContext } from '../App';

import "./css/UserEach.css"
import "./css/TeamEach.css"
import ErrorPage from './ErrorPage';
import LoadingPage from './LoadingPage';
import TournamentList from '../components/TournamentList';
import TeamRoleList from '../components/TeamRoleList';
import UploadPictureBtn from '../components/UploadPictureBtn';
import UploadPicturePopup from '../components/UploadPicturePopup';
import { updatePicFail, updatePicSuc } from '../toasts/user-toasts/toast';

const UserEach = () => {
    const { id } = useParams();

    const [user, setUser] = useContext(UserContext);
    const [showTour, setShowTour] = useState(true);
    const [showChangLogoPopup, setShowChangeLogoPopup] = useState(false);
    const [showChangCoverPopup, setShowChangeCoverPopup] = useState(false);

    const {data: userData={}, isError: isUserError, isLoading: isUserLoading, refetch: refetchUserData} = useQuery(
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

    const {isLoading: isUpdateUserProfileLoading, mutateAsync: mutateAsyncUpdateUserProfile} = useMutation(
      updateUserProfile,
      {
        onError(){
          setShowChangeCoverPopup(false);
          setShowChangeLogoPopup(false);
          updatePicFail();
        },
        onSuccess(){
          setShowChangeCoverPopup(false);
          setShowChangeLogoPopup(false);
          refetchUserData();
          updatePicSuc();
        }
      }
    );

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
      {user.id === id ? <div className="changeCover" onClick={() => setShowChangeCoverPopup(true)}><UploadPictureBtn/></div> : <></>}
      {showChangCoverPopup ? <UploadPicturePopup mutateFunc={mutateAsyncUpdateUserProfile} isLoading={isUpdateUserProfileLoading} payload={"coverUrl"} storage={"User"} head={"Cover"} closePopup={setShowChangeCoverPopup}/> : <></>}


      <div className="userContent">
          <div className="userLogo">
              <div className="imgChangWrape">
                <img className='logo' src={userData.protraitUrl} alt="protraitUrl"/>
                {user.id === id ? <div className="changeLogo" onClick={() => setShowChangeLogoPopup(true)}><UploadPictureBtn/></div> : <></>}
              </div>
              {showChangLogoPopup ? <UploadPicturePopup mutateFunc={mutateAsyncUpdateUserProfile} isLoading={isUpdateUserProfileLoading} payload={"protraitUrl"} storage={"User"} head={"Logo"} closePopup={setShowChangeLogoPopup}/> : <></>}

              
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