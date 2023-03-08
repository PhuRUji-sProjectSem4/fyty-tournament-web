import React, { useContext } from 'react'
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom'
import { getTeamEach, getTeamMember, getTeamReq, getTeamTourJoined, updateTeamDetail } from '../apis/team/team-queries';
import LoadingPage from './LoadingPage';

import "./css/TeamEach.css"

import { useState } from 'react';
import MemberList from '../components/MemberList';
import TournamentList from '../components/TournamentList';
import ConfrimPopup from '../components/ConfrimPopup';
import { UserContext } from '../App';
import { ClientRounteKey } from '../path/coverPath';
import TeamRequest from '../components/TeamRequest';
import LeaveConfirm from '../components/LeaveConfirm';
import UploadPictureBtn from '../components/UploadPictureBtn';
import UploadPicturePopup from '../components/UploadPicturePopup';
import { updatePicFail, updatePicSuc } from '../toasts/user-toasts/toast';


export const TeamContext = React.createContext();

const TeamEach = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [user, setUser]= useContext(UserContext);

    const [showTour, setShowTour] = useState(true);
    const [confirmShow, setConformShow] = useState(false);
    const [reqShow, setReqShow] = useState(false);
    const [leaveConShow, setLeaveConShow] = useState(false);
    const [showChangLogoPopup, setShowChangeLogoPopup] = useState(false);
    const [showChangCoverPopup, setShowChangeCoverPopup] = useState(false);
    

    const {data: team = {}, error: teamError, isLoading: teamLoading, refetch: refetchTeam } = useQuery(
      "team",
      () => getTeamEach(id)
    );

    const {data: members = [], error: memberError, isLoading: memberLoading, refetch:reMem } = useQuery(
      "members",
      () => getTeamMember(id)
    );

    const {data: tours = [], error: tourError, isLoading: tourLoading } = useQuery(
      "tournaments",
      () => getTeamTourJoined(id)
    );

    const {data: reqs = [], error: reqsError, isLoading: reqsLoading, refetch: reReq } = useQuery(
      "teamReq",
      () => getTeamReq(id)
    );

    const {isLoading: isUpdateTeamDetailLoading, mutateAsync: mutateAsyncUpdateTeamDetail} = useMutation(
      updateTeamDetail,
      {
        onError(){
          setShowChangeLogoPopup(false);
          setShowChangeCoverPopup(false);
          updatePicFail();
        },
        onSuccess(){
          setShowChangeLogoPopup(false);
          setShowChangeCoverPopup(false);
          updatePicSuc();
          refetchTeam();
        }
      }
    );

    
    const memberList = members.map((member) => 
      <MemberList key={member.userData.id}  {...member}/>
    );
   
    const tourList = tours.map((tour) => 
      <TournamentList key={tour.id} {...tour}/>
    );

    function tourShow(){
      setShowTour(prev => prev = true)
    }

    function memberShow(){
      setShowTour(prev => prev = false)
    }

    function showConfirmPopup(){
      setConformShow(prev => prev = true)
    }

    function showLeaveTeamPopup(){
      setLeaveConShow(prev => prev = true)
    }

    function onReqClick(){
      setReqShow(true)
    }

    const isFound = members.some(element => {
      if (element.userData.id === user.id) {
        return true;
      }

      return false;
    });

    const reqIsFound = reqs.some(req =>{
      if(req.userData.id === user.id){
        return true;
      }

      return false;
    });

    
  if(teamLoading || memberLoading || tourLoading || reqsLoading){
    return ( <LoadingPage/> )
  }

  if(teamError || memberError || tourError || reqsError){
    return ( navigate(ClientRounteKey.error))
  }
  console.log(team);

  return (
    // for Children Component
    <TeamContext.Provider value={team}> 

      <div className='teamEach'>
          <div className="gameLogoTeam">
            <img src={team.game.logoUrl} alt="game-logo" />
          </div>
          <div className="teamCover">
            <img src={team.coverUrl} alt="team cover" />
            {user.id === team.ownerId ? <div className="changeTeamCover" onClick={() => setShowChangeCoverPopup(true)}><UploadPictureBtn/></div> : <></>}
          </div>
            {showChangCoverPopup ? <UploadPicturePopup targetId={team.id} mutateFunc={mutateAsyncUpdateTeamDetail} isLoading={isUpdateTeamDetailLoading} payload={"coverUrl"} storage={"Team"} head={"Cover"} closePopup={setShowChangeCoverPopup}/> : <></>}
          <div className="teamEachHead">Team Profile</div>

          <div className="teamContent">
            <div className="teamLogo">
              <img className='logo' src={team.logoUrl} alt="logo" />
              {user.id === team.ownerId ? <div className="changeTeamLogo" onClick={() => setShowChangeLogoPopup(true)}><UploadPictureBtn/></div> : <></>}
              {showChangLogoPopup ? <UploadPicturePopup targetId={team.id} mutateFunc={mutateAsyncUpdateTeamDetail} isLoading={isUpdateTeamDetailLoading} payload={"logoUrl"} storage={"Team"} head={"Logo"} closePopup={setShowChangeLogoPopup}/> : <></>}
              
              <div className="name-des">
                <h1>{team.teamName}</h1>
                <div className="teamDes">
                  {team.slogan}
                </div>
              </div>
            </div>

            {/* for  who want to join team  */}

            {user.id !== team.ownerId && !isFound && !reqIsFound ? <div className="joinTeam" onClick={showConfirmPopup} >Join Team</div> : "" }
            {confirmShow ? <ConfrimPopup message = {team.teamName} popStatus={setConformShow} reFReq={reReq} /> : ""}
            
            {/* requested already */}
            {reqIsFound ? <div className='req-sent'>Request sent</div> : <></>}

            {/* for leave team btn */}

            {isFound && user.id !== team.ownerId ? <div className='leaveTeam' onClick={showLeaveTeamPopup}>Leave</div> : ""}
            {leaveConShow ? <LeaveConfirm message = {team.teamName} popStatus={setLeaveConShow}/> : <></> }

            {/* team request for team owner */}

            {user.id === team.ownerId ?
              <div className="teamReq" onClick={onReqClick}>
                  Team Request
                  { reqs.length === 0 ? <></> : <div className="noti"></div>}
              </div> : <></>}

              { reqShow ? <TeamRequest closeTeamReq={setReqShow} requests = {reqs} reFMem={reMem} reFReq={reReq}/> : <></> }

            {/* team detail box tournament / team member */}
            
            <div className="team-detail-box">
              <div className="select-detail">
                <div className={showTour ? "tour-sel" : "tour-not-sel" }onClick={tourShow}>
                  Tournament History
                </div>
                <div className={showTour ? "mem-not-sel" : "mem-sel" } onClick={memberShow}>
                  Team Member
                </div>
              </div>
              {
                showTour ? 
                  <div className="tourList">{tourList}</div> : 
                  <div className="memberList">
                    {memberList}
                  </div>
              }
            </div>
            
          </div>

      </div>
    </TeamContext.Provider>
  )
}

export default TeamEach