import React, { Children, Component, useContext } from 'react'
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom'
import { getTeamEach, getTeamMember, getTeamReq, getTeamTourJoined } from '../apis/team/team-queries';
import LoadingPage from './LoadingPage';

import "./css/TeamEach.css"

import { useState } from 'react';
import MemberList from '../components/MemberList';
import TournamentList from '../components/TournamentList';
import ConfrimPopup from '../components/ConfrimPopup';
import { UserContext } from '../App';
import { ClientRounteKey } from '../path/coverPath';


export const TeamContext = React.createContext();

const TeamEach = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [user, setUser]= useContext(UserContext);

    const [showTour, setShowTour] = useState(true);
    const [confirmShow, setConformShow] = useState(false);
    

    const {data: team = {}, error: teamError, isLoading: teamLoading } = useQuery(
      "team",
      () => getTeamEach(id)
    );

    const {data: members = [], error: memberError, isLoading: memberLoading } = useQuery(
      "members",
      () => getTeamMember(id)
    );

    const {data: tours = [], error: tourError, isLoading: tourLoading } = useQuery(
      "tournaments",
      () => getTeamTourJoined(id)
    );

    const {data: reqs = [], error: reqsError, isLoading: reqsLoading } = useQuery(
      "teamReq",
      () => getTeamReq(id)
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
    
    console.log(reqs)
    
  if(teamLoading || memberLoading || tourLoading || reqsLoading){
    return ( <LoadingPage/> )
  }

  if(teamError || memberError || tourError || reqsError){
    return ( navigate(ClientRounteKey.error))
  }

  return (
    // for Children Component
    <TeamContext.Provider value={team}> 

      <div className='teamEach'>
          <div className="teamCover">
            <img src={team.coverUrl} alt="team cover" />
          </div>
          <div className="teamEachHead">Team Profile</div>

          <div className="teamContent">
            <div className="teamLogo">
              <img className='logo' src={team.logoUrl} alt="logo" />
              <div className="name-des">
                <h1>{team.teamName}</h1>
                <div className="teamDes">
                  {team.slogan}
                </div>
              </div>
            </div>

            {/* for  who want to join team  */}

            {user.id !== team.ownerId ? <div className="joinTeam" onClick={showConfirmPopup} >joinTeam</div> : "" }
            {confirmShow ? <ConfrimPopup message = {"Do you want to join " + team.teamName + " team?"} popStatus={setConformShow} /> : ""}
            
            {/* team request for team owner */}

            {user.id === team.ownerId ?
              <div className="teamReq">
                  Team Request
                  { reqs.length === 0 ? <></> : <div className="noti"></div>}
              </div> : <></>}

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