import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Navbar } from "./components"
import { Home, Team, Tournament, CreateTournament, MySchedule } from "./pages"
import "./App.css";
import { getGames } from "./apis/game/game-queries";
import TeamEach from "./pages/TeamEach";
import { useQuery } from "react-query";
import TournamentEach from "./pages/TournamentEach";
import UserEach from "./pages/UserEach";
import LoadingPage from "./pages/LoadingPage";
import ErrorPage from "./pages/ErrorPage";
import coreApi from "./core/axios";
import { ApiRounteKey } from "./path/coverPath";

export const GameContext = React.createContext(); 
export const UserContext = React.createContext();


const App = () => {
  const user = useState(null);

  const {data = [], error, isLoading} = useQuery(
    "games",
    getGames
  )

  async function getUser(){
    return await coreApi.get(ApiRounteKey.getMyProfile);
  }

  async function autoLogin(){
    const token = localStorage.getItem("token");

    if(!token){
      return
    }

    try{

      coreApi.defaults.headers.common["Authorization"] = "Bearer " + token;
      
      const {data} = await getUser();
      user[1](data);
      localStorage.setItem("token", token);
    }
    catch(err){
      coreApi.defaults.headers.common["Authorization"] = "";
      localStorage.removeItem("token");
      return (<errorPage/>)
    }
  }

  useEffect(() => {
    autoLogin()
  },[])


  if(error) return (
    <errorPage/>
  )

  if(isLoading) return ( <LoadingPage/> )
 
  return (
    <UserContext.Provider value={user}>
      <GameContext.Provider value={data}>
        <BrowserRouter>
            <div>
                <div><Navbar /></div>
                <ToastContainer />
                <div className='webBody'>
                    <Routes>
                        {/* Web */}
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/team" element={<Team />} />
                        <Route path="/tournament" element={<Tournament />} />
                        <Route path="/createTournament" element={<CreateTournament />} />
                        
                        {/* User Management */}
                        <Route path="/mySchedule" element={<MySchedule />} />

                        {/* Detail */}
                        <Route path="/team/:id"  element={<TeamEach />} />
                        <Route path="/tournament/:id"  element={<TournamentEach />} />
                        <Route path="/user/:id"  element={<UserEach />} />

                        {/* error */}
                        <Route path="/error"  element={<ErrorPage />} />
                        

                    </Routes>
                </div>
            </div>
        </BrowserRouter>
      </GameContext.Provider>
    </UserContext.Provider>
  )
}

export default App